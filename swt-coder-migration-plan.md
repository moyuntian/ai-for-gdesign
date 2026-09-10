# SWT-Coder Migration Plan

## Overview
Replace generate-ux-prototype with swt-coder, merging gts-autin-coder capabilities + g-design-enterprise tokens + gts-ux-spec naming + ICT best practices.

## Directory Structure
```
swt-coder/
├── SKILL.md                          # ~250 lines
├── references/
│   ├── design_system.md              # ~200 lines
│   ├── element-plus-guide.md         # ~100 lines
│   ├── sweetui-guide.md              # ~50 lines (placeholder)
│   ├── component-catalog.md          # component index
│   ├── gts-ux-spec.md                # condensed token reference
│   └── sweetui-frontend-development.md
├── tokens/                           # from g-design-enterprise
│   ├── primitive.css
│   ├── semantic-light.css            # + --swt-* alias layer
│   ├── semantic-dark.css             # + --swt-* alias layer
│   ├── component.css
│   ├── charts.css
│   ├── code.css
│   ├── element-plus.css
│   ├── sweetui.css                   # placeholder
│   ├── index.scss
│   └── color-tokens.json
├── scripts/
│   ├── init.mjs                      # +--ui-library + --with-components
│   ├── build.mjs                     # +UI switch + --swt-* validation
│   ├── serve.mjs
│   ├── build-data.mjs
│   └── verify/
│       ├── compiler/                 # from gts-autin-coder
│       └── whitelists/
│           ├── element-plus-components.json
│           ├── element-plus-exports.json
│           ├── element-plus-icons.json
│           ├── sweetui-components.json    # empty []
│           └── sweetui-exports.json       # empty []
├── components/                       # from g-design-enterprise (default ON)
├── installer/
│   └── install.sh
└── standalone-prompt.md
```

## Execution Checklist

### Batch 1+2: Core Refactor (needs 1,3,4,5,7,8,11,12,13,14,15)
- [x] Step 0: Create directory structure
- [x] Step 1: Copy tokens from g-design-enterprise
- [x] Step 2: Add --swt-* alias layer to semantic-light.css and semantic-dark.css
- [x] Step 3: Copy scripts from gts-autin-coder (init.mjs, build.mjs, serve.mjs, build-data.mjs)
- [x] Step 4: Copy verify/compiler + whitelists from gts-autin-coder
- [x] Step 5: Adapt scripts: --gts-* → --swt-*, +--ui-library, +--with-components
- [x] Step 6: Copy components from g-design-enterprise/src/components
- [x] Step 7: Write SKILL.md (~250 lines)
- [x] Step 8: Write design_system.md (~200 lines)
- [x] Step 9: Write element-plus-guide.md (~100 lines)
- [x] Step 10: Write sweetui-guide.md (placeholder)
- [x] Step 11: Write component-catalog.md
- [x] Step 12: Copy gts-ux-spec.txt → references/gts-ux-spec.md
- [x] Step 13: Copy sweetui-frontend-development.md → references/
- [x] Step 14: Write standalone-prompt.md
- [x] Step 15: Write installer/install.sh
- [x] Step 16: Create sweetui.css, sweetui-components.json, sweetui-exports.json (placeholders)
- [x] Step 17: Update skill-catalog.json
- [x] Step 18: Rename old generate-ux-prototype → .deprecated

### Batch 3+4: Extensions & Optimization (needs 2,6,9,10,16)
- [x] Step 19: SweetUI switch logic in init.mjs/build.mjs
- [x] Step 20: Component library switch (--with-components/--without-components)
- [x] Step 21: Context optimization (layered loading strategy)
- [x] Step 22: Independent publishing capability

## Token Three-Layer Mapping

### Layer 1: g-design-enterprise original (keep unchanged)
--color-brand, --color-error, --color-success, --color-warning, --color-info, --color-text-*, --color-bg-*, --color-border-*, etc.

### Layer 2: --swt-* full tokens (from gts-ux-spec naming + g-design values)
--swt-color-accent-normal → var(--color-brand)        (#0067D1)
--swt-color-brand-normal  → #C7000B                    (from gts-ux-spec)
--swt-color-function-urgent-normal → var(--color-error)
--swt-color-function-success-normal → var(--color-success)
--swt-color-function-warning-normal → var(--color-warning)
--swt-color-function-prompt-normal → var(--color-info)
--swt-color-text-primary → var(--color-text-primary)
--swt-color-text-secondary → var(--color-text-secondary)
--swt-color-text-placeholder → var(--color-text-placeholder)
--swt-color-text-disabled → var(--color-text-disabled)
--swt-color-text-inverse → var(--color-text-inverse)
--swt-color-bg-primary → var(--color-bg-2)
--swt-color-bg-secondary → var(--color-bg-1)
--swt-color-bg-selected → var(--color-select)
--swt-color-dividing-line-primary → var(--color-border-separator)
--swt-color-border → var(--color-border)
--swt-space-size-4 → 4px
--swt-space-size-8 → 8px
--swt-space-size-16 → 16px
--swt-space-size-20 → 20px
--swt-space-size-24 → 24px
--swt-radius-size-small → 2px
--swt-radius-size-normal → 4px
--swt-radius-size-medium → 8px
--swt-radius-size-big → 12px
--swt-radius-size-infinity → 999px
--swt-shadow1 → var(--g-shadow)
--swt-font-size-small → 12px
--swt-font-size-normal → 14px
--swt-font-size-normal1 → 16px
--swt-font-size-medium → 20px
--swt-font-family-zh → 'SourceHanSansCN','PingFang SC','Microsoft YaHei'
--swt-font-family-en → 'HuaweiSans','Manrope','Arial',sans-serif

### Layer 3: Simplified aliases (for AI high-frequency use, backward compat)
--swt-color-primary → var(--swt-color-accent-normal)
--swt-color-success → var(--swt-color-function-success-normal)
--swt-color-warning → var(--swt-color-function-warning-normal)
--swt-color-danger → var(--swt-color-function-urgent-normal)
--swt-color-info → var(--swt-color-function-prompt-normal)
--swt-text-1 → var(--swt-color-text-primary)
--swt-text-2 → var(--swt-color-text-secondary)
--swt-text-3 → var(--swt-color-text-placeholder)
--swt-text-4 → var(--swt-color-text-placeholder)
--swt-text-disabled → var(--swt-color-text-disabled)
--swt-text-inverse → var(--swt-color-text-inverse)
--swt-bg-page → var(--swt-color-bg-secondary)
--swt-bg-container → var(--swt-color-bg-primary)
--swt-bg-overlay → var(--swt-color-bg-primary)
--swt-bg-hover → var(--color-hover)
--swt-bg-fill → var(--color-fill)
--swt-border-1 → var(--swt-color-dividing-line-primary)
--swt-border-2 → var(--swt-color-border)
--swt-shadow-1 → var(--swt-shadow1)
--swt-shadow-2 → 0 4px 12px 0 rgba(0,0,0,0.16)
--swt-shadow-3 → 0 16px 48px 0 rgba(0,0,0,0.16)
--swt-radius-sm → var(--swt-radius-size-small)
--swt-radius-md → var(--swt-radius-size-normal)
--swt-radius-lg → var(--swt-radius-size-medium)
--swt-radius-full → var(--swt-radius-size-infinity)
--swt-font-family → var(--swt-font-family-en)
--swt-mask → rgba(25,25,25,0.30)

## SKILL.md Key Changes (old → new)
- name: gts-autin-coder → swt-coder
- token prefix: --gts-* → --swt-*
- theme attribute: data-gts-theme → data-swt-theme
- preview file: index.gts.html → index.swt.html
- EP version: 2.x → 2.13.5
- +UI library switch: --ui-library=element-plus/sweetui
- +Component match: --with-components (default ON)
- +Skin protocol: data-swt-theme
- import whitelist: vue/vue-router/element-plus/@element-plus/icons-vue/dayjs/less (+sweetui placeholder)

## Script Adaptation Points
### init.mjs
- Replace all --gts-* → --swt-*
- Replace data-gts-theme → data-swt-theme
- Replace index.gts.html → index.swt.html
- Add --ui-library parameter (default: element-plus)
- Add --with-components parameter (default: true)
- When --with-components: copy components from swt-coder/components/

### build.mjs
- Replace --gts-* → --swt-* in token validation
- Replace index.gts.html → index.swt.html
- Add UI library switch (different whitelists)
- When sweetui: validate sweetui-components.json

### serve.mjs
- Replace index.gts.html → index.swt.html

### build-data.mjs
- Replace index.gts.html → index.swt.html

## Acceptance Criteria
1. node scripts/init.mjs creates valid workspace with --swt-* tokens
2. node scripts/build.mjs validates and builds successfully
3. index.swt.html opens in browser with correct styling
4. Token --swt-* values resolve correctly (no missing vars)
5. Component import from components/ works when --with-components
6. skill-catalog.json references swt-coder correctly
7. Default context footprint ≤ ~250 lines (SKILL.md only)
