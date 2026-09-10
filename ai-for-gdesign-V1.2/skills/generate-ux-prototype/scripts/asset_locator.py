#!/usr/bin/env python3
"""Locate one governed asset library from a package catalog or direct library root."""

from __future__ import annotations

import json
from pathlib import Path


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def locate_asset_library(input_root: Path, asset_id: str) -> tuple[Path, dict | None, dict | None]:
    root = input_root.resolve()
    catalog_path = root / "asset-catalog.json"
    if catalog_path.is_file():
        catalog = load_json(catalog_path)
        entry = catalog.get("libraries", {}).get(asset_id)
        if not isinstance(entry, dict):
            raise ValueError(f"assetId is not registered in asset-catalog.json: {asset_id!r}")
        relative = entry.get("root")
        if not isinstance(relative, str) or not relative:
            raise ValueError(f"asset catalog entry has no root: {asset_id!r}")
        library_root = (root / relative).resolve()
        if root not in library_root.parents:
            raise ValueError(f"asset catalog root escapes the package: {relative!r}")
        return library_root, catalog, entry
    manifest_path = root / "asset-manifest.json"
    if not manifest_path.is_file():
        raise ValueError("input is neither an AI for Design asset package nor an asset library root")
    manifest = load_json(manifest_path)
    if manifest.get("assetId") != asset_id:
        raise ValueError(f"assetId mismatch: requested={asset_id!r}, library={manifest.get('assetId')!r}")
    return root, None, None


def load_contract(library_root: Path, catalog_entry: dict | None = None) -> tuple[dict, str]:
    contract_name = (catalog_entry or {}).get("contract", "asset-library.contract.json")
    contract_path = library_root / contract_name
    if contract_path.is_file():
        return load_json(contract_path), contract_name
    return {
        "schemaVersion": "compatibility",
        "assetId": load_json(library_root / "asset-manifest.json").get("assetId"),
        "framework": "unknown",
        "discovery": {
            "components": "src/components/*",
            "templates": "src/templates/*",
            "indexes": "indexes",
            "manifest": "asset-manifest.json",
        },
        "indexMapping": {
            "components": "component-index.json",
            "templates": "template-index.json",
            "interactions": "interaction-index.json",
            "rootKey": "components",
            "templateRootKey": "templates",
            "interactionRootKey": "interactions",
        },
    }, ""


def index_paths(library_root: Path, contract: dict) -> dict[str, Path]:
    discovery = contract.get("discovery", {})
    mapping = contract.get("indexMapping", {})
    index_root = library_root / discovery.get("indexes", "indexes")
    return {
        "manifest": library_root / discovery.get("manifest", "asset-manifest.json"),
        "components": index_root / mapping.get("components", "component-index.json"),
        "templates": index_root / mapping.get("templates", "template-index.json"),
        "interactions": index_root / mapping.get("interactions", "interaction-index.json"),
    }
