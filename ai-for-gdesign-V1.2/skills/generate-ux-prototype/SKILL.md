---
name: generate-ux-prototype
description: Generate Vue 3 + Element Plus / SweetUI pages from text, screenshots, or HTML. Uses Less + rem + Vue Router + g-design-enterprise token system (--color-*). Delivers .vue SFC source + zero-build offline preview (index.swt.html). Triggers on "页面生成", "Vue 页面", "Element Plus", "SweetUI", "看板", "列表", "截图转码", "dashboard", "原型", "prototype".
---

# Generate UX Prototype — Vue 3 + Element Plus / SweetUI 页面生成（.vue 源码交付）

You are an expert UI/UX Designer and Frontend Engineer specializing in Generative UI (Vue 3 + Element Plus / SweetUI).
Your product is **真实 Vue 源码**：一组 `.vue` SFC 文件（`<script setup>` + Less + rem + 标准ESM import），写在 `{slug}/src/` 工作区内 —— **代码本身就是交付件**，可直接拷入任何 Vue 3 + Element Plus + Vite 工程；同时附带零构建离线预览 `index.swt.html`（浏览器直接打开）。

## 技术栈

- **框架**: Vue 3 (`<script setup>` Composition API)
- **UI**: Element Plus 2.13.5（默认）/ SweetUI（预留，`--ui-library=sweetui` 切换）
- **路由**: Vue Router 4.x
- **样式**: Less + CSS 变量（`var(--color-*)` token 体系，来源 g-design-enterprise）
- **单位**: rem（根字体 10px，`px / 10 = rem`）
- **依赖白名单**: vue / vue-router / element-plus / @element-plus/icons-vue / dayjs / less（SweetUI 启用时: + @hw-seq/sweet-ui-base）

## Token 来源

Token 来自 `assets/g-design-enterprise-v1.3.0/tokens/`，init.mjs 自动复制到工作区 `src/assets/themes/tokens/`。AI 生成代码直接用 `var(--color-*)` 前缀，不使用其他前缀。

## 资产根（ASSETS_ROOT）解析

init.mjs 按以下优先级定位 `g-design-enterprise-*` 资产库：

1. `--assets-root=<path>` 显式指定（推荐，跨工具安装时必用）；
2. 环境变量 `ASSETS_ROOT`；
3. 自动探测：从 skill 目录逐级向上查找（最多 6 级）`assets/g-design-enterprise-*`；
4. 都未命中 → 工作区仍会创建，但无 tokens/references/components，并在输出中给出 `ASSETS_ROOT: none` 与修复提示 —— 此时把资产包路径通过 `--assets-root` 传入后重新 init。

## Session Context Caching

1. **NEVER re-read** a file you have already read this session.
2. **Design system:** `references/design_system.md` — 仅在换肤/深色模式/token场景咨询时读取（日常生成不需要，SKILL.md 已内嵌速查）。
3. **EP API:** 信任你的知识，标准 EP 2.13.5 API。
4. **SweetUI:** API 兼容 Element Plus（`sweet-config-provider namespace="el|sweet"`），差异见 `references/sweetui-guide.md`。

> 完整能力链路：本 skill 名为 `generate-ux-prototype`（工程实现代号 SWT），是 `extract-structured-requirements → derive-experience-insights → generate-ux-prototype → manage-design-assets` 链路的原型生成阶段。

## UI 库选择

| 维度 | Element Plus (默认) | SweetUI (预留) |
|------|-------------------|----------------|
| import | `from 'element-plus'` | `from '@hw-seq/sweet-ui-base'` |
| 组件前缀 | `el-*` | `sweet-*` |
| 消息提示 | `ElMessage` | `SweetMessageBox` |
| UMD | `public/library/element-plus.full.min.js` | 待提供 |

init 时指定：`node scripts/init.mjs "<folder>" "<slug>" --ui-library=element-plus`

## 组件库按需加载

init.mjs **不再全量复制组件**，只创建空 `src/components/` 目录和复制 `references/`（含 component-catalog.md）。

**工作流：**
1. AI 读 `references/component-catalog.md` → 确定页面需要哪些资产库组件
2. 运行 `node scripts/copy-components.mjs --dir "{artifact-folder}/{slug}" --components GMetricCard,GStatusTag,GSearchBar`
3. 资产库没有但页面需要的通用组件 → AI 自己写入 `src/components/`

## Output Contract (READ FIRST)

init.mjs 创建工作区，**Editable vs FIXED:**
- **You edit ONLY:** `views/**`、`components/**`、`api/**`、`composables/**`、`constants/**`、`directives/**`、`locales/**`、`router/**`、`stores/**`、`utils/**`、`mock/**`、`assets/uploads/`、`assets/images/`。
- **FIXED:** `main.js`、`App.vue`、`assets/themes/base.css`、`assets/themes/swt-default.css`、`assets/themes/tokens/`、`public/`、`index.swt.html`、`preview-data.js`、`references/`。

**HARD RULES:**
- 标准 ESM import；裸依赖白名单仅限上述六项。
- 组件用 `<script setup>` + Composition API。
- 颜色一律 `var(--color-*)` token；UI 组件用语义 `type` prop。
- `<style lang="less" scoped>`；**禁止内联 `style="..."`**（`:style` 动态绑定允许）。
- **CSS 单位用 rem**（`px / 10 = rem`）。
- 禁止在 SFC 样式里定义 `:root`、`[data-swt-theme]`、`--color-*`（页面局部变量用 `--page-*` 前缀）。

## 换肤系统

- 页面消费 token → 任何皮肤下自动跟随。
- 运行时切换：`document.documentElement.setAttribute('data-swt-theme', '<name>')`。
- 深色模式：`assets/style/theme/dark.less` 已定义深色 token 覆盖。

## How to Use This Skill

### Input Type 1: Text — 页面描述
1. **Analyze intent:** 场景、用户、核心问题。
2. **Expand completeness:** 生产级同类页面必须有什么。
3. **Decompose:** 拆成页面主组件 + 子组件，**颗粒度适中：每页组件文件 ≤6**（过度拆分 = 更多文件往返 = 生成更慢）。**index.vue 只做组合层**。
4. **Macro layout:** `el-container` 外壳或单栏内容页。

### Input Type 2: Image / Screenshot
1. 分析布局、组件、层级、视觉分区。
2. 映射到 Element Plus + `--color-*` token。
3. **保真优先**：行数列数与图片完全一致。

### Input Type 3: Raw HTML
解析 DOM/CSS → 映射 Element Plus 组件，颜色映射最近似 token。

---

## Generation Workflow

### Step 1 — 布局策略 & Generative Expansion
NEVER sparse：用尽全部数据、mock 真实文本、CTA、搜索/筛选/分页、状态标签等视觉语义。

### Step 2 — Init Workspace（MANDATORY）
```
node scripts/init.mjs "{artifact-folder}" "{slug}" --ui-library=element-plus
```
成功输出 `RESULT: OK` + `HTML_PATH` + `SRC_DIR` + `PAGE` + `ASSETS_ROOT` + `UI_LIBRARY`。

### Step 2.5 — 按需加载组件（MANDATORY）
1. 读 `references/component-catalog.md`，确定页面需要的资产库组件列表。
2. 运行：
```
node scripts/copy-components.mjs --dir "{artifact-folder}/{slug}" --components GMetricCard,GStatusTag
```
3. 资产库没有但页面需要的通用组件 → AI 自己写入 `src/components/`。

### Step 3 — Author .vue Files
1. **并行写文件（性能硬规则）**：先把全部文件构思完，再在**同一条消息里并行发出所有 Write 调用**；严禁写一个文件、等一次结果、再写下一个 —— 每多一轮串行往返，用户就多等一次完整模型生成。
2. `views/{slug}/index.vue` — 只做组合层。
3. 子组件放 `views/{slug}/components/*.vue`；跨页复用放 `src/components/`。
4. 常量放 `views/{slug}/js/constants.js`；复杂逻辑抽 composable。
5. **组件匹配优先**：若 `--with-components` 开启，检查 `references/component-catalog.md` 是否有匹配的已定义组件 → 直接 import。
6. Mock API 放 `mock/modules/{slug}.js`。

### Step 3.5 — 生成前自检（只查机器查不了的）
**以下 build.mjs 已机器校验，不要人工复查**：相对 import 路径解析、图标/el-*/token 名、裸依赖白名单、`:root`/`[data-swt-theme]`/`--color-*` 定义、px 与静态内联 style（WARN）。人工自检仅限：
1. `v-for` 有 `:key`；`v-if` 不与 `v-for` 同标签
2. NEVER sparse：无占位文本、无空区块、数据用满
3. `:style` 仅用于运行时动态值

### Step 4 — Verify（MANDATORY）
```
node scripts/build.mjs --dir "{artifact-folder}/{slug}"
```
- **Success:** `OK index.swt.html verified (N pages, M components, K el-tag uses)`
- **Failure:** `RESULT: FAIL | <文件>: <原因>` → 修复 → 重跑（最多 3 次）

### Step 5 — Output
```
<artifact type="text/link">{HTML_PATH value}</artifact>
```

---

## 页面代码规范

0. **布局选型:** B端控制台(`el-container`) / 列表页(标题→筛选→表格→分页) / 看板页(KPI行→图表区) / 内容页(单栏)
1. **组件写法:** `<script setup>` 优先；单一职责，一个组件一个文件；每页组件文件 ≤6（过度拆分拖慢生成）。
2. **imports 顺序:** vue → vue-router → element-plus → @element-plus/icons-vue → dayjs → 相对组件/素材/mock。
3. **mock 数据:** `mock/modules/{slug}.js`，Promise + setTimeout 模拟异步；语义化 key；主列表 ≥ 10 条 — **紧凑元组数组 + `.map()` 展开，禁止逐条手写完整对象字面量**（token 翻倍、生成更慢）。
4. **常量:** `views/{slug}/js/constants.js`，全大写+下划线。
5. **图标:** `import { Search } from '@element-plus/icons-vue'`；`<el-icon :size="20"><Search /></el-icon>`。
6. **反馈:** `ElMessage` 轻提示；`ElMessageBox.confirm` 危险操作；`v-loading`；`el-empty` 空态。
7. **样式:** `<style lang="less" scoped>`，类名简短功能命名，颜色用 `var(--color-*)`。Less 嵌套 ≤ 3 层。
8. **表格:** `el-table` + `el-table-column`；`<template #default="{ row }">`；操作列 `fixed="right"` ≤3 按钮。`el-table-column` 的 `width`/`min-width` prop 用数字（像素），不用 rem。
9. **相对路径:** 从 `views/{slug}/index.vue` 引用：
   - 子组件: `import X from './components/X.vue'`
   - 常量: `import { Y } from './js/constants.js'`
   - Mock: `import { fetchList } from '../../../mock/modules/{slug}.js'`
   - 素材: `import logo from '../../assets/uploads/logo.png'`

---

## 附录 A — 速查表

### Token 速查（var(--color-\*)）

```
主色:   --color-brand  -hover  -focus  -active  -disabled
功能色: --color-error  -alert  -warning  -success  -info  -none  + -subtle 变体
文本色: --color-text-primary  -secondary  -placeholder  -disabled  -inverse
图标色: --color-icon-primary  -secondary  -tertiary  -placeholder  -disabled  -inverse  -hover  -focus  -active
背景色: --color-bg-1(页面)  -2(容器)  -3  -4  -5(卡片)  -6  -mask
填充色: --color-hover  -select  -table-header  -table-zebra  -fill  -fill-subtle  -fill-disabled  -fill-disabled-subtle
边框色: --color-border  -hover  -focus  -disabled  -separator  -separator-subtle
阴影:   --g-shadow
组件:   --g-control-height(32px)  --g-control-radius(4px)  --g-table-header-height(40px)  --g-table-row-height(44px)
```
> 完整 Token 文档见 `references/design_system.md`。来源：`assets/g-design-enterprise-v1.3.0/tokens/`。

### 常用 el-* 组件（build 校验白名单）
```
el-button el-input el-select el-option el-table el-table-column
el-pagination el-form el-form-item el-dialog el-drawer el-tag
el-icon el-menu el-container el-header el-aside el-main
el-row el-col el-card el-tabs el-tab-pane el-tooltip el-dropdown
```

### rem 换算（根字体 10px）
`px / 10 = rem`（16px → 1.6rem、24px → 2.4rem、8px → 0.8rem）

> **例外:** Vue 组件 props（如 `el-table-column` 的 `width`/`min-width`、`el-icon` 的 `:size`）使用数字像素值，不做 rem 换算。

### 高频错误预防
| # | 错误 | 正确 |
|---|------|------|
| 1 | `import { Searchh }` | `import { Search }` |
| 2 | `<el-table-cloumn>` | `<el-table-column>` |
| 3 | `<StatusTag />` 没 import | 加 import |
| 4 | 路径少一级 | 检查相对路径层级 |
| 5 | `var(--color-blue)` | `var(--color-brand)` |
| 6 | style 内 `:root { --color-x }` | token 在 themes/tokens/ |
| 7 | `style="color: red"` | class + style |
| 8 | `padding: 16px` | `padding: 1.6rem` |

## References
- **[references/design_system.md](references/design_system.md)** — Token 全表、间距、圆角、阴影、字体、图表配色、代码高亮
- **[references/element-plus-guide.md](references/element-plus-guide.md)** — EP 组件要点、错误预防
- **[references/sweetui-guide.md](references/sweetui-guide.md)** — SweetUI 差异指南（待 UMD）
