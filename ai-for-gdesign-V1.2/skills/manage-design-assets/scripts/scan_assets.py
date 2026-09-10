#!/usr/bin/env python3
"""Scan a prototype or asset library for components and templates according to a contract."""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Dict, List
import glob


def _to_kebab(name: str) -> str:
    # PascalCase / camelCase / snake_case -> kebab-case
    name = re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", name)
    name = name.replace("_", "-")
    return name.lower().strip("-")


def _derive_id(filename: str, transform: str) -> str:
    stem = Path(filename).stem
    if transform == "kebab-case":
        return _to_kebab(stem)
    if transform == "camelCase":
        # lower first letter, keep rest camel, then kebab isn't camelCase; simplified
        return stem[0].lower() + stem[1:] if stem else stem
    if transform == "PascalCase":
        return stem
    return stem


def _glob_files(root: Path, pattern: str, ignore_patterns: List[str]) -> List[Path]:
    matches = sorted(root.glob(pattern))
    result = []
    for p in matches:
        rel = p.relative_to(root).as_posix()
        if any(Path(rel).match(ignore) for ignore in ignore_patterns):
            continue
        result.append(p)
    return result


def _hash_file(path: Path, algorithm: str = "sha256") -> str:
    h = hashlib.new(algorithm)
    h.update(path.read_bytes())
    return h.hexdigest()


def scan_directory(root: Path, contract: dict, target: str = "prototype") -> dict:
    """Scan a directory (prototype or asset library) and return components/templates maps."""
    discovery = contract["discovery"]
    naming = contract.get("assetNaming", {})
    ignore = contract.get("ignorePatterns", ["node_modules", ".DS_Store"])
    algorithm = contract["syncStrategy"].get("hashAlgorithm", "sha256")

    component_pattern = discovery.get("components", "src/components/*")
    template_pattern = discovery.get("templates", "src/templates/*")

    components = {}
    for p in _glob_files(root, component_pattern, ignore):
        asset_id = _derive_id(p.name, naming.get("componentIdTransform", "kebab-case"))
        components[asset_id] = {
            "id": asset_id,
            "file": p.relative_to(root).as_posix(),
            "absolute": str(p),
            "hash": _hash_file(p, algorithm),
        }

    templates = {}
    for p in _glob_files(root, template_pattern, ignore):
        asset_id = _derive_id(p.name, naming.get("templateIdTransform", "kebab-case"))
        templates[asset_id] = {
            "id": asset_id,
            "file": p.relative_to(root).as_posix(),
            "absolute": str(p),
            "hash": _hash_file(p, algorithm),
        }

    return {
        "target": target,
        "root": str(root),
        "components": components,
        "templates": templates,
    }


def load_index(root: Path, contract: dict, kind: str) -> dict:
    """Load an index file (components or templates) from the asset library."""
    mapping = contract["indexMapping"]
    indexes_dir = Path(contract["discovery"].get("indexes", "indexes"))
    filename = mapping[kind]
    index_path = root / indexes_dir / filename
    if not index_path.is_file():
        return {}
    data = json.loads(index_path.read_text(encoding="utf-8"))
    root_key = mapping.get("rootKey" if kind == "components" else "templateRootKey", kind)
    return data.get(root_key, {})


def load_manifest(root: Path, contract: dict) -> dict:
    """Load the asset manifest from the asset library."""
    manifest_path = root / contract["discovery"]["manifest"]
    if not manifest_path.is_file():
        return {}
    return json.loads(manifest_path.read_text(encoding="utf-8"))


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 3:
        print("Usage: scan_assets.py <contract.json> <prototype_or_asset_root> [prototype|library]")
        raise SystemExit(1)
    contract = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    root = Path(sys.argv[2]).resolve()
    target = sys.argv[3] if len(sys.argv) > 3 else "prototype"
    result = scan_directory(root, contract, target)
    print(json.dumps(result, ensure_ascii=False, indent=2))
