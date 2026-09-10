# AI for Design Asset Management — Output Contract

## What this Skill produces

1. **Sync Proposal** (`sync-proposal.json`): a machine-readable diff between the prototype and the asset library.
2. **Sync Result** (after approval): updated asset library with new/updated components and templates, refreshed indexes, and regenerated manifest hashes.
3. **Human-readable report**: a short Markdown summary for design review.

## Sync Proposal Schema

```json
{
  "schemaVersion": "1.0",
  "assetId": "example-enterprise-style",
  "prototypeRoot": "/abs/path/to/prototype",
  "libraryRoot": "/abs/path/to/asset-library",
  "summary": {
    "totalPrototypeComponents": 12,
    "totalPrototypeTemplates": 2,
    "added": 1,
    "changed": 0,
    "orphaned": 0,
    "inSync": 13,
    "actionable": 1
  },
  "components": [
    {
      "kind": "component",
      "id": "page-heading",
      "prototypeFile": "src/components/PageHeading.vue",
      "prototypeHash": "...",
      "libraryFile": "src/components/PageHeading.vue",
      "libraryHash": "...",
      "status": "in-sync",
      "action": "none",
      "reason": "Contents are identical.",
      "approvedIndexEntry": null
    }
  ],
  "templates": [...],
  "actionable": [...]
}
```

### Status values

| Status     | Meaning                                       | Default action |
| ---------- | --------------------------------------------- | -------------- |
| `added`    | Prototype has it, library index does not.     | `register`     |
| `changed`  | Both sides have it but contents differ.       | `update`       |
| `orphaned` | Index has it but library source file missing. | `update`       |
| `in-sync`  | Both sides present and identical.             | `none`         |

### Action values

| Action     | Behavior                                                   |
| ---------- | ---------------------------------------------------------- |
| `register` | Copy file only after complete index metadata is approved.  |
| `update`   | Copy file and update the existing index entry source path. |
| `none`     | No operation.                                              |

For `register`, replace `approvedIndexEntry: null` with reviewed metadata before approval. Components require `dependencies` and `useWhen`. Templates require `appEntry`, `configFile`, `configPreset`, `configSchema`, `criticalInteractions`, and `components`. The sync script rejects incomplete registrations.

## Report Template

The human-readable report follows [assets/report-template.yaml](assets/report-template.yaml).

## Boundaries

- This Skill only syncs **source files** declared by the contract's `discovery` patterns.

- It does **not** infer or silently create incomplete index metadata for new assets. Registration requires an approved index entry.

- It does **not** delete assets from the library; orphaned entries are recreated from the prototype.

- It does **not** perform framework-specific build or runtime checks.

<br />
