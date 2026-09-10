# G Design Token 规范

色彩依据用户提供的 H Design《色彩.docx》更新。颜色、变量及使用规则的完整来源见 [色彩原文与图示](h-design-color-spec.md)，可执行映射见 [颜色映射与使用规则](h-design-color-mappings.md)。本文保留既有非色彩规范。

## 1. 目标与原则

颜色使用 H Design 原始语义 Token；现有组件通过 `--g-*` 兼容变量引用。业务使用语义变量，避免在组件中写死色值。需求和颜色规则存在歧义时保留来源及采用依据。

## 2. 命名约定

颜色变量保留 Word 名称，只添加 CSS `--` 前缀；不将 `color-brand` 擅自改成红色，也不把 `gray-10` 改写为旧编号体系。原文不存在的实现别名与深色 UI 兼容规则单独标注。

## 3. 色彩

- [原始 Word](色彩.docx)：完整规范来源。
- [逐段正文和 20 张原图](h-design-color-spec.md)：保留详细使用规则、示例及差异。
- [UI、图表、代码、色板和兼容映射](h-design-color-mappings.md)：可检索 Token 表与执行说明。
- [机器可读数据](../color-tokens.json)：132 个原始色板项、UI Token、图表顺序、代码明暗值、来源和差异记录。

颜色以 Word 为准，替换旧版颜色章节；原有字体、间距、圆角、边框尺寸和投影规范如下。

## 4. 圆角

| Token | 值 | 典型用途 |
| --- | ---: | --- |
| `--radius-small` | `2px` | 多选框等微型控件 |
| `--radius-normal` | `4px` | 按钮、输入框、页签、分页、标签、选择器 |
| `--radius-medium` | `8px` | 卡片、气泡、弹窗、下拉菜单、日期选择器 |
| `--radius-large` | `12px` | 大卡片、复杂容器 |
| `--radius-x-large` | `16px` | 高层级面板 |
| `--radius-xx-large` | `20px` | 强视觉容器 |
| `--radius-full` | `999px` | 胶囊、开关、滑块、进度条、圆形图标 |

- 同层、同类元素使用相同圆角。
- 层级越高，圆角可越大；嵌套时外层圆角应大于内层。

---

## 5. 字体与排版

### 5.1 字体族与字重

| Token | 值 |
| --- | --- |
| `--font-family-zh` | `"Microsoft YaHei", "PingFang SC", "Source Han Sans CN", sans-serif` |
| `--font-family-en` | `"Huawei Sans", Manrope, Arial, "San Francisco", Helvetica, Roboto, sans-serif` |
| `--font-family-numeric` | `Roboto, "Huawei Sans", Arial, sans-serif` |
| `--font-weight-light` | `300` |
| `--font-weight-normal` | `400` |
| `--font-weight-bold` | `600` |

> 已将原稿中的 `Helvetic`、`Robot`、`SourceHanSansCN` 校正为 `Helvetica`、`Roboto`、`Source Han Sans CN`。

### 5.2 字阶

| Token | 字号 / 行高 | 推荐用途 |
| --- | --- | --- |
| `--font-size-small` | `12px / 20px` | 辅助信息、紧凑标签 |
| `--font-size-normal` | `14px / 22px` | 默认正文、控件文本 |
| `--font-size-normal-1` | `16px / 24px` | 强调正文、小标题 |
| `--font-size-medium` | `20px / 28px` | 三级标题 |
| `--font-size-large` | `24px / 32px` | 二级标题 |
| `--font-size-x-large` | `30px / 38px` | 一级标题 |
| `--font-size-xx-large` | `36px / 44px` | 页面核心数字 |
| `--font-size-display-1` | `40px / 48px` | 展示标题 |
| `--font-size-display-2` | `48px / 56px` | 大型数据展示 |
| `--font-size-display-3` | `60px / 68px` | 超大指标 |
| `--font-size-display-4` | `80px / 88px` | 特殊大屏展示 |

- 字号与行高成对使用；正文不小于 `12px`，核心正文建议不小于 `14px`。
- 中文默认左对齐，不使用西文音节断词。
- 数字列按位数或小数点对齐，必要时启用等宽数字。

---

## 6. 间距

统一使用 4px 基准网格：

`--space-4: 4px` · `--space-8: 8px` · `--space-12: 12px` · `--space-16: 16px` · `--space-20: 20px` · `--space-24: 24px` · `--space-32: 32px` · `--space-40: 40px` · `--space-48: 48px` · `--space-56: 56px` · `--space-64: 64px` · `--space-72: 72px` · `--space-80: 80px`

- 所有间距仅取 4 的倍数，同级元素间距一致。
- 关联信息常用 `4–12px`；组件内部常用 `8–16px`；模块间常用 `24–40px`；页面区段可使用 `48px+`。

---

## 7. 边框

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--border-width-none` | `0` | `0` | 无边框 |
| `--border-width-normal` | `1px` | `1px` | 标准边框 |
| `--border-width-focus` | `2px` | `2px` | 聚焦边框 |
| `--border-width-independent` | `0` | `1px` | 浅色无边框、深色补充分层 |
| `--border-style-dotted` | `dotted` | `dotted` | 点状边框 |
| `--border-style-dashed` | `dashed` | `dashed` | 虚线边框 |
| `--border-style-solid` | `solid` | `solid` | 实线边框 |

组合示例：`var(--border-width-normal) solid var(--color-border)`。

---

## 8. 投影

| Token | 值 | 典型用途 |
| --- | --- | --- |
| `--shadow-1` | `0 1px 3px rgba(0,0,0,.10)` | 卡片、页签型单选 |
| `--shadow-nav-left` | `1px 0 6px rgba(0,0,0,.10)` | 左侧导航右向投影 |
| `--shadow-nav-right` | `-1px 0 6px rgba(0,0,0,.10)` | 右侧导航左向投影 |
| `--shadow-float` | `0 4px 8px rgba(0,0,0,.20)` | 下拉、通知、快捷菜单 |
| `--shadow-top` | `0 4px 12px rgba(0,0,0,.10)` | 顶部元素向下投影 |
| `--shadow-bottom` | `0 -4px 12px rgba(0,0,0,.10)` | 底部元素向上投影 |
| `--shadow-left` | `6px 0 18px rgba(0,0,0,.10)` | 左侧浮层向右投影 |
| `--shadow-right` | `-6px 0 18px rgba(0,0,0,.10)` | 右侧浮层向左投影 |
| `--shadow-selected` | `0 6px 20px rgba(0,0,0,.10)` | 卡片悬停/选中、气泡、Tooltip |
| `--shadow-dialog` | `0 20px 32px rgba(0,0,0,.10)` | 对话框、穿梭框 |

原稿中投影名称与实际方向不一致，本版已按视觉方向校正，并拆出选中态投影。

---

## 9. 主题实现

```css
:root,
[data-theme="light"] {
  --color-bg-1: var(--gray-05);
  --color-text-primary: var(--gray-90);
}

/* 项目兼容方案：不是 Word 的完整深色 UI 规范。 */
[data-theme="dark"] {
  --color-bg-1: var(--gray-100);
  --color-text-primary: var(--gray-05);
}
```

默认浅色；通过根节点或局部容器的 `data-theme="dark"` 切换深色，`data-theme="light"` 可显式恢复浅色。变量别名在主题边界重新绑定。代码语法的浅色/深色按 Word 图20明细表执行。

## 10. 验收要点

- 基础色板、UI 色值和图表顺序能追溯到 Word 正文或原图。
- 原图中的百分比完整转换为 RGBA，不忽略透明度。
- 每个现有 `--g-*` 颜色变量能解析到新规范，主题切换后无未定义引用。
- 默认、悬浮、选中、按下和禁用使用对应状态 Token。
- 原文中的冲突与深色 UI 兼容映射明确记录。
- 非颜色尺寸、字体、圆角与间距保持不变。

## 11. 本次更新记录

将旧颜色规范整体替换为 H Design《色彩.docx》，保留原 Word、20 张原图和完整正文。完成基础色板、UI 语义、图表方案、代码色、G Design 与 Element Plus 兼容映射。原文歧义、不同表格的取值差异以及实现选择详见颜色映射文档。
