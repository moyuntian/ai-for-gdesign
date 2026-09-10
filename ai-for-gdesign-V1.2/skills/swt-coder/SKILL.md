---
name: swt-coder
description: Generate Vue 3 + Element Plus / SweetUI pages from text, screenshots, or HTML. Uses Less + rem + Vue Router + SWT token system (--swt-*). Delivers .vue SFC source + zero-build offline preview (index.swt.html). Triggers on "页面生成", "Vue 页面", "Element Plus", "SweetUI", "看板", "列表", "截图转码", "dashboard".
---

# SWT Coder — Vue 3 + Element Plus / SweetUI 页面生成（.vue 源码交付）

You are an expert UI/UX Designer and Frontend Engineer specializing in Generative UI (Vue 3 + Element Plus / SweetUI).
Your product is **真实 Vue 源码**：一组 `.vue` SFC 文件（`<script setup>` + Less + rem + 标准ESM import），写在 `{slug}/src/` 工作区内 —— **代码本身就是交付件**，可直接拷入任何 Vue 3 + Element Plus + Vite 工程；同时附带零构建离线预览 `index.swt.html`（浏览器直接打开）。

## 技术栈

- **框架**: Vue 3 (`<script setup>` Composition API)
- **UI**: Element Plus 2.13.5（默认）/ SweetUI（预留，`--ui-library=sweetui` 切换）
- **路由**: Vue Router 4.x
- **样式**: Less + CSS 变量（`var(--swt-*)` token 体系）
- **单位**: rem（根字体 10px，`px / 10 = rem`）
- **依赖白名单**: vue / vue-router / element-plus / @element-plus/icons-vue / dayjs / less（SweetUI 启用时: + @hw-seq/sweet-ui-base）

## Session Context Caching

1. **NEVER re-read** a file you have already read this session.
2. **Design system:** `references/design_system.md` — 仅在换肤/深色模式/token场景咨询时读取（日常生成不需要，SKILL.md 已内嵌速查）。
3. **EP API:** 信任你的知识，标准 EP 2.13.5 API。
4. **SweetUI:** API 兼容 Element Plus（`sweet-config-provider namespace="el|sweet"`），差异见 `references/sweetui-guide.md`。

## UI 库选择

| 维度 | Element Plus (默认) | SweetUI (预留) |
|------|-------------------|----------------|
| import | `from 'element-plus'` | `from '@hw-seq/sweet-ui-base'` |
| 组件前缀 | `el-*` | `sweet-*` |
| 消息提示 | `ElMessage` | `SweetMessageBox` |
| UMD | `public/library/element-plus.full.min.js` | 待提供 |

init 时指定：`node scripts/init.mjs "<folder>" "<slug>" --ui-library=element-plus`

## 组件库引入（默认开启）

`--with-components`（默认）：从 `components/` 目录读取已定义组件，匹配页面需求时直接 import 组件源码（CV），节省时间，不重复造轮子。未匹配的 UI 块 → AI 自由编写。
`--without-components`：不引入组件库，纯 AI 生成。

## Output Contract (READ FIRST)

`init.mjs` 初始化出的工作区结构：

```
{slug}/
├── mock/modules/{slug}.js          # Mock API（init 必建）
├── public/library/                 # 预览运行时 UMD（FIXED — 勿改勿删）
├── src/                            # ★ 交付件
│   ├── main.js                     # 工程入口（FIXED）
│   ├── App.vue                     # 应用壳（FIXED）
│   ├── README.md                   # 接入说明（FIXED）
│   ├── assets/                     # 主题/字体/样式（FIXED）
│   │   ├── fonts/ style/ themes/
│   │   ├── images/ uploads/        # 按需创建素材
│   ├── locales/                    # 全局 i18n（init 必建）
│   ├── router/index.js             # 路由（init 必建）
│   ├── views/{slug}/               # ★ 页面主目录
│   │   ├── index.vue               # 页面主组件
│   │   └── js/constants.js         # 页面常量
│   ├── components/                 # 跨页共享组件（按需创建）
│   ├── api/ composables/ constants/ directives/ stores/ utils/
├── index.swt.html                  # 离线预览加载器（FIXED）
└── preview-data.js                 # 源码映射（build 自动生成）
```

**Editable vs FIXED:**
- **You edit ONLY:** `views/**`、`components/**`、`api/**`、`composables/**`、`constants/**`、`directives/**`、`locales/**`、`router/**`、`stores/**`、`utils/**`、`mock/**`、`assets/uploads/`、`assets/images/`。
- **FIXED:** `main.js`、`App.vue`、`assets/themes/`、`assets/style/`、`public/`、`index.swt.html`、`preview-data.js`。

**HARD RULES:**
- 标准 ESM import；裸依赖白名单仅限上述六项（+ element-plus 子路径 / @hw-seq/sweet-ui-base 子路径）。
- 组件用 `<script setup>` + Composition API。
- 颜色一律 `var(--swt-*)` token；UI 组件用语义 `type` prop。
- `<style lang="less" scoped>`；**禁止内联 `style="..."`**（`:style` 动态绑定允许）。
- **CSS 单位用 rem**（`px / 10 = rem`）。
- 禁止在 SFC 样式里定义 `:root`、`[data-swt-theme]`、`--swt-*`（页面局部变量用 `--page-*` 前缀）。

## 换肤系统

- 页面消费 token → 任何皮肤下自动跟随。
- 运行时切换：`document.documentElement.setAttribute('data-swt-theme', '<name>')`。
- 深色模式：`assets/style/theme/dark.less` 已定义 `html[data-swt-theme="dark"]` 下的 token 覆盖。

## How to Use This Skill

### Input Type 1: Text — 页面描述
1. **Analyze intent:** 场景、用户、核心问题。
2. **Expand completeness:** 生产级同类页面必须有什么。
3. **Decompose:** 拆成页面主组件 + 子组件，**颗粒度尽可能小**——一个子组件一个 .vue 文件。**index.vue 只做组合层**。
4. **Macro layout:** `el-container` 外壳或单栏内容页。

### Input Type 2: Image / Screenshot
1. 分析布局、组件、层级、视觉分区。
2. 映射到 Element Plus + SWT token。
3. **保真优先**：行数列数与图片完全一致，逐格独立读取。

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
成功输出 `RESULT: OK` + `HTML_PATH` + `SRC_DIR` + `PAGE` + `UI_LIBRARY` + `COMPONENTS`。

### Step 3 — Author .vue Files
1. `views/{slug}/index.vue` — 只做组合层。
2. 子组件放 `views/{slug}/components/*.vue`；跨页复用放 `src/components/`。
3. 常量放 `views/{slug}/js/constants.js`；复杂逻辑抽 composable。
4. **组件匹配优先**：若 `--with-components` 开启，检查 `references/component-catalog.md` 是否有匹配的已定义组件 → 直接 import。
5. Mock API 放 `mock/modules/{slug}.js`。

### Step 3.5 — 生成前自检（MANDATORY）
1. 相对 import 路径层级正确
2. 图标名 / el-* 组件名 / token 名精确匹配
3. PascalCase / kebab-case 组件标签都有对应 import
4. `<style lang="less">` 内无 `:root` / `[data-swt-theme]` / `--swt-*:` 定义
5. 裸 import 仅限白名单
6. `v-for` 有 `:key`；`v-if` 不与 `v-for` 同标签
7. 无静态内联 `style="..."`
8. CSS 单位用 rem

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
1. **组件写法:** `<script setup>` 优先；单一职责，一个组件一个文件。
2. **imports 顺序:** vue → vue-router → element-plus → @element-plus/icons-vue → dayjs → 相对组件/素材/mock。
3. **mock 数据:** `mock/modules/{slug}.js`，Promise + setTimeout 模拟异步；语义化 key；主列表 ≥ 10 条。
4. **常量:** `views/{slug}/js/constants.js`，全大写+下划线。
5. **图标:** `import { Search } from '@element-plus/icons-vue'`；`<el-icon :size="20"><Search /></el-icon>`。
6. **反馈:** `ElMessage` 轻提示；`ElMessageBox.confirm` 危险操作；`v-loading`；`el-empty` 空态。
7. **样式:** `<style lang="less" scoped>`，类名简短功能命名，颜色用 token。Less 嵌套 ≤ 3 层。
8. **表格:** `el-table` + `el-table-column`；`<template #default="{ row }">`；操作列 `fixed="right"` ≤3 按钮。
9. **相对路径:** 从 `views/{slug}/index.vue` 引用：
   - 子组件: `import X from './components/X.vue'`
   - 常量: `import { Y } from './js/constants.js'`
   - Mock: `import { fetchList } from '../../../mock/modules/{slug}.js'`
   - 素材: `import logo from '../../assets/uploads/logo.png'`

---

## 附录 A — 速查表

### Token 速查（var(--swt-\*)）

```
主色:  --swt-color-primary  -hover  -active  -on-primary
功能色: --swt-color-success  -warning  -danger  -error  -info
文本色: --swt-text-1  -2  -3  -4  -disabled  -inverse
背景色: --swt-bg-page  -container  -overlay  -hover  -fill
边框色: --swt-border-1  -2
其他:   --swt-mask  --swt-shadow-1  -2  -3  --swt-radius-sm  -md  -lg  -full
完整色: --swt-color-accent-normal  --swt-color-brand-normal  --swt-color-function-*
间距:   --swt-space-size-4  -8  -12  -16  -20  -24  -32
```

### 常用 el-* 组件（build 校验白名单）
```
el-button el-input el-select el-option el-table el-table-column
el-pagination el-form el-form-item el-dialog el-drawer el-tag
el-icon el-menu el-container el-header el-aside el-main
el-row el-col el-card el-tabs el-tab-pane el-tooltip el-dropdown
```

### rem 换算（根字体 10px）
`px / 10 = rem`（16px → 1.6rem、24px → 2.4rem、8px → 0.8rem）

### 高频错误预防
| # | 错误 | 正确 |
|---|------|------|
| 1 | `import { Searchh }` | `import { Search }` |
| 2 | `<el-table-cloumn>` | `<el-table-column>` |
| 3 | `<StatusTag />` 没 import | 加 import |
| 4 | 路径少一级 | 检查相对路径层级 |
| 5 | `var(--swt-color-blue)` | `var(--swt-color-primary)` |
| 6 | style 内 `:root { --swt-x }` | token 在 themes/ |
| 7 | `style="color: red"` | class + style |
| 8 | `padding: 16px` | `padding: 1.6rem` |

## References
- **[references/design_system.md](references/design_system.md)** — Token 全表、换肤协议、布局规范、ICT 最佳实践
- **[references/element-plus-guide.md](references/element-plus-guide.md)** — EP 组件要点、错误预防
- **[references/sweetui-guide.md](references/sweetui-guide.md)** — SweetUI 差异指南（待 UMD）
- **[references/component-catalog.md](references/component-catalog.md)** — 已定义组件目录
