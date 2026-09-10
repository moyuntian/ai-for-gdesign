#!/usr/bin/env python3
"""Resolve a component plan against one governed AI for Design asset library."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
from pathlib import Path

from asset_locator import index_paths, load_contract, load_json, locate_asset_library


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("plan", type=Path)
    parser.add_argument("assets_root", type=Path, help="AI for Design asset package root or one direct asset-library root")
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    plan_path, output = args.plan.resolve(), args.output.resolve()
    request = load_json(plan_path)
    asset_id = request.get("assetId")
    if not isinstance(asset_id, str) or not asset_id:
        raise SystemExit("ERROR: component plan requires a non-empty assetId")
    try:
        root, catalog, catalog_entry = locate_asset_library(args.assets_root, asset_id)
        contract, contract_name = load_contract(root, catalog_entry)
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        raise SystemExit(f"ERROR: {exc}") from exc

    paths = index_paths(root, contract)
    try:
        manifest = load_json(paths["manifest"])
        component_doc = load_json(paths["components"])
        template_doc = load_json(paths["templates"])
        interaction_doc = load_json(paths["interactions"])
    except (OSError, json.JSONDecodeError) as exc:
        raise SystemExit(f"ERROR: invalid asset library metadata: {exc}") from exc
    mapping = contract.get("indexMapping", {})
    component_index = component_doc.get(mapping.get("rootKey", "components"), {})
    template_index = template_doc.get(mapping.get("templateRootKey", "templates"), {})
    interaction_index = interaction_doc.get(mapping.get("interactionRootKey", "interactions"), {})

    for key in ("assetId", "assetVersion"):
        if request.get(key) != manifest.get(key):
            raise SystemExit(f"ERROR: {key} mismatch: plan={request.get(key)!r}, asset={manifest.get(key)!r}")
    if request.get("schemaVersion") != "2.2":
        raise SystemExit("ERROR: component-plan schemaVersion must be 2.2")
    if contract.get("assetId") not in (None, manifest.get("assetId")):
        raise SystemExit("ERROR: asset contract and manifest identify different libraries")

    template_id = request.get("templateId")
    if template_id not in template_index:
        raise SystemExit(f"ERROR: unknown templateId: {template_id}")
    template = template_index[template_id]
    unknown_interactions = sorted(set(request.get("interactions", [])) - set(interaction_index))
    if unknown_interactions:
        raise SystemExit(f"ERROR: unknown interactions: {unknown_interactions}")
    missing_interactions = sorted(set(template.get("criticalInteractions", [])) - set(request.get("interactions", [])))
    if missing_interactions:
        raise SystemExit(f"ERROR: component plan omits template critical interactions: {missing_interactions}")
    for key in ("source", "appEntry", "configFile", "configPreset", "configSchema"):
        relative = template.get(key)
        if not relative or not (root / relative).is_file():
            raise SystemExit(f"ERROR: template {template_id!r} has no valid {key}")

    selected = set(request.get("components", [])) | set(template.get("components", []))
    for interaction_id in request.get("interactions", []):
        selected.update(interaction_index[interaction_id].get("requires", []))
    queue = list(selected)
    while queue:
        component_id = queue.pop()
        if component_id not in component_index:
            raise SystemExit(f"ERROR: unknown component: {component_id}")
        source = component_index[component_id].get("source")
        if not source or not (root / source).is_file():
            raise SystemExit(f"ERROR: component has no valid source: {component_id}")
        for dependency in component_index[component_id].get("dependencies", []):
            if dependency not in selected:
                selected.add(dependency)
                queue.append(dependency)

    protected = manifest.get("protectedFiles", {})
    for relative, expected in protected.items():
        source = root / relative
        if not source.is_file() or digest(source) != expected:
            raise SystemExit(f"ERROR: asset release integrity failure: {relative}")

    if output.exists() and any(output.iterdir()):
        raise SystemExit(f"ERROR: output directory must be empty: {output}")
    output.mkdir(parents=True, exist_ok=True)
    base_field = contract.get("manifestMapping", {}).get("prototypeBaseFilesField", "prototypeBaseFiles")
    selected_files = set(manifest.get(base_field, []))
    selected_files.update((template["source"], template["appEntry"]))
    for component_id in selected:
        selected_files.add(component_index[component_id]["source"])
    editable_config = template["configFile"]
    copied: dict[str, str] = {}
    for relative in sorted(selected_files):
        source, target = root / relative, output / relative
        if not source.is_file():
            raise SystemExit(f"ERROR: selected source file is missing: {relative}")
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        if relative != editable_config:
            copied[relative] = digest(target)

    config_path = output / editable_config
    config = load_json(root / template["configPreset"])
    config.update({
        "schemaVersion": "2.2",
        "assetId": manifest["assetId"],
        "assetVersion": manifest["assetVersion"],
        "templateId": template_id,
        "directionId": request.get("directionId"),
    })
    config_path.write_text(json.dumps(config, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    shutil.copy2(root / template["configSchema"], output / "page-config.schema.json")
    shutil.copy2(plan_path, output / "component-plan.json")

    selection = {
        "schemaVersion": "2.2",
        "assetId": manifest["assetId"],
        "assetVersion": manifest["assetVersion"],
        "sourceReleaseSha256": manifest["sourceReleaseSha256"],
        "assetPackageId": catalog.get("packageId") if catalog else None,
        "assetPackageVersion": catalog.get("packageVersion") if catalog else None,
        "framework": contract.get("framework"),
        "assetContract": contract_name or None,
        "directionId": request.get("directionId"),
        "templateId": template_id,
        "templateSource": template["source"],
        "appEntry": template["appEntry"],
        "configFile": editable_config,
        "configPreset": template["configPreset"],
        "configSchema": template["configSchema"],
        "criticalInteractions": template.get("criticalInteractions", []),
        "components": sorted(selected),
        "interactions": request.get("interactions", []),
        "files": copied,
    }
    (output / "asset-selection.json").write_text(json.dumps(selection, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    dependency_dir = root / "node_modules"
    if dependency_dir.is_dir() and not (output / "node_modules").exists():
        os.symlink(dependency_dir, output / "node_modules", target_is_directory=True)
        print("Linked existing local dependencies.")
    else:
        print(f"NOTICE: install dependencies once in the selected asset library if preview requires them: {root}")
    print(f"Selected asset library {manifest['assetId']}@{manifest['assetVersion']}.")
    print(f"Resolved {len(selected)} components and locked {len(copied)} source files into {output}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
