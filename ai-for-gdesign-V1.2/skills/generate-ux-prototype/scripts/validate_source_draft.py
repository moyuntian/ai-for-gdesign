#!/usr/bin/env python3
"""Validate a source-linked UX prototype without performing engineering work."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

from asset_locator import index_paths, load_contract, load_json, locate_asset_library


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def schema_errors(value: object, schema: dict, path: str = "config") -> list[str]:
    """Validate the dependency-free JSON Schema subset used by governed asset libraries."""
    errors: list[str] = []
    if "const" in schema and value != schema["const"]:
        errors.append(f"{path} must equal {schema['const']!r}")
    if "enum" in schema and value not in schema["enum"]:
        errors.append(f"{path} is not one of the allowed values")
    expected = schema.get("type")
    type_ok = {
        "object": isinstance(value, dict),
        "array": isinstance(value, list),
        "string": isinstance(value, str),
        "integer": isinstance(value, int) and not isinstance(value, bool),
        "number": isinstance(value, (int, float)) and not isinstance(value, bool),
        "boolean": isinstance(value, bool),
        "null": value is None,
    }.get(expected, True)
    if expected and not type_ok:
        return [f"{path} must be {expected}"]
    if isinstance(value, dict):
        required = schema.get("required", [])
        for key in required:
            if key not in value:
                errors.append(f"{path}.{key} is required")
        properties = schema.get("properties", {})
        for key, item in value.items():
            if key in properties:
                errors.extend(schema_errors(item, properties[key], f"{path}.{key}"))
            elif schema.get("additionalProperties") is False:
                errors.append(f"{path}.{key} is not allowed")
    if isinstance(value, list):
        if len(value) < schema.get("minItems", 0):
            errors.append(f"{path} requires at least {schema['minItems']} items")
        if "maxItems" in schema and len(value) > schema["maxItems"]:
            errors.append(f"{path} allows at most {schema['maxItems']} items")
        if schema.get("uniqueItems") and len({json.dumps(item, sort_keys=True, ensure_ascii=False) for item in value}) != len(value):
            errors.append(f"{path} must contain unique items")
        item_schema = schema.get("items")
        if isinstance(item_schema, dict):
            for index, item in enumerate(value):
                errors.extend(schema_errors(item, item_schema, f"{path}[{index}]"))
    if isinstance(value, str):
        if len(value) < schema.get("minLength", 0):
            errors.append(f"{path} is shorter than {schema['minLength']}")
        pattern = schema.get("pattern")
        if pattern and re.search(pattern, value) is None:
            errors.append(f"{path} does not match its required pattern")
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        if "minimum" in schema and value < schema["minimum"]:
            errors.append(f"{path} must be at least {schema['minimum']}")
        if "maximum" in schema and value > schema["maximum"]:
            errors.append(f"{path} must be at most {schema['maximum']}")
    return errors


def validate(output: Path, assets_root: Path) -> list[str]:
    errors: list[str] = []
    core = ["component-plan.json", "asset-selection.json", "page-config.schema.json"]
    for relative in core:
        if not (output / relative).is_file():
            errors.append(f"missing required file: {relative}")
    if errors:
        return errors
    plan = load_json(output / "component-plan.json")
    selection = load_json(output / "asset-selection.json")
    asset_id = selection.get("assetId")
    try:
        library_root, catalog, catalog_entry = locate_asset_library(assets_root, asset_id)
        contract, _ = load_contract(library_root, catalog_entry)
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        return [str(exc)]
    paths = index_paths(library_root, contract)
    manifest = load_json(paths["manifest"])
    mapping = contract.get("indexMapping", {})
    component_index = load_json(paths["components"]).get(mapping.get("rootKey", "components"), {})
    template_index = load_json(paths["templates"]).get(mapping.get("templateRootKey", "templates"), {})

    config_relative = selection.get("configFile")
    if not isinstance(config_relative, str) or not (output / config_relative).is_file():
        return ["selected business configuration file is missing"]
    config = load_json(output / config_relative)
    for key in ("assetId", "assetVersion", "sourceReleaseSha256"):
        if selection.get(key) != manifest.get(key):
            errors.append(f"asset selection {key} differs from the mounted asset release")
    if catalog:
        if selection.get("assetPackageId") != catalog.get("packageId") or selection.get("assetPackageVersion") != catalog.get("packageVersion"):
            errors.append("asset package identity differs from the resolved catalog")
    for key in ("assetId", "assetVersion", "templateId"):
        if config.get(key) != selection.get(key):
            errors.append(f"business config {key} mismatch")
    if plan.get("directionId") != selection.get("directionId") or config.get("directionId") != selection.get("directionId"):
        errors.append("directionId differs between plan, selection, and business config")
    for relative, expected in selection.get("files", {}).items():
        output_file, source_file = output / relative, library_root / relative
        if not output_file.is_file() or digest(output_file) != expected:
            errors.append(f"copied source asset changed or is missing: {relative}")
        if not source_file.is_file() or digest(source_file) != expected:
            errors.append(f"mounted source asset changed after resolution: {relative}")

    template_id = selection.get("templateId")
    template = template_index.get(template_id, {})
    for key in ("source", "appEntry", "configFile", "configPreset", "configSchema"):
        selection_key = {"source": "templateSource"}.get(key, key)
        if selection.get(selection_key) != template.get(key):
            errors.append(f"selected {selection_key} differs from the template contract")
    if selection.get("interactions") != plan.get("interactions"):
        errors.append("interactions differ between component plan and asset selection")
    missing_interactions = sorted(set(template.get("criticalInteractions", [])) - set(selection.get("interactions", [])))
    if missing_interactions:
        errors.append(f"missing template critical interactions: {missing_interactions}")
    expected_components = sorted(component_index[item]["source"] for item in selection.get("components", []) if item in component_index)
    actual_components = sorted(str(path.relative_to(output)) for path in output.glob(contract.get("discovery", {}).get("components", "src/components/*")))
    if actual_components != expected_components:
        errors.append("output component sources do not exactly match the resolved component selection")
    actual_templates = sorted(str(path.relative_to(output)) for path in output.glob(contract.get("discovery", {}).get("templates", "src/templates/*")))
    if actual_templates != ([selection.get("templateSource")] if selection.get("templateSource") else []):
        errors.append("output must contain exactly the selected page template")
    source_schema = library_root / template.get("configSchema", "")
    output_schema = output / "page-config.schema.json"
    if not source_schema.is_file() or digest(output_schema) != digest(source_schema):
        errors.append("business configuration schema differs from the governed template schema")
    else:
        errors.extend(schema_errors(config, load_json(output_schema)))
    validator_relative = contract.get("validation", {}).get("configValidator")
    if validator_relative:
        validator = library_root / validator_relative
        if not validator.is_file():
            errors.append(f"asset-specific config validator is missing: {validator_relative}")
        else:
            result = subprocess.run(
                [sys.executable, str(validator), str(output / config_relative), "--template-id", str(template_id)],
                capture_output=True,
                text=True,
                check=False,
            )
            if result.returncode:
                detail = result.stdout.strip() or result.stderr.strip() or "unknown validation failure"
                errors.extend(f"asset validator: {line}" for line in detail.splitlines())
    if plan.get("assetGaps"):
        errors.append("component plan still contains unresolved asset gaps")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path)
    parser.add_argument("assets_root", type=Path, help="AI for Design asset package root or one direct asset-library root")
    args = parser.parse_args()
    errors = validate(args.output.resolve(), args.assets_root.resolve())
    if errors:
        print("\n".join(f"ERROR: {item}" for item in errors))
        return 1
    print("UX prototype structure, source lock, configuration, and declared interactions are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
