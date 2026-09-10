---
name: generate-ux-prototype
description: Generate one high-fidelity static interaction prototype from structured requirements and a selected design direction by routing to a compatible locally mounted enterprise asset library and copying its exact source components and page template. Use for rapid UI and interaction confirmation before engineering; do not use for production integration or simultaneous multi-direction generation.
---

# AI for Design · Generate UX Prototype

Create one reviewable design direction with the same governed source assets that developers can later integrate. Optimize for fast UI and interaction decisions, not production readiness.

## Required inputs

- Structured requirements and one selected design direction.
- Absolute `ASSETS_ROOT` for an AI for Design asset package, or a direct compatible asset-library root.
- Empty or dedicated output directory.

If more than one direction is supplied, process only the first selected direction and stop for user confirmation before another run.

## Workflow

1. Read the requirements and direction first. Extract page type, key objects, fields, states, and observable interactions.
2. If `ASSETS_ROOT/asset-catalog.json` exists, read it and choose one library whose framework, design style, and page types fit the request. Do not read all libraries. If no library fits, report an asset gap and stop.
3. Read only the selected library's manifest, contract, and component/template/interaction indexes. Do not scan component source.
4. Create `component-plan.json` using [component-plan.schema.json](references/component-plan.schema.json). Select one template, only necessary components, and every critical interaction. Resolve asset gaps before generation.
5. Run `scripts/resolve_source_assets.py PLAN ASSETS_ROOT OUTPUT`. It verifies the release, resolves recursive dependencies, and copies the exact source files. Never recreate registered assets by hand.
6. Read `OUTPUT/page-config.schema.json`, then edit only the business configuration path recorded as `configFile` in `OUTPUT/asset-selection.json`. Change content, data, ordering, and supported configuration only. Do not edit copied templates, components, tokens, styles, or runtime files.
7. Run `scripts/validate_source_draft.py OUTPUT ASSETS_ROOT`. Fix configuration errors only. If source locks fail, discard the output and resolve it again.
8. Start a local preview. In a fresh page, confirm meaningful content, inspect the console, and execute every critical interaction. Each click must show a visible drawer, dialog, state/data change, navigation, or feedback message.
9. Present the prototype for design review and stop. Do not add APIs, production architecture, or engineering hardening.

After explicit UI and interaction confirmation and a passed fresh-browser smoke test, run `scripts/freeze_design_handoff.py OUTPUT ASSETS_ROOT --direction-id ID --browser-smoke-test passed`. The generated `design-handoff.json` is the input to `engineer-prototype`.

## Boundaries

- One prototype uses one governed asset library and one exact asset release.
- Never substitute approximate handwritten UI for a registered component or template.
- Never modify the mounted asset package during generation.
- Never install dependencies automatically. Ask the user to install them once inside the selected asset library if needed.
- Runtime incompatibilities belong in a new governed asset release or the engineering phase, never in business configuration.
- Do not claim confirmation until the user confirms the direction and the browser smoke test passes.
