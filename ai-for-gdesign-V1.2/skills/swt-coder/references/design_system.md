# SWT Design System

页面一切颜色经由 **SWT token**（`--color-*` CSS 变量）表达。token 由皮肤（`src/assets/themes/`）提供，经 `swt-bridge.css` 桥接到 Element Plus（`--el-*`）。

## 1. Token 全表

### 品牌色 / 强调色

| Token | 用途 |
|-------|------|
| `--color-brand` | 高亮色/交互元素正常状态（#0067D1） |
| `--color-brand-hover` / `-active` / `-focus` | hover / 按下 / 获焦 |
| `--color-brand-text-normal` | 文本场景高亮色 |
| `--color-brand` | 品牌色（#C7000B） |
| `--color-brand-hover` / `-active` | 品牌色 hover / 按下 |

### 功能色

| Token | 用途 |
|-------|------|
| `--color-error` | 紧急/错误/危险 |
| `--color-alert-normal` | 重要 |
| `--color-warning` | 警告 |
| `--color-success` | 成功/正常 |
| `--color-info` | 提示/运行中 |
| `--color-color-function-*-background` | 对应浅色背景 |

### 文本色

| Token | 用途 |
|-------|------|
| `--color-text-primary` / `--color-text-primary` | 主标题、正文重点 |
| `--color-text-secondary` / `--color-text-secondary` | 常规正文 |
| `--color-text-placeholder` / `--color-text-placeholder` | 次要说明、占位符 |
| `--color-text-disabled` | 禁用态文字 |
| `--color-text-inverse` | 深色底上的反白文字 |

### 背景色

| Token | 用途 |
|-------|------|
| `--color-bg-1` / `--color-bg-1` | 页面 body 底色 |
| `--color-bg-2` / `--color-bg-2` | 卡片、面板容器底 |
| `--color-bg-4` | 浮层底 |
| `--color-hover` | 行/项 hover 底 |
| `--color-fill` | 填充底（输入框、禁用底） |

### 边框 / 阴影 / 圆角 / 间距

| Token | 用途 |
|-------|------|
| `--color-border-separator` | 分割线 |
| `--color-border` | 控件描边 |
| `--g-shadow` / `-2` / `-3` | 卡片 / 弹窗 / 最高层浮层阴影 |
| `--g-control-radius` / `-md` / `-lg` / `-full` | 控件 / 卡片 / 大容器 / 胶囊圆角 |
| `--g-space-size-4` ~ `-80` | 间距体系（4px 倍数） |

### 简化别名（AI 高频使用）

| Token | 等价 |
|-------|------|
| `--color-brand` | `--color-brand` |
| `--color-success` | `--color-success` |
| `--color-error` | `--color-error` |
| `--color-warning` | `--color-warning` |

**使用规则：**
- 一律 `var(--color-*)`。禁止静态内联 `style="..."`。
- Element Plus 组件优先语义 prop（`type="primary|success|warning|danger|info"`）。
- 用户明确指定精确颜色时才允许 hex 字面量。

## 2. 换肤协议

皮肤 = `src/assets/themes/` 下的 css 文件，作用域 `html[data-swt-theme="{name}"]`。

1. 皮肤文件放 `themes/swt-{name}.css`。
2. `index.swt.html` 换肤插槽处追加 `<link>`。
3. 运行时切换：`document.documentElement.setAttribute("data-swt-theme", "{name}")`。
4. 深色皮肤必须覆盖阴影透明度。

## 3. 布局规范（合并 guifan.txt + ICT 最佳实践）

### 基本布局
- **B 端控制台页：** `el-container` 外壳 — `el-aside`（侧导航）+ `el-container`（`el-header` 顶栏 + `el-main` 内容）。
- **列表页标配：** 标题行 → 筛选行 → `el-table` → `el-pagination` 右对齐。
- **看板页：** 顶部 KPI 卡行，下方图表区。
- **间距：** 4 的倍数 rem（`px / 10 = rem`）；区块间 1.6-2.4rem，组件内 0.8-1.2rem。

### ICT 最佳实践（参考 ict-coder 改造）
- **Tonal Layering（色调分层）：**
  - Level 0（底色）：`--color-bg-1`，无阴影。
  - Level 1（容器）：`--color-bg-2` + `--g-shadow`，主要内容容器。
  - Level 2（内部）：`--color-hover` 或变体色，容器内部分区。
- **有阴影无边框（Mutual Exclusion）：** 浮起容器不加结构性 border。
- **无左侧色条（No Accent Strips）：** 用 `--color-color-function-*-background` 浅色底替代。
- **语义状态配对：** `*-background` 底色 + 对应 `*-text-normal` 文字色。

### rem 换算速查
| px | rem | 用途 |
|----|-----|------|
| 4px | 0.4rem | 最小间距 |
| 8px | 0.8rem | 组件内间距 |
| 16px | 1.6rem | 区块间距 |
| 24px | 2.4rem | 大区块间距 |
| 56px | 5.6rem | 顶栏/侧栏高度 |

### Less 样式规范
- `<style lang="less" scoped>` — Less 嵌套、变量可用
- SFC 内不 `@import` 外部 .less
- 嵌套 ≤ 3 层
- 类名简短功能命名

## 4. 字体系统

| Token | 字号 | 用途 |
|-------|------|------|
| `--color-font-size-small` | 12px | 辅助文本 |
| `--color-font-size-normal` | 14px | 正文/表格 |
| `--color-font-size-normal1` | 16px | 二级标题/卡片标题 |
| `--color-font-size-medium` | 20px | 一级标题/页面标题 |
| `--color-font-size-big` | 24px | 扩展文本 |

字重：light(300) / normal(400) / bold(600)
字体族：`''HarmonyOS Sans', 'Microsoft YaHei', 'PingFang SC', Arial, sans-serif-zh`（中文）/ `''HarmonyOS Sans', 'Microsoft YaHei', 'PingFang SC', Arial, sans-serif-en`（英文）

## 5. Element Plus 组件要点

| 场景 | 做法 | Don't |
|------|------|-------|
| 表格自定义列 | `<template #default="{ row }">` | 不用 slot-scope |
| 表格操作列 | `fixed="right"`，按钮用 `link` 型 | ≤3 按钮，多收进 dropdown |
| 表单 | `el-form` + `rules` + `ref.validate()` | 不裸 input 无校验 |
| 弹窗表单 | `el-dialog` + footer 双按钮 | 处理 loading/关闭时机 |
| 详情面板 | `el-drawer direction="rtl"` | 不用 dialog 塞长内容 |
| 轻提示 | `ElMessage.success/error` | 不用 alert |
| 危险操作 | `ElMessageBox.confirm type="warning"` | 删除必须二次确认 |
| 状态 | `el-tag` + type 映射表 | 不用颜色魔法值 |
| 加载 | 表格 `v-loading` | 不空白等待 |
| 空态 | `el-empty` | 不空 div |
| 分页 | `el-pagination layout="total, prev, pager, next"` | 显示 total |
