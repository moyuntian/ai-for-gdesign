#!/usr/bin/env python3
"""Execute the sync proposal: copy files, update indexes, bump version, refresh manifest hashes."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
from pathlib import Path
from typing import Dict, List

from scan_assets import load_manifest


def _load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def _save(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def _hash_file(path: Path, algorithm: str) -> str:
    h = hashlib.new(algorithm)
    h.update(path.read_bytes())
    return h.hexdigest()


def _derive_target_path(prototype_root: Path, library_root: Path, proto_file: str, kind: str, contract: dict) -> Path:
    # By default, preserve the relative path from prototype (e.g. src/components/X.vue)
    return library_root / proto_file


def _default_index_entry(kind: str, relative_source: str, contract: dict, existing_samples: dict) -> dict:
    """Build a minimal index entry for a newly registered asset."""
    if kind == "component":
        return {
            "source": relative_source,
            "dependencies": [],
            "useWhen": []
        }
    # template
    sample = next(iter(existing_samples.values())) if existing_samples else {}
    return {
        "source": relative_source,
        "appEntry": sample.get("appEntry", "src/App.vue"),
        "configFile": sample.get("configFile", "src/page-config.json"),
        "fit": [],
        "components": []
    }


def _bump_version(version: str) -> str:
    parts = version.split(".")
    if len(parts) != 3:
        return version
    major, minor, patch = parts
    try:
        return f"{major}.{int(minor) + 1}.0"
    except ValueError:
        return version


def _replace_version_values(value: object, old_version: str, new_version: str) -> object:
    if isinstance(value, dict):
        updated = {}
        for key, item in value.items():
            if key == "assetVersion" and item == old_version:
                updated[key] = new_version
            elif key == "const" and item == old_version:
                updated[key] = new_version
            else:
                updated[key] = _replace_version_values(item, old_version, new_version)
        return updated
    if isinstance(value, list):
        return [_replace_version_values(item, old_version, new_version) for item in value]
    return value


def _release_hash(library_root: Path, protected: dict, algorithm: str, hash_format: str) -> str:
    files = sorted(protected)
    if "path:sha256 lines" in hash_format:
        lines = [f"{relative}:{protected[relative]}" for relative in files]
        return hashlib.new(algorithm, ("\n".join(lines) + "\n").encode("utf-8")).hexdigest()
    data = b"".join((library_root / relative).read_bytes() for relative in files if (library_root / relative).is_file())
    return hashlib.new(algorithm, data).hexdigest()


def sync(prototype_root: Path, library_root: Path, contract: Path, proposal: dict, dry_run: bool = False) -> dict:
    contract_data = _load(contract)
    strategy = contract_data["syncStrategy"]
    algorithm = strategy.get("hashAlgorithm", "sha256")
    manifest = load_manifest(library_root, contract_data)
    mapping = contract_data["indexMapping"]
    indexes_dir = library_root / contract_data["discovery"].get("indexes", "indexes")

    component_index_path = indexes_dir / mapping["components"]
    template_index_path = indexes_dir / mapping["templates"]
    manifest_path = library_root / contract_data["discovery"]["manifest"]

    component_index = _load(component_index_path) if component_index_path.is_file() else {"components": {}}
    template_index = _load(template_index_path) if template_index_path.is_file() else {"templates": {}}

    # Ensure root keys exist
    component_index.setdefault(mapping.get("rootKey", "components"), {})
    template_index.setdefault(mapping.get("templateRootKey", "templates"), {})

    blocked: List[dict] = []
    component_root = component_index[mapping.get("rootKey", "components")]
    template_root = template_index[mapping.get("templateRootKey", "templates")]
    for item in proposal.get("actionable", []):
        existing = component_root.get(item.get("id")) if item.get("kind") == "component" else template_root.get(item.get("id"))
        if existing is not None:
            continue
        approved_entry = item.get("approvedIndexEntry")
        if not isinstance(approved_entry, dict):
            item["result"] = "error: approvedIndexEntry required for registration"
            blocked.append(item)
            continue
        if item.get("kind") == "template":
            required = {"appEntry", "configFile", "configPreset", "configSchema", "criticalInteractions", "components"}
            missing = sorted(required - set(approved_entry))
            if missing:
                item["result"] = f"error: template approvedIndexEntry missing {missing}"
                blocked.append(item)
    if blocked:
        return {
            "dryRun": dry_run,
            "copied": [],
            "blocked": blocked,
            "manifestVersion": manifest.get(contract_data["manifestMapping"]["assetVersionField"]),
            "manifestPath": str(manifest_path),
            "updatedIndexes": [],
        }

    copied: List[dict] = []
    for item in proposal.get("actionable", []):
        kind = item["kind"]
        asset_id = item["id"]
        proto_file = item["prototypeFile"]
        source = prototype_root / proto_file
        target = _derive_target_path(prototype_root, library_root, proto_file, kind, contract_data)

        if not source.is_file():
            item["result"] = "error: source file missing"
            continue

        relative_target = target.relative_to(library_root).as_posix()

        if kind == "component":
            root_key = mapping.get("rootKey", "components")
            existing = component_index[root_key].get(asset_id)
            if existing is None:
                approved_entry = item.get("approvedIndexEntry")
                if not isinstance(approved_entry, dict):
                    item["result"] = "error: approvedIndexEntry required for registration"
                    continue
                component_index[root_key][asset_id] = approved_entry
                component_index[root_key][asset_id]["source"] = relative_target
            else:
                existing["source"] = relative_target
        else:
            root_key = mapping.get("templateRootKey", "templates")
            existing = template_index[root_key].get(asset_id)
            if existing is None:
                approved_entry = item.get("approvedIndexEntry")
                if not isinstance(approved_entry, dict):
                    item["result"] = "error: approvedIndexEntry required for registration"
                    continue
                required = {"appEntry", "configFile", "configPreset", "configSchema", "criticalInteractions", "components"}
                missing = sorted(required - set(approved_entry))
                if missing:
                    item["result"] = f"error: template approvedIndexEntry missing {missing}"
                    continue
                template_index[root_key][asset_id] = approved_entry
                template_index[root_key][asset_id]["source"] = relative_target
            else:
                existing["source"] = relative_target

        if not dry_run:
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)

        copied.append({
            "kind": kind,
            "id": asset_id,
            "source": str(source),
            "target": str(target),
            "dryRun": dry_run,
        })
        item["result"] = "would copy" if dry_run else "copied"

    # Update the governed release version and every contract-declared JSON location.
    version_field = contract_data["manifestMapping"]["assetVersionField"]
    if strategy.get("bumpVersionOnSync", True) and not dry_run and copied:
        old_version = manifest.get(version_field, "0.0.0")
        new_version = _bump_version(old_version)
        manifest[version_field] = new_version
        for idx in (component_index, template_index):
            if version_field in idx:
                idx[version_field] = new_version

        for pattern in contract_data.get("versioning", {}).get("jsonFiles", []):
            for path in sorted(library_root.glob(pattern)):
                if not path.is_file() or path in (component_index_path, template_index_path, manifest_path):
                    continue
                data = _load(path)
                _save(path, _replace_version_values(data, old_version, new_version))

    # Recompute protected file hashes
    protected_field = contract_data["manifestMapping"]["protectedFilesField"]
    release_field = contract_data["manifestMapping"]["sourceReleaseSha256Field"]
    protected = dict(manifest.get(protected_field, {}))

    if not dry_run:
        _save(component_index_path, component_index)
        _save(template_index_path, template_index)
        for item in copied:
            protected.setdefault(Path(item["target"]).relative_to(library_root).as_posix(), "")
        protected.setdefault(component_index_path.relative_to(library_root).as_posix(), "")
        protected.setdefault(template_index_path.relative_to(library_root).as_posix(), "")
        for rel in list(protected.keys()):
            p = library_root / rel
            if p.is_file():
                protected[rel] = _hash_file(p, algorithm)
            else:
                protected.pop(rel)
        manifest[protected_field] = protected
        manifest[release_field] = _release_hash(
            library_root,
            protected,
            algorithm,
            manifest.get("sourceReleaseHashFormat", "concatenated protected file bytes"),
        )

    if not dry_run:
        _save(manifest_path, manifest)

    return {
        "dryRun": dry_run,
        "copied": copied,
        "blocked": blocked,
        "manifestVersion": manifest.get(version_field),
        "manifestPath": str(manifest_path),
        "updatedIndexes": [str(component_index_path), str(template_index_path)],
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("contract", type=Path, help="Path to asset-library.contract.json")
    parser.add_argument("prototype", type=Path, help="Path to prototype root")
    parser.add_argument("library", type=Path, help="Path to asset library root")
    parser.add_argument("proposal", type=Path, help="Path to sync proposal JSON")
    parser.add_argument("--dry-run", action="store_true", help="Show what would happen without making changes")
    parser.add_argument("-o", "--output", type=Path, help="Write result to file")
    args = parser.parse_args()

    proposal = _load(args.proposal)
    result = sync(args.prototype.resolve(), args.library.resolve(), args.contract.resolve(), proposal, dry_run=args.dry_run)

    text = json.dumps(result, ensure_ascii=False, indent=2)
    if args.output:
        args.output.write_text(text + "\n", encoding="utf-8")
        print(f"Sync result written to {args.output}")
    else:
        print(text)
    return 1 if result.get("blocked") else 0


if __name__ == "__main__":
    raise SystemExit(main())
