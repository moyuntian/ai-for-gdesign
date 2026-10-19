---
name: manage-design-assets
description: Compare an iterated source-linked prototype with its governed enterprise asset library, identify reusable component or page-template additions and changes, propose asset registration or updates, and apply an explicitly approved sync. Use for design-asset contribution and governance after prototype validation; do not use for ordinary prototype generation.
---

# AI for Design · Manage Design Assets

Return reusable improvements from a validated prototype to the same enterprise source asset library without mixing project-specific code into shared assets.

## Required inputs

1. Absolute prototype root.
2. Absolute `ASSETS_ROOT` or selected asset-library root.
3. The selected library's `asset-library.contract.json`.

When an asset package is supplied, read `asset-catalog.json`, select the prototype's recorded `assetId`, and operate only inside that registered library. Never scan or update every library.

## Workflow

1. Verify the prototype's `asset-selection.json` and ensure its asset ID and release match the selected library.
2. Validate the contract against [asset-library-contract.schema.json](references/asset-library-contract.schema.json). An implementation-neutral example is available at [example-asset-library.contract.json](assets/example-asset-library.contract.json).
3. Scan only component and template paths declared by the contract.
4. Compare prototype sources with the selected library and classify them as `added`, `changed`, `orphaned`, or `in-sync`.
5. Apply the criteria in [decision-rules.md](references/decision-rules.md). Project-specific or still-experimental files must be rejected or marked `needs-decoupling`.
6. Generate `sync-proposal.json` and a short review report. For every proposed registration, require reviewed dependencies, use cases, compatible templates/configuration, and interaction contract before sync.
7. Run a dry run and present exact file/index/version changes. Stop for explicit user approval.
8. After approval only, sync selected items, update indexes and versioned metadata, regenerate protected hashes, and verify the resulting release.
9. If the asset package gained a new library, register it in `asset-catalog.json`; ordinary updates to an existing library must not alter unrelated catalog entries.

## Scripts

- `scripts/scan_assets.py CONTRACT ROOT [prototype|library]`
- `scripts/compare_assets.py CONTRACT PROTOTYPE LIBRARY [-o proposal.json]`
- `scripts/sync_to_library.py CONTRACT PROTOTYPE LIBRARY PROPOSAL [--dry-run] [-o result.json]`
- `scripts/extract_prototype_assets.py CONTRACT PROTOTYPE LIBRARY [--dry-run] [--yes]`

## Boundaries

- Never delete an asset library or unrelated assets.
- Never sync outside contract discovery paths.
- Never apply a proposal without explicit approval and a successful dry run.
- Do not register incomplete template metadata merely to make an index entry exist.
- Do not claim framework build or browser validation; run those separately when the changed asset release requires them.

See [output-contract.md](references/output-contract.md) for proposal and result formats.
