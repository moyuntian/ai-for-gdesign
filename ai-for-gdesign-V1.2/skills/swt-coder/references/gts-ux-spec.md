---
name: gts-ux-spec
description: GTS UX设计规范，涵盖色彩系统、字体规范、间距体系、圆角、阴影、边框等UI参数，适用于中后台系统、前端组件开发等场景。
---

# GTS UX 设计规范

## 概述

本 Skill 提供华为GTS (Global Technical Services) PC端 UX 设计规范的快速参考，涵盖色彩系统、字体规范、间距体系、圆角、阴影、边框等UI参数，适用于中后台系统、前端组件开发等场景。


---

## 1. CSS变量使用说明

### 1.1 变量命名规则
- 所有变量使用时需添加前缀 `--swt-`
- 格式：`表意描述-类型`，如 `icon-color`
- 引用通用属性：`#colors.preset[color1]` 或 `#fonts.title[layer3]`

### 1.2 变量类型格式

| 类型 | 格式要求 | 示例 |
|------|----------|------|
| font | 字号(px) 样式(normal/bold) 颜色(#XXXXXX) 行间距(px) | `12px normal #707070 24px` |
| color | 颜色(#XXXXXX，16进制) | `#ffffff` |
| border | 边框宽度(px) 边框样式(solid/dashed等) 边框颜色 | `1px solid #EEEEEE` |
| size | 非负，单位px | `4px` |
| cursor | 枚举：default/pointer/not-allowed/text | `pointer` |
| shadow | h-shadow v-shadow blur spread color inset | `10px 10px 5px 0px #888888` |

---

## 2. 色彩系统

### 2.1 品牌色 (Brand Color)

| 变量名 | 浅色模式 | 深色模式 | 使用场景 |
|--------|----------|----------|----------|
| --swt-color-brand-normal | #C7000B | #C7000B | 品牌色（单独或作为交互元素的正常状态色使用） |
| --swt-color-brand-hover | #BD000A | #CF2B2C | 悬浮色 |
| --swt-color-brand-active | #B3010B | #D23839 | 激活/按下色 |

### 2.2 强调色/高亮色 (Accent Color)

| 变量名 | 浅色模式 | 深色模式 | 使用场景 |
|--------|----------|----------|----------|
| --swt-color-accent-normal | #0067D1 | #0073e8 | 非文本场景：高亮色 |
| --swt-color-accent-hover | #004794 | #0071ca | 非文本场景：悬浮色 |
| --swt-color-accent-active | #002d62 | #006ead | 非文本场景：激活/按下色 |
| --swt-color-accent-focus | #0067D1 | #0073e8 | 非文本场景：选中/获焦色 |
| --swt-color-accent-text-normal | #0067D1 | #428aff | 文本场景：高亮色，如超链接/文本按钮等 |
| --swt-color-accent-text-hover | #004794 | #7ca4ff | 文本场景：悬浮色 |
| --swt-color-accent-text-active | #002d62 | #b1c5ff | 文本场景：激活/按下色 |
| --swt-color-accent-text-focus | #0067D1 | #428aff | 文本场景：选中/获焦色 |

### 2.3 中性色/灰度色 (Gray Color)

| 变量名 | 浅色模式 | 深色模式 | 使用场景 |
|--------|----------|----------|----------|
| --swt-color-gray1 / --swt-color-bg-primary | #FFFFFF | #1E1E1E | 一级背景（卡片背景） |
| --swt-color-gray2 / --swt-color-bg-secondary | #F5F5F5 | #000000 | 二级背景（底层背景） |
| --swt-color-gray3 / --swt-color-bg-selected | #E9E9E9 | #2E2E2E | 选中背景、禁用描边、禁用组件背景色 |
| --swt-color-gray4 / --swt-color-dividing-line-primary | #C6C6C6 | #494949 | 分割线 |
| --swt-color-gray5 / --swt-color-text-disabled | #A6A6A6 | #626262 | 失效文本、描边样式 |
| --swt-color-gray6 / --swt-color-text-extra | #868686 | #767676 | 辅助文本、斑马纹填充 |
| --swt-color-gray7 | #767676 | #868686 | - |
| --swt-color-gray8 / --swt-color-text-secondary | #626262 | #A6A6A6 | 二级文本 |
| --swt-color-gray9 | #494949 | #C6C6C6 | - |
| --swt-color-gray10 | #2E2E2E | #E9E9E9 | - |
| --swt-color-gray11 / --swt-color-text-primary | #1E1E1E | #F5F5F5 | 一级文本 |
| --swt-color-gray12 | #000000 | #FFFFFF | - |
| --swt-color-gray13 / --swt-color-white | #FFFFFF | #FFFFFF | 文字反色，如极夜黑风格下主要按钮文字反白处理 |

### 2.4 功能色 (Semantic Colors)

**紧急/错误/危险：**

| 变量名 | 浅色模式 | 深色模式 |
|--------|----------|----------|
| --swt-color-function-urgent-normal | #dd3336 | #ff6a6a |
| --swt-color-function-urgent-hover | #be2326 | #e63437 |
| --swt-color-function-urgent-disabled | #dd3336 60% | #ff6a6a 60% |
| --swt-color-function-urgent-active | #980006 | #c72c2e |
| --swt-color-function-urgent-background | #FFF2F2 | #640002 |
| --swt-color-function-urgent-text-normal | #be2326 | #f65457 |

**重要：**

| 变量名 | 浅色模式 | 深色模式 |
|--------|----------|----------|
| --swt-color-function-important-normal | #d26915 | #f27500 |
| --swt-color-function-important-hover | #bc5b00 | #cc6200 |
| --swt-color-function-important-active | #9d4b00 | #a85000 |

**次要/警告：**

| 变量名 | 浅色模式 | 深色模式 |
|--------|----------|----------|
| --swt-color-function-warning-normal | #e7c325 | #e7c325 |
| --swt-color-function-warning-background | #fff4dc | #392d00 |

**成功/正常：**

| 变量名 | 浅色模式 | 深色模式 |
|--------|----------|----------|
| --swt-color-function-success-normal | #009b49 | #00c45d |
| --swt-color-function-success-background | #e0fce7 | #003615 |

**提示/运行中/主要：**

| 变量名 | 浅色模式 | 深色模式 |
|--------|----------|----------|
| --swt-color-function-prompt-normal | #008ddb | #74b8ff |
| --swt-color-function-prompt-background | #f0f6ff | #003050 |

### 2.5 辅助色 (Ancillary Colors)

支持多种颜色色阶（red1-10, orange1-10, yellow1-10, lime1-10, prasinous1-10, green1-10, cyan1-10, sapphire1-10, blue1-10, purple1-10），深色模式与浅色模式颜色反转。

示例（红色系）：
- 浅色模式：red1=#FFF2F2 → red10=#410809
- 深色模式：red1=#410809 → red10=#FFF2F2

---

## 3. 字体系统

### 3.1 字体族

| 变量名 | 值 | 说明 |
|--------|-----|------|
| --swt-font-family-zh | SourceHanSansCN,PingFang SC,MicroSoft YaHei | 中文字族 |
| --swt-font-family-en | Huawei Sans,Manrope,Arial,San Francisco,Helvetica,Roboto | 英文字族 |
| --swt-font-family-other | Roboto | 特殊字族 |

### 3.2 字号体系

| 变量名 | 字号 | 使用场景 |
|--------|------|----------|
| --swt-font-size-small | 12px | 辅助文本 |
| --swt-font-size-normal | 14px | 正文/三级标题（如表格表头） |
| --swt-font-size-normal1 | 16px | 二级标题（如弹窗、卡片标题） |
| --swt-font-size-medium | 20px | 一级标题（如页面级标题） |
| --swt-font-size-big | 24px | 扩展文本1 |
| --swt-font-size-big1 | 30px | 扩展文本2 |
| --swt-font-size-big2 | 36px | 扩展文本3 |
| --swt-font-size-big3 | 40px | 扩展文本4 |
| --swt-font-size-big4 | 48px | 展示文本3（多用于指标卡片中的大号数值） |
| --swt-font-size-big5 | 60px | 展示文本2 |
| --swt-font-size-big6 | 80px | 展示文本1 |

### 3.3 字重体系

| 变量名 | 浅色模式 | 深色模式 |
|--------|----------|----------|
| --swt-font-weight-light | 300 | 400 |
| --swt-font-weight-normal | 400 | 500 |
| --swt-font-weight-bold | 600 | 700 |

### 3.4 行高体系

| 变量名 | 行高 |
|--------|------|
| --swt-font-line-height-small | 20px |
| --swt-font-line-height-normal | 22px |
| --swt-font-line-height-normal1 | 24px |
| --swt-font-line-height-medium | 28px |
| --swt-font-line-height-big | 32px |
| --swt-font-line-height-big1 | 38px |
| --swt-font-line-height-big2 | 44px（特殊用法，不建议换行） |
| --swt-font-line-height-big3 | 48px |
| --swt-font-line-height-big4 | 56px |
| --swt-font-line-height-big5 | 68px |
| --swt-font-line-height-big6 | 88px |

---

## 2. 字体系统

### 2.1 字体族

```
主字体: "HuaweiSans", "Helvetica Neue", Helvetica, Arial, sans-serif
等宽字体: "HuaweiMono", "Consolas", "Monaco", monospace
中文主字体: "华为孟菲体", "PingFang SC", "Microsoft YaHei"
```

### 2.2 字号体系

| 字号名称 | 像素大小 | 行高 | 使用场景 |
|----------|----------|------|----------|
| Display | 32px | 40px | 大标题、Hero区域 |
| H1 | 28px | 36px | 页面主标题 |
| H2 | 24px | 32px | 章节标题 |
| H3 | 20px | 28px | 子章节标题 |
| H4 | 18px | 26px | 卡片标题 |
| Body Large | 16px | 24px | 重要正文、次要标题 |
| Body | 14px | 22px | 正文、表格内容 |
| Body Small | 13px | 20px | 辅助说明 |
| Caption | 12px | 18px | 标签、提示文字 |
| Overline | 11px | 16px | 微型说明 |

### 2.3 字重体系

```
Font Weight:
- Regular (常规): 400
- Medium (中等): 500
- Semibold (半粗): 600
- Bold (加粗): 700
```

### 2.4 文字颜色规范

```
#1F1F1F - 页面标题、模块标题
#262626 - 正文内容
#595959 - 次要说明
#8C8C8C - 辅助信息、占位符
#BFBFBF - 禁用文字
```

---

## 4. 间距系统 (Spacing)

### 4.1 间距变量

| 变量名 | 数值 | 使用场景 |
|--------|------|----------|
| --swt-space-size-4 | 4px | 辅助文本与正文间距 |
| --swt-space-size-8 | 8px | 组件中label与控件主体间距（含水平与垂直两种布局） |
| --swt-space-size-12 | 12px | 输入框内边距（文本与边框间距） |
| --swt-space-size-16 | 16px | 卡片间距（参考基准）、成组关系的行内表单中标准按钮、输入框等 |
| --swt-space-size-20 | 20px | 二级标题与正文、卡片内边距 |
| --swt-space-size-24 | 24px | - |
| --swt-space-size-32 | 32px | - |
| --swt-space-size-40 | 40px | - |
| --swt-space-size-48 | 48px | - |
| --swt-space-size-56 | 56px | - |
| --swt-space-size-64 | 64px | - |
| --swt-space-size-72 | 72px | - |
| --swt-space-size-80 | 80px | - |

---

## 5. 圆角系统 (Border Radius)

### 5.1 圆角变量

| 变量名 | 数值 | 使用场景 |
|--------|------|----------|
| --swt-radius-size-small | 2px | 基础多选 |
| --swt-radius-size-normal | 4px | 按钮、选项卡页签、分页、输入框、滑块标签、搜索框、选择器 |
| --swt-radius-size-medium | 4px | 卡片、气泡、弹窗、对话框、积分卡、穿梭框、颜色选择、日期选择 |
| --swt-radius-size-big | 12px | 预留 |
| --swt-radius-size-big1 | 16px | 预留 |
| --swt-radius-size-infinity | 999px | 用于全圆角：滚动条、步骤条、回到顶部、滑块、基础单选、开关 |

---

## 6. 边框系统 (Border)

### 6.1 边框宽度

| 变量名 | 数值 |
|--------|------|
| --swt-border-width-none | 0px |
| --swt-border-width-thin | 1px |
| --swt-border-width-thick | 2px |

### 6.2 边框样式

| 变量名 | 值 |
|--------|-----|
| --swt-border-style-dotted | dotted |
| --swt-border-style-dashed | dashed |
| --swt-border-style-solid | solid |

---

## 7. 阴影系统 (Shadow)

### 7.1 阴影变量

| 变量名 | 浅色模式 | 深色模式 |
|--------|----------|----------|
| --swt-shadow1 | 0px 4px 8px 0px rgba(0,0,0,0.2) outset | 0px 4px 8px 0px rgba(0,0,0,0.8) outset |

---

## 8. 光标系统 (Cursor)

| 变量名 | 值 |
|--------|-----|
| --swt-cursor-default | default |
| --swt-cursor-pointer | pointer |
| --swt-cursor-not-allowed | not-allowed |
| --swt-cursor-text | text |

---

## 9. 栅格系统

### 6.1 24栏栅格

```
总宽度: 100%
 gutters: 16px (左右各8px)
 最大宽度: 1440px
 响应式断点:
 - xs: 480px  (移动端)
 - sm: 576px  (大手机)
 - md: 768px  (平板)
 - lg: 992px  (小笔记本)
 - xl: 1200px (桌面)
 - xxl: 1440px (大屏)
```

### 6.2 常用布局

```css
/* 页面布局 */
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 栅格 */
.row {
  display: flex;
  margin-left: -8px;
  margin-right: -8px;
}

.col-24 { flex: 0 0 100%; max-width: 100%; }
.col-12 { flex: 0 0 50%; max-width: 50%; }
.col-8  { flex: 0 0 33.33%; max-width: 33.33%; }
.col-6  { flex: 0 0 25%; max-width: 25%; }
.col-4  { flex: 0 0 16.67%; max-width: 16.67%; }
.col-3  { flex: 0 0 12.5%; max-width: 12.5%; }
```

---

## 7. 布局规范

### 7.1 页面布局

```vue
<template>
  <sweet-container class="layout">
    <sweet-header>顶部导航</sweet-header>
    <sweet-container>
      <sweet-aside>侧边栏</sweet-aside>
      <sweet-main>主内容区</sweet-main>
    </sweet-container>
  </sweet-container>
</template>
```

**布局规范:**
- 顶部导航高度: 60px
- 侧边栏宽度: 200px (可折叠至 64px)
- 主内容区内边距: 24px
- 页面最小宽度: 960px

### 7.2 响应式断点

| 断点 | 屏幕宽度 | 列数 | 适用设备 |
|------|----------|------|----------|
| xs | < 576px | 4 | 超级小屏 |
| sm | ≥ 576px | 8 | 手机横屏 |
| md | ≥ 768px | 12 | 平板 |
| lg | ≥ 992px | 12 | 小笔记本 |
| xl | ≥ 1200px | 24 | 桌面 |
| xxl | ≥ 1440px | 24 | 大屏 |

---

## 8. 动画规范

### 8.1 时长规范

```css
/* 快速交互 */
duration-fast: 100ms;   /* 颜色变化、简单状态 */

/* 常规动画 */
duration-normal: 200ms; /* 按钮悬停、展开收起 */
duration-slow: 300ms;   /* 模态框、页面切换 */

/* 特殊动画 */
duration-slower: 500ms; /* 大型组件、复杂动画 */
```

### 8.2 缓动函数

```css
/* 常规 */
ease-default: cubic-bezier(0.4, 0, 0.2, 1);

/* 缓入 */
ease-in: cubic-bezier(0.4, 0, 1, 1);

/* 缓出 */
ease-out: cubic-bezier(0, 0, 0.2, 1);

/* 缓入缓出 */
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* 弹性 */
ease-back: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 8.3 常用动画

```css
/* 淡入 */
fade-enter-active { transition: opacity 200ms ease; }
fade-enter-from { opacity: 0; }

/* 向上滑入 */
slide-up-enter-active { transition: all 200ms ease; }
slide-up-enter-from { transform: translateY(10px); opacity: 0; }

/* 缩放 */
zoom-enter-active { transition: all 200ms ease; }
zoom-enter-from { transform: scale(0.95); opacity: 0; }
```

---

## 9. 无障碍规范 (Accessibility)

### 9.1 键盘操作

```
Tab: 前进到下一个可聚焦元素
Shift+Tab: 后退到上一个可聚焦元素
Enter/Space: 激活按钮/链接
Escape: 关闭弹窗/下拉
方向键: 导航菜单/选项
```

### 9.2 ARIA 属性

```html
<!-- 按钮 -->
<button role="button" aria-pressed="false">操作</button>

<!-- 复选框 -->
<input type="checkbox" role="checkbox" aria-checked="false" />

<!-- 标签 -->
<label id="label1">用户名</label>
<input aria-labelledby="label1" />

<!-- 必填 -->
<input aria-required="true" />

<!-- 禁用 -->
<button aria-disabled="true">操作</button>

<!-- 加载状态 -->
<div role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
```

### 9.3 对比度要求

```
正文文字: 对比度 ≥ 4.5:1
大号文字(18px+ 或 14px粗体): 对比度 ≥ 3:1
图标/装饰: 对比度 ≥ 3:1
```

---

## 10. 命名规范

### 10.1 类名命名

```css
/* 组件命名 */
.sweet-button { }
.sweet-button--primary { }
.sweet-button__icon { }
.sweet-button.is-disabled { }

/* 状态命名 */
.is-active
.is-disabled
.is-checked
.is-selected
.is-expanded
.is-loading
```

### 10.2 颜色变量

#### 浅色主题

```css
body[theme='uDesign2.2-light'] {
  /* 品牌色 */
  --swt-color-brand-normal: #c7000b;
  --swt-color-brand-hover: #c7000b;
  --swt-color-brand-active: #980006;
  --swt-color-brand-focus: #c7000b;
  --swt-color-brand-text-normal: #c7000b;
  --swt-color-brand-text-hover: #d5000d;
  --swt-color-brand-text-active: #980006;
  --swt-color-brand-text-focus: #c7000b;

  /* 系统色 */
  --swt-color-accent-normal: #0067d1;
  --swt-color-accent-hover: #0067d1;
  --swt-color-accent-active: #004794;
  --swt-color-accent-disabled: #0067d166;
  --swt-color-accent-focus: #0067d1;
  --swt-color-accent-text-normal: #0060c3;
  --swt-color-accent-text-hover: #0069d6;
  --swt-color-accent-text-active: #004794;
  --swt-color-accent-text-disabled: #0060c366;
  --swt-color-accent-text-focus: #0060c3;

  /* 中性色 */
  --swt-color-gray1: #ffffff;
  --swt-color-gray2: #f5f5f5;
  --swt-color-gray3: #e9e9e9;
  --swt-color-gray4: #c6c6c6;
  --swt-color-gray5: #a6a6a6;
  --swt-color-gray6: #868686;
  --swt-color-gray7: #767676;
  --swt-color-gray8: #626262;
  --swt-color-gray9: #494949;
  --swt-color-gray10: #2e2e2e;
  --swt-color-gray11: #1e1e1e;
  --swt-color-gray12: #000000;
  --swt-color-gray13: #ffffff;

  /* 功能色 */
  --swt-color-function-urgent-normal: #dd3336;
  --swt-color-function-urgent-hover: #dd3336;
  --swt-color-function-urgent-active: #ba292c;
  --swt-color-function-urgent-disabled: #dd333666;
  --swt-color-function-urgent-background: #fff2f2;
  --swt-color-function-urgent-background1: #dd333626;
  --swt-color-function-urgent-focus: #dd3336;
  --swt-color-function-success-normal: #009b49;
  --swt-color-function-success-hover: #009b49;
  --swt-color-function-success-active: #00893f;
  --swt-color-function-success-disabled: #009b4966;
  --swt-color-function-success-background: #e4fae9;
  --swt-color-function-success-background1: #009b4926;
  --swt-color-function-success-focus: #009b49;
  --swt-color-function-important-normal: #d26915;
  --swt-color-function-important-hover: #d26915;
  --swt-color-function-important-active: #ba5c11;
  --swt-color-function-important-disabled: #d2691566;
  --swt-color-function-important-background: #fff2ef;
  --swt-color-function-important-background1: #d2691526;
  --swt-color-function-important-focus: #d26915;
  --swt-color-function-warning-normal: #e7c325;
  --swt-color-function-warning-hover: #e7c325;
  --swt-color-function-warning-active: #c3a41d;
  --swt-color-function-warning-disabled: #e7c32566;
  --swt-color-function-warning-background: #fef4de;
  --swt-color-function-warning-background1: #e7c32540;
  --swt-color-function-warning-focus: #e7c325;
  --swt-color-function-prompt-normal: #008ddb;
  --swt-color-function-prompt-hover: #008ddb;
  --swt-color-function-prompt-active: #007bc1;
  --swt-color-function-prompt-disabled: #008ddb66;
  --swt-color-function-prompt-background: #eff5ff;
  --swt-color-function-prompt-background1: #008ddb26;
  --swt-color-function-prompt-focus: #008ddb;
  --swt-color-function-urgent-text-normal: #be2326;
  --swt-color-function-urgent-text-hover: #cc2e31;
  --swt-color-function-urgent-text-active: #980006;
  --swt-color-function-urgent-text-disabled: #be232666;
  --swt-color-function-urgent-text-focus: #be2326;
  --swt-color-function-success-text-normal: #007234;
  --swt-color-function-success-text-hover: #007f3a;
  --swt-color-function-success-text-active: #005525;
  --swt-color-function-success-text-disabled: #00723466;
  --swt-color-function-success-text-focus: #007234;
  --swt-color-function-important-text-normal: #9c4b00;
  --swt-color-function-important-text-hover: #af5500;
  --swt-color-function-important-text-active: #773700;
  --swt-color-function-important-text-disabled: #9c4b0066;
  --swt-color-function-important-text-focus: #9c4b00;
  --swt-color-function-warning-text-normal: #756100;
  --swt-color-function-warning-text-hover: #836c00;
  --swt-color-function-warning-text-active: #574800;
  --swt-color-function-warning-text-disabled: #75610066;
  --swt-color-function-warning-text-focus: #756100;
  --swt-color-function-prompt-text-normal: #0067a1;
  --swt-color-function-prompt-text-hover: #0073b3;
  --swt-color-function-prompt-text-active: #004d7a;
  --swt-color-function-prompt-text-disabled: #0067a166;
  --swt-color-function-prompt-text-focus: #0067a1;

  /* 辅助色 */
  --swt-color-ancillary-blue1: #f2f5ff;
  --swt-color-ancillary-blue2: #e3e8ff;
  --swt-color-ancillary-blue3: #b4c4ff;
  --swt-color-ancillary-blue4: #83a3ff;
  --swt-color-ancillary-blue5: #3f81ff;
  --swt-color-ancillary-blue6: #2971ea;
  --swt-color-ancillary-blue7: #215dc4;
  --swt-color-ancillary-blue8: #174595;
  --swt-color-ancillary-blue9: #0d2c62;
  --swt-color-ancillary-blue10: #071c44;
  --swt-color-ancillary-sapphire1: #eff6fd;
  --swt-color-ancillary-sapphire2: #daebfc;
  --swt-color-ancillary-sapphire3: #89ceff;
  --swt-color-ancillary-sapphire4: #00b1f5;
  --swt-color-ancillary-sapphire5: #008fc7;
  --swt-color-ancillary-sapphire6: #007eb0;
  --swt-color-ancillary-sapphire7: #006993;
  --swt-color-ancillary-sapphire8: #004e6f;
  --swt-color-ancillary-sapphire9: #003248;
  --swt-color-ancillary-sapphire10: #002131;
  --swt-color-ancillary-purple1: #f7f3ff;
  --swt-color-ancillary-purple2: #ede5ff;
  --swt-color-ancillary-purple3: #d1bbff;
  --swt-color-ancillary-purple4: #b992ff;
  --swt-color-ancillary-purple5: #9f69f2;
  --swt-color-ancillary-purple6: #8e59dd;
  --swt-color-ancillary-purple7: #764ab9;
  --swt-color-ancillary-purple8: #59368c;
  --swt-color-ancillary-purple9: #39215c;
  --swt-color-ancillary-purple10: #26153f;
  --swt-color-ancillary-cyan1: #edf7fa;
  --swt-color-ancillary-cyan2: #d4eef5;
  --swt-color-ancillary-cyan3: #72d4e9;
  --swt-color-ancillary-cyan4: #00b6cf;
  --swt-color-ancillary-cyan5: #0094a7;
  --swt-color-ancillary-cyan6: #008294;
  --swt-color-ancillary-cyan7: #006c7b;
  --swt-color-ancillary-cyan8: #00515d;
  --swt-color-ancillary-cyan9: #00333c;
  --swt-color-ancillary-cyan10: #002228;
  --swt-color-ancillary-fuchsia1: #fdf2fe;
  --swt-color-ancillary-fuchsia2: #f9e2fa;
  --swt-color-ancillary-fuchsia3: #f0b1f2;
  --swt-color-ancillary-fuchsia4: #df86e1;
  --swt-color-ancillary-fuchsia5: #c75bc9;
  --swt-color-ancillary-fuchsia6: #b34cb5;
  --swt-color-ancillary-fuchsia7: #963e98;
  --swt-color-ancillary-fuchsia8: #712d73;
  --swt-color-ancillary-fuchsia9: #4a1b4b;
  --swt-color-ancillary-fuchsia10: #321033;
  --swt-color-ancillary-green1: #ecf7f5;
  --swt-color-ancillary-green2: #d3efea;
  --swt-color-ancillary-green3: #72d7c8;
  --swt-color-ancillary-green4: #00baa8;
  --swt-color-ancillary-green5: #009788;
  --swt-color-ancillary-green6: #008578;
  --swt-color-ancillary-green7: #006f63;
  --swt-color-ancillary-green8: #00534a;
  --swt-color-ancillary-green9: #00352f;
  --swt-color-ancillary-green10: #00231f;
  --swt-color-ancillary-rose1: #fff2f9;
  --swt-color-ancillary-rose2: #ffe1f1;
  --swt-color-ancillary-rose3: #ffaddc;
  --swt-color-ancillary-rose4: #f081c4;
  --swt-color-ancillary-rose5: #d756a8;
  --swt-color-ancillary-rose6: #c14796;
  --swt-color-ancillary-rose7: #a23a7d;
  --swt-color-ancillary-rose8: #7a2a5e;
  --swt-color-ancillary-rose9: #50193c;
  --swt-color-ancillary-rose10: #370f28;
  --swt-color-ancillary-prasinous1: #eef8ee;
  --swt-color-ancillary-prasinous2: #d9efd8;
  --swt-color-ancillary-prasinous3: #98d594;
  --swt-color-ancillary-prasinous4: #65b95e;
  --swt-color-ancillary-prasinous5: #379929;
  --swt-color-ancillary-prasinous6: #2a881a;
  --swt-color-ancillary-prasinous7: #227114;
  --swt-color-ancillary-prasinous8: #17550d;
  --swt-color-ancillary-prasinous9: #0c3605;
  --swt-color-ancillary-prasinous10: #062403;
  --swt-color-ancillary-red1: #fff2f5;
  --swt-color-ancillary-red2: #ffe2e9;
  --swt-color-ancillary-red3: #ffb0c7;
  --swt-color-ancillary-red4: #fa7ea8;
  --swt-color-ancillary-red5: #df5489;
  --swt-color-ancillary-red6: #c94678;
  --swt-color-ancillary-red7: #a83964;
  --swt-color-ancillary-red8: #7f294b;
  --swt-color-ancillary-red9: #53182f;
  --swt-color-ancillary-red10: #390e1f;
  --swt-color-ancillary-lime1: #f2f7e8;
  --swt-color-ancillary-lime2: #e3edcc;
  --swt-color-ancillary-lime3: #b8d077;
  --swt-color-ancillary-lime4: #96b132;
  --swt-color-ancillary-lime5: #789000;
  --swt-color-ancillary-lime6: #697f00;
  --swt-color-ancillary-lime7: #576900;
  --swt-color-ancillary-lime8: #414f00;
  --swt-color-ancillary-lime9: #283200;
  --swt-color-ancillary-lime10: #1a2100;
  --swt-color-ancillary-orange1: #fff2f0;
  --swt-color-ancillary-orange2: #ffe3de;
  --swt-color-ancillary-orange3: #ffb4a2;
  --swt-color-ancillary-orange4: #fe8357;
  --swt-color-ancillary-orange5: #de5f17;
  --swt-color-ancillary-orange6: #c75200;
  --swt-color-ancillary-orange7: #a64300;
  --swt-color-ancillary-orange8: #7e3100;
  --swt-color-ancillary-orange9: #531e00;
  --swt-color-ancillary-orange10: #391200;
  --swt-color-ancillary-yellow1: #fff4e4;
  --swt-color-ancillary-yellow2: #ffe6c0;
  --swt-color-ancillary-yellow3: #efbf5d;
  --swt-color-ancillary-yellow4: #d09f00;
  --swt-color-ancillary-yellow5: #a88000;
  --swt-color-ancillary-yellow6: #957100;
  --swt-color-ancillary-yellow7: #7c5e00;
  --swt-color-ancillary-yellow8: #5d4600;
  --swt-color-ancillary-yellow9: #3c2c00;
  --swt-color-ancillary-yellow10: #281c00;

  /* 图表推荐色 */
  --swt-color-chart-A1: #6190ff;
  --swt-color-chart-A2: #4ea744;
  --swt-color-chart-A3: #ea6897;
  --swt-color-chart-A4: #00a3b8;
  --swt-color-chart-A5: #d06fd2;
  --swt-color-chart-A6: #849f00;
  --swt-color-chart-A7: #ec6f3b;
  --swt-color-chart-A8: #00a696;
  --swt-color-chart-A9: #e16ab3;
  --swt-color-chart-A10: #009edb;
  --swt-color-chart-A11: #a97cf6;
  --swt-color-chart-B1: #3f81ff;
  --swt-color-chart-B2: #0093e2;
  --swt-color-chart-B3: #009ece;
  --swt-color-chart-B4: #00a8c2;
  --swt-color-chart-B5: #00b2af;
  --swt-color-chart-B6: #00baa8;
  --swt-color-chart-B7: #55c086;
  --swt-color-chart-B8: #70c57c;
  --swt-color-chart-B9: #82ca79;
  --swt-color-chart-B10: #9bce6e;
  --swt-color-chart-B11: #b8d077;

  /* 叠加色 */
  --swt-color-accent-normal-opacity20: #0067d133;
  --swt-color-accent-normal-opacity40: #0067d166;
  --swt-color-function-urgent-normal-opacity20: #dd333633;
  --swt-color-function-urgent-normal-opacity40: #dd333666;
  --swt-color-brand-normal-opacity20: #c7000b33;
  --swt-color-brand-normal-opacity40: #c7000b66;
  --swt-color-gray11-opacity20: #1e1e1e33;
  --swt-color-gray11-opacity40: #1e1e1e66;
  --swt-color-gray4-opacity60: #c6c6c699;
  --swt-color-gray6-opacity5: #8686860d;
  --swt-color-gray11-opacity30: #1e1e1e4d;
  --swt-color-gray2-opacity70: #f5f5f5b2;
  --swt-color-overlay-gray1-and-gray5-opacity20: #ededed;
  --swt-color-overlay-gray1-and-gray6-opacity10: #f3f3f3;
  --swt-color-overlay-gray1-and-gray12-opacity5: #f2f2f2;
  --swt-color-overlay-gray1-and-gray12-opacity10: #e6e6e6;
  --swt-color-overlay-gray1-and-accent-normal-opacity5: #f2f7fd;
  --swt-color-overlay-gray1-and-accent-normal-opacity10: #e6f0fa;
  --swt-color-overlay-gray1-and-accent-normal-opacity20: #cce1f6;
  --swt-color-overlay-gray1-and-gray13-opacity5: #ffffff;
  --swt-color-overlay-gray1-and-urgent-normal-opacity10: #fcebeb;
  --swt-color-overlay-gray1-and-urgent-normal-opacity20: #f8d6d7;

  /* 边框 */
  --swt-border-width-none: 0px;
  --swt-border-width-normal: 1px;
  --swt-border-width-medium: 2px;
  --swt-border-width-independent: 0px;
  --swt-border-style-dotted: dotted;
  --swt-border-style-dashed: dashed;
  --swt-border-style-solid: solid;

  /* 阴影 */
  --swt-shadow1: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  --swt-shadow2: 0px 6px 18px 0px rgba(0, 0, 0, 0.1);
  --swt-shadow3: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  --swt-shadow4: -6px 0px 18px 0px rgba(0, 0, 0, 0.1);
  --swt-shadow5: 0px 20px 20px 0px rgba(0, 0, 0, 0.1);
  --swt-shadow6: 0px 0px 18px 0px rgba(0, 0, 0, 0.1);

  /* 图标插画 */
  --swt-icon-style: line;
  --swt-illustration-style: light;

  /* 透明度 */
  --swt-opacity0: 0;
  --swt-opacity5: 0.05;
  --swt-opacity10: 0.1;
  --swt-opacity15: 0.15;
  --swt-opacity20: 0.2;
  --swt-opacity25: 0.25;
  --swt-opacity30: 0.3;
  --swt-opacity35: 0.35;
  --swt-opacity40: 0.4;
  --swt-opacity45: 0.45;
  --swt-opacity50: 0.5;
  --swt-opacity55: 0.55;
  --swt-opacity60: 0.6;
  --swt-opacity65: 0.65;
  --swt-opacity70: 0.7;
  --swt-opacity75: 0.75;
  --swt-opacity80: 0.8;
  --swt-opacity85: 0.85;
  --swt-opacity90: 0.9;
  --swt-opacity95: 0.95;
  --swt-opacity100: 1;

  /* 字体 */
  --swt-font-size-mini: 8px;
  --swt-font-size-mini1: 10px;
  --swt-font-size-small: 12px;
  --swt-font-size-normal: 14px;
  --swt-font-size-subtitle1: 14px;
  --swt-font-size-headline8: 16px;
  --swt-font-size-normal1: 16px;
  --swt-font-size-medium: 20px;
  --swt-font-size-big: 24px;
  --swt-font-size-big1: 30px;
  --swt-font-size-big2: 36px;
  --swt-font-size-big3: 40px;
  --swt-font-size-big4: 48px;
  --swt-font-size-big5: 60px;
  --swt-font-size-big6: 80px;
  --swt-font-weight-thin: 200;
  --swt-font-weight-light: 300;
  --swt-font-weight-normal: 400;
  --swt-font-weight-medium: 500;
  --swt-font-weight-bold: 600;
  --swt-font-weight-black: 700;
  --swt-font-line-height-mini: 16px;
  --swt-font-line-height-mini1: 18px;
  --swt-font-line-height-small: 20px;
  --swt-font-line-height-normal: 22px;
  --swt-font-line-height-subtitle1: 22px;
  --swt-font-line-height-headline8: 24px;
  --swt-font-line-height-normal1: 24px;
  --swt-font-line-height-medium: 28px;
  --swt-font-line-height-big: 32px;
  --swt-font-line-height-big1: 38px;
  --swt-font-line-height-big2: 44px;
  --swt-font-line-height-big3: 48px;
  --swt-font-line-height-big4: 56px;
  --swt-font-line-height-big5: 68px;
  --swt-font-line-height-big6: 88px;
  --swt-font-family-zh: SourceHanSansCN, PingFang SC, MicroSoft YaHei;
  --swt-font-family-en: Huawei Sans, Manrope, Arial, San Francisco, Helvetica, Roboto;
  --swt-font-family-other: Roboto;

  /* 尺寸 */
  --swt-radius-size-small: 2px;
  --swt-radius-size-normal: 4px;
  --swt-radius-size-medium: 8px;
  --swt-radius-size-big: 12px;
  --swt-radius-size-big1: 16px;
  --swt-radius-size-big2: 20px;
  --swt-radius-size-infinity: 999px;
  --swt-space-size-2: 2px;
  --swt-space-size-4: 4px;
  --swt-space-size-8: 8px;
  --swt-space-size-12: 12px;
  --swt-space-size-16: 16px;
  --swt-space-size-20: 20px;
  --swt-space-size-24: 24px;
  --swt-space-size-32: 32px;
  --swt-space-size-40: 40px;
  --swt-space-size-48: 48px;
  --swt-space-size-56: 56px;
  --swt-space-size-64: 64px;
  --swt-space-size-72: 72px;
  --swt-space-size-80: 80px;

  /* 光标 */
  --swt-cursor-default: default;
  --swt-cursor-pointer: pointer;
  --swt-cursor-not-allowed: not-allowed;
  --swt-cursor-text: text;

  /* 别名 */
  --swt-color-bg-primary: var(--swt-color-gray1);
  --swt-color-bg-secondary: var(--swt-color-gray2);
  --swt-color-border-disabled: var(--swt-color-gray3);
  --swt-color-bg-disabled: var(--swt-color-gray3);
  --swt-color-dividing-line-secondary: var(--swt-color-gray3);
  --swt-color-dividing-line-primary: var(--swt-color-gray4);
  --swt-color-text-disabled: var(--swt-color-gray5);
  --swt-color-text-extra: var(--swt-color-gray6);
  --swt-color-border: var(--swt-color-gray6);
  --swt-color-placeholder: var(--swt-color-gray6);
  --swt-color-text-secondary: var(--swt-color-gray8);
  --swt-color-text-primary: var(--swt-color-gray11);
  --swt-color-white: var(--swt-color-gray13);
  --swt-color-bg-text-button-hover: var(--swt-color-overlay-gray1-and-accent-normal-opacity10);
  --swt-color-bg-text-button-active: var(--swt-color-overlay-gray1-and-accent-normal-opacity20);
  --swt-color-bg-primary-button-hover: var(--swt-color-accent-normal-opacity20);
  --swt-color-bg-danger-button-hover: var(--swt-color-function-urgent-normal-opacity20);
  --swt-color-bg-urgent-text-button-hover: var(--swt-color-overlay-gray1-and-urgent-normal-opacity10);
  --swt-color-bg-urgent-text-button-active: var(--swt-color-overlay-gray1-and-urgent-normal-opacity20);
  --swt-color-bg-brand-round-button-hover: var(--swt-color-brand-normal-opacity20);
  --swt-color-bg-gray-round-button-hover: var(--swt-color-gray11-opacity20);
  --swt-color-bg-mask: var(--swt-color-gray11-opacity30);
}

```

#### 深色主题
```css
body[theme='uDesign2.2-dark'] {
  /* 品牌色 */
  --swt-color-brand-normal: #c7000b;
  --swt-color-brand-hover: #c7000b;
  --swt-color-brand-active: #980006;
  --swt-color-brand-focus: #c7000b;
  --swt-color-brand-text-normal: #c7000b;
  --swt-color-brand-text-hover: #ed0010;
  --swt-color-brand-text-active: #980006;
  --swt-color-brand-text-focus: #c7000b;

  /* 系统色 */
  --swt-color-accent-normal: #0073e8;
  --swt-color-accent-hover: #0073e8;
  --swt-color-accent-active: #0070e1;
  --swt-color-accent-disabled: #0073e866;
  --swt-color-accent-focus: #0073e8;
  --swt-color-accent-text-normal: #7ca4ff;
  --swt-color-accent-text-hover: #b1c5ff;
  --swt-color-accent-text-active: #6c9cff;
  --swt-color-accent-text-disabled: #7ca4ff66;
  --swt-color-accent-text-focus: #7ca4ff;

  /* 中性色 */
  --swt-color-gray1: #1e1e1e;
  --swt-color-gray2: #000000;
  --swt-color-gray3: #2e2e2e;
  --swt-color-gray4: #494949;
  --swt-color-gray5: #626262;
  --swt-color-gray6: #767676;
  --swt-color-gray7: #868686;
  --swt-color-gray8: #a6a6a6;
  --swt-color-gray9: #c6c6c6;
  --swt-color-gray10: #e9e9e9;
  --swt-color-gray11: #f5f5f5;
  --swt-color-gray12: #ffffff;
  --swt-color-gray13: #ffffff;

  /* 功能色 */
  --swt-color-function-urgent-normal: #dd3336;
  --swt-color-function-urgent-hover: #dd3336;
  --swt-color-function-urgent-active: #d83134;
  --swt-color-function-urgent-disabled: #dd333666;
  --swt-color-function-urgent-background: #501f1f;
  --swt-color-function-urgent-background1: #dd333640;
  --swt-color-function-urgent-focus: #dd3336;
  --swt-color-function-success-normal: #009b49;
  --swt-color-function-success-hover: #009b49;
  --swt-color-function-success-active: #00853d;
  --swt-color-function-success-disabled: #009b4966;
  --swt-color-function-success-background: #0b3519;
  --swt-color-function-success-background1: #009b4940;
  --swt-color-function-success-focus: #009b49;
  --swt-color-function-important-normal: #d26915;
  --swt-color-function-important-hover: #d26915;
  --swt-color-function-important-active: #b55a10;
  --swt-color-function-important-disabled: #d2691566;
  --swt-color-function-important-background: #492410;
  --swt-color-function-important-background1: #d2691540;
  --swt-color-function-important-focus: #d26915;
  --swt-color-function-warning-normal: #e7c325;
  --swt-color-function-warning-hover: #e7c325;
  --swt-color-function-warning-active: #8d7712;
  --swt-color-function-warning-disabled: #e7c32566;
  --swt-color-function-warning-background: #372d03;
  --swt-color-function-warning-background1: #e7c32526;
  --swt-color-function-warning-focus: #e7c325;
  --swt-color-function-prompt-normal: #008ddb;
  --swt-color-function-prompt-hover: #008ddb;
  --swt-color-function-prompt-active: #0078bb;
  --swt-color-function-prompt-disabled: #008ddb66;
  --swt-color-function-prompt-background: #003050;
  --swt-color-function-prompt-background1: #008ddb40;
  --swt-color-function-prompt-focus: #008ddb;
  --swt-color-function-urgent-text-normal: #ff7f81;
  --swt-color-function-urgent-text-hover: #ffb2b3;
  --swt-color-function-urgent-text-active: #ff7072;
  --swt-color-function-urgent-text-disabled: #ff7f8166;
  --swt-color-function-urgent-text-focus: #ff7f81;
  --swt-color-function-success-text-normal: #00bf5c;
  --swt-color-function-success-text-hover: #00e46e;
  --swt-color-function-success-text-active: #00b657;
  --swt-color-function-success-text-disabled: #00bf5c66;
  --swt-color-function-success-text-focus: #00bf5c;
  --swt-color-function-important-text-normal: #fd8639;
  --swt-color-function-important-text-hover: #ffb498;
  --swt-color-function-important-text-active: #f67c1b;
  --swt-color-function-important-text-disabled: #fd863966;
  --swt-color-function-important-text-focus: #fd8639;
  --swt-color-function-warning-text-normal: #e7c325;
  --swt-color-function-warning-text-hover: #fee7ab;
  --swt-color-function-warning-text-active: #c3a41d;
  --swt-color-function-warning-text-disabled: #e7c32566;
  --swt-color-function-warning-text-focus: #e7c325;
  --swt-color-function-prompt-text-normal: #46acff;
  --swt-color-function-prompt-text-hover: #9dcaff;
  --swt-color-function-prompt-text-active: #00a5fe;
  --swt-color-function-prompt-text-disabled: #46acff66;
  --swt-color-function-prompt-text-focus: #46acff;

  /* 辅助色 */
  --swt-color-ancillary-blue1: #071c44;
  --swt-color-ancillary-blue2: #0d2c62;
  --swt-color-ancillary-blue3: #174595;
  --swt-color-ancillary-blue4: #215dc4;
  --swt-color-ancillary-blue5: #2971ea;
  --swt-color-ancillary-blue6: #3f81ff;
  --swt-color-ancillary-blue7: #83a3ff;
  --swt-color-ancillary-blue8: #b4c4ff;
  --swt-color-ancillary-blue9: #e3e8ff;
  --swt-color-ancillary-blue10: #f2f5ff;
  --swt-color-ancillary-sapphire1: #002131;
  --swt-color-ancillary-sapphire2: #003248;
  --swt-color-ancillary-sapphire3: #004e6f;
  --swt-color-ancillary-sapphire4: #006993;
  --swt-color-ancillary-sapphire5: #007eb0;
  --swt-color-ancillary-sapphire6: #008fc7;
  --swt-color-ancillary-sapphire7: #00b1f5;
  --swt-color-ancillary-sapphire8: #89ceff;
  --swt-color-ancillary-sapphire9: #daebfc;
  --swt-color-ancillary-sapphire10: #eff6fd;
  --swt-color-ancillary-purple1: #26153f;
  --swt-color-ancillary-purple2: #39215c;
  --swt-color-ancillary-purple3: #59368c;
  --swt-color-ancillary-purple4: #764ab9;
  --swt-color-ancillary-purple5: #8e59dd;
  --swt-color-ancillary-purple6: #9f69f2;
  --swt-color-ancillary-purple7: #b992ff;
  --swt-color-ancillary-purple8: #d1bbff;
  --swt-color-ancillary-purple9: #ede5ff;
  --swt-color-ancillary-purple10: #f7f3ff;
  --swt-color-ancillary-cyan1: #002228;
  --swt-color-ancillary-cyan2: #00333c;
  --swt-color-ancillary-cyan3: #00515d;
  --swt-color-ancillary-cyan4: #006c7b;
  --swt-color-ancillary-cyan5: #008294;
  --swt-color-ancillary-cyan6: #0094a7;
  --swt-color-ancillary-cyan7: #00b6cf;
  --swt-color-ancillary-cyan8: #72d4e9;
  --swt-color-ancillary-cyan9: #d4eef5;
  --swt-color-ancillary-cyan10: #edf7fa;
  --swt-color-ancillary-fuchsia1: #321033;
  --swt-color-ancillary-fuchsia2: #4a1b4b;
  --swt-color-ancillary-fuchsia3: #712d73;
  --swt-color-ancillary-fuchsia4: #963e98;
  --swt-color-ancillary-fuchsia5: #b34cb5;
  --swt-color-ancillary-fuchsia6: #c75bc9;
  --swt-color-ancillary-fuchsia7: #df86e1;
  --swt-color-ancillary-fuchsia8: #f0b1f2;
  --swt-color-ancillary-fuchsia9: #f9e2fa;
  --swt-color-ancillary-fuchsia10: #fdf2fe;
  --swt-color-ancillary-green1: #00231f;
  --swt-color-ancillary-green2: #00352f;
  --swt-color-ancillary-green3: #00534a;
  --swt-color-ancillary-green4: #006f63;
  --swt-color-ancillary-green5: #008578;
  --swt-color-ancillary-green6: #009788;
  --swt-color-ancillary-green7: #00baa8;
  --swt-color-ancillary-green8: #72d7c8;
  --swt-color-ancillary-green9: #d3efea;
  --swt-color-ancillary-green10: #ecf7f5;
  --swt-color-ancillary-rose1: #370f28;
  --swt-color-ancillary-rose2: #50193c;
  --swt-color-ancillary-rose3: #7a2a5e;
  --swt-color-ancillary-rose4: #a23a7d;
  --swt-color-ancillary-rose5: #c14796;
  --swt-color-ancillary-rose6: #d756a8;
  --swt-color-ancillary-rose7: #f081c4;
  --swt-color-ancillary-rose8: #ffaddc;
  --swt-color-ancillary-rose9: #ffe1f1;
  --swt-color-ancillary-rose10: #fff2f9;
  --swt-color-ancillary-prasinous1: #062403;
  --swt-color-ancillary-prasinous2: #0c3605;
  --swt-color-ancillary-prasinous3: #17550d;
  --swt-color-ancillary-prasinous4: #227114;
  --swt-color-ancillary-prasinous5: #2a881a;
  --swt-color-ancillary-prasinous6: #379929;
  --swt-color-ancillary-prasinous7: #65b95e;
  --swt-color-ancillary-prasinous8: #98d594;
  --swt-color-ancillary-prasinous9: #d9efd8;
  --swt-color-ancillary-prasinous10: #eef8ee;
  --swt-color-ancillary-red1: #390e1f;
  --swt-color-ancillary-red2: #53182f;
  --swt-color-ancillary-red3: #7f294b;
  --swt-color-ancillary-red4: #a83964;
  --swt-color-ancillary-red5: #c94678;
  --swt-color-ancillary-red6: #df5489;
  --swt-color-ancillary-red7: #fa7ea8;
  --swt-color-ancillary-red8: #ffb0c7;
  --swt-color-ancillary-red9: #ffe2e9;
  --swt-color-ancillary-red10: #fff2f5;
  --swt-color-ancillary-lime1: #1a2100;
  --swt-color-ancillary-lime2: #283200;
  --swt-color-ancillary-lime3: #414f00;
  --swt-color-ancillary-lime4: #576900;
  --swt-color-ancillary-lime5: #697f00;
  --swt-color-ancillary-lime6: #789000;
  --swt-color-ancillary-lime7: #96b132;
  --swt-color-ancillary-lime8: #b8d077;
  --swt-color-ancillary-lime9: #e3edcc;
  --swt-color-ancillary-lime10: #f2f7e8;
  --swt-color-ancillary-orange1: #391200;
  --swt-color-ancillary-orange2: #531e00;
  --swt-color-ancillary-orange3: #7e3100;
  --swt-color-ancillary-orange4: #a64300;
  --swt-color-ancillary-orange5: #c75200;
  --swt-color-ancillary-orange6: #de5f17;
  --swt-color-ancillary-orange7: #fe8357;
  --swt-color-ancillary-orange8: #ffb4a2;
  --swt-color-ancillary-orange9: #ffe3de;
  --swt-color-ancillary-orange10: #fff2f0;
  --swt-color-ancillary-yellow1: #281c00;
  --swt-color-ancillary-yellow2: #3c2c00;
  --swt-color-ancillary-yellow3: #5d4600;
  --swt-color-ancillary-yellow4: #7c5e00;
  --swt-color-ancillary-yellow5: #957100;
  --swt-color-ancillary-yellow6: #a88000;
  --swt-color-ancillary-yellow7: #d09f00;
  --swt-color-ancillary-yellow8: #efbf5d;
  --swt-color-ancillary-yellow9: #ffe6c0;
  --swt-color-ancillary-yellow10: #fff4e4;

  /* 图表推荐色 */
  --swt-color-chart-A1: #3e81ff;
  --swt-color-chart-A2: #379929;
  --swt-color-chart-A3: #df5488;
  --swt-color-chart-A4: #0093a8;
  --swt-color-chart-A5: #c75bc9;
  --swt-color-chart-A6: #779000;
  --swt-color-chart-A7: #de5f17;
  --swt-color-chart-A8: #009788;
  --swt-color-chart-A9: #d656a8;
  --swt-color-chart-A10: #008fc7;
  --swt-color-chart-A11: #9f69f2;
  --swt-color-chart-B1: #2971ea;
  --swt-color-chart-B2: #0d7fc3;
  --swt-color-chart-B3: #0087b0;
  --swt-color-chart-B4: #008ca3;
  --swt-color-chart-B5: #009290;
  --swt-color-chart-B6: #009788;
  --swt-color-chart-B7: #389e69;
  --swt-color-chart-B8: #4da55a;
  --swt-color-chart-B9: #5cab4e;
  --swt-color-chart-B10: #77af35;
  --swt-color-chart-B11: #96b132;

  /* 叠加色 */
  --swt-color-accent-normal-opacity20: #0073e833;
  --swt-color-accent-normal-opacity40: #0073e866;
  --swt-color-function-urgent-normal-opacity20: #dd333633;
  --swt-color-function-urgent-normal-opacity40: #dd333666;
  --swt-color-brand-normal-opacity20: #c7000b33;
  --swt-color-brand-normal-opacity40: #c7000b66;
  --swt-color-gray11-opacity20: #f5f5f533;
  --swt-color-gray11-opacity40: #f5f5f566;
  --swt-color-gray4-opacity60: #49494999;
  --swt-color-gray6-opacity5: #7676760d;
  --swt-color-gray11-opacity30: #f5f5f54d;
  --swt-color-gray2-opacity70: #000000b2;
  --swt-color-overlay-gray1-and-gray5-opacity20: #2c2c2c;
  --swt-color-overlay-gray1-and-gray6-opacity10: #272727;
  --swt-color-overlay-gray1-and-gray12-opacity5: #292929;
  --swt-color-overlay-gray1-and-gray12-opacity10: #353535;
  --swt-color-overlay-gray1-and-accent-normal-opacity5: #1c2228;
  --swt-color-overlay-gray1-and-accent-normal-opacity10: #1b2732;
  --swt-color-overlay-gray1-and-accent-normal-opacity20: #182f46;
  --swt-color-overlay-gray1-and-gray13-opacity5: #292929;
  --swt-color-overlay-gray1-and-urgent-normal-opacity10: #312020;
  --swt-color-overlay-gray1-and-urgent-normal-opacity20: #442223;

  /* 边框 */
  --swt-border-width-none: 0px;
  --swt-border-width-normal: 1px;
  --swt-border-width-medium: 2px;
  --swt-border-width-independent: 1px;
  --swt-border-style-dotted: dotted;
  --swt-border-style-dashed: dashed;
  --swt-border-style-solid: solid;

  /* 阴影 */
  --swt-shadow1: 0px 4px 8px 0px rgba(0, 0, 0, 0.8);
  --swt-shadow2: 0px 6px 18px 0px rgba(0, 0, 0, 0.8);
  --swt-shadow3: 0px 1px 3px 0px rgba(0, 0, 0, 0.8);
  --swt-shadow4: -6px 0px 18px 0px rgba(0, 0, 0, 0.8);
  --swt-shadow5: 0px 20px 20px 0px rgba(0, 0, 0, 0.8);
  --swt-shadow6: 0px 0px 18px 0px rgba(0, 0, 0, 0.8);

  /* 图标插画 */
  --swt-icon-style: face;
  --swt-illustration-style: dark;

  /* 透明度 */
  --swt-opacity0: 0;
  --swt-opacity5: 0.05;
  --swt-opacity10: 0.1;
  --swt-opacity15: 0.15;
  --swt-opacity20: 0.2;
  --swt-opacity25: 0.25;
  --swt-opacity30: 0.3;
  --swt-opacity35: 0.35;
  --swt-opacity40: 0.4;
  --swt-opacity45: 0.45;
  --swt-opacity50: 0.5;
  --swt-opacity55: 0.55;
  --swt-opacity60: 0.6;
  --swt-opacity65: 0.65;
  --swt-opacity70: 0.7;
  --swt-opacity75: 0.75;
  --swt-opacity80: 0.8;
  --swt-opacity85: 0.85;
  --swt-opacity90: 0.9;
  --swt-opacity95: 0.95;
  --swt-opacity100: 1;

  /* 字体 */
  --swt-font-size-mini: 8px;
  --swt-font-size-mini1: 10px;
  --swt-font-size-small: 12px;
  --swt-font-size-normal: 14px;
  --swt-font-size-subtitle1: 14px;
  --swt-font-size-headline8: 16px;
  --swt-font-size-normal1: 16px;
  --swt-font-size-medium: 20px;
  --swt-font-size-big: 24px;
  --swt-font-size-big1: 30px;
  --swt-font-size-big2: 36px;
  --swt-font-size-big3: 40px;
  --swt-font-size-big4: 48px;
  --swt-font-size-big5: 60px;
  --swt-font-size-big6: 80px;
  --swt-font-weight-thin: 200;
  --swt-font-weight-light: 300;
  --swt-font-weight-normal: 400;
  --swt-font-weight-medium: 500;
  --swt-font-weight-bold: 600;
  --swt-font-weight-black: 700;
  --swt-font-line-height-mini: 16px;
  --swt-font-line-height-mini1: 18px;
  --swt-font-line-height-small: 20px;
  --swt-font-line-height-normal: 22px;
  --swt-font-line-height-subtitle1: 22px;
  --swt-font-line-height-headline8: 24px;
  --swt-font-line-height-normal1: 24px;
  --swt-font-line-height-medium: 28px;
  --swt-font-line-height-big: 32px;
  --swt-font-line-height-big1: 38px;
  --swt-font-line-height-big2: 44px;
  --swt-font-line-height-big3: 48px;
  --swt-font-line-height-big4: 56px;
  --swt-font-line-height-big5: 68px;
  --swt-font-line-height-big6: 88px;
  --swt-font-family-zh: SourceHanSansCN, PingFang SC, MicroSoft YaHei;
  --swt-font-family-en: Huawei Sans, Manrope, Arial, San Francisco, Helvetica, Roboto;
  --swt-font-family-other: Roboto;

  /* 尺寸 */
  --swt-radius-size-small: 2px;
  --swt-radius-size-normal: 4px;
  --swt-radius-size-medium: 8px;
  --swt-radius-size-big: 12px;
  --swt-radius-size-big1: 16px;
  --swt-radius-size-big2: 20px;
  --swt-radius-size-infinity: 999px;
  --swt-space-size-2: 2px;
  --swt-space-size-4: 4px;
  --swt-space-size-8: 8px;
  --swt-space-size-12: 12px;
  --swt-space-size-16: 16px;
  --swt-space-size-20: 20px;
  --swt-space-size-24: 24px;
  --swt-space-size-32: 32px;
  --swt-space-size-40: 40px;
  --swt-space-size-48: 48px;
  --swt-space-size-56: 56px;
  --swt-space-size-64: 64px;
  --swt-space-size-72: 72px;
  --swt-space-size-80: 80px;

  /* 光标 */
  --swt-cursor-default: default;
  --swt-cursor-pointer: pointer;
  --swt-cursor-not-allowed: not-allowed;
  --swt-cursor-text: text;

  /* 别名 */
  --swt-color-bg-primary: var(--swt-color-gray1);
  --swt-color-bg-secondary: var(--swt-color-gray2);
  --swt-color-border-disabled: var(--swt-color-gray3);
  --swt-color-bg-disabled: var(--swt-color-gray3);
  --swt-color-dividing-line-secondary: var(--swt-color-gray3);
  --swt-color-dividing-line-primary: var(--swt-color-gray4);
  --swt-color-text-disabled: var(--swt-color-gray5);
  --swt-color-text-extra: var(--swt-color-gray6);
  --swt-color-border: var(--swt-color-gray6);
  --swt-color-placeholder: var(--swt-color-gray6);
  --swt-color-text-secondary: var(--swt-color-gray8);
  --swt-color-text-primary: var(--swt-color-gray11);
  --swt-color-white: var(--swt-color-gray13);
  --swt-color-bg-text-button-hover: var(--swt-color-overlay-gray1-and-accent-normal-opacity20);
  --swt-color-bg-text-button-active: var(--swt-color-overlay-gray1-and-accent-normal-opacity10);
  --swt-color-bg-primary-button-hover: var(--swt-color-accent-normal-opacity40);
  --swt-color-bg-danger-button-hover: var(--swt-color-function-urgent-normal-opacity40);
  --swt-color-bg-urgent-text-button-hover: var(--swt-color-function-urgent-normal-opacity20);
  --swt-color-bg-urgent-text-button-active: var(--swt-color-function-urgent-normal-opacity10);
  --swt-color-bg-brand-round-button-hover: var(--swt-color-brand-normal-opacity40);
  --swt-color-bg-gray-round-button-hover: var(--swt-color-gray11-opacity40);
  --swt-color-bg-mask: var(--swt-color-gray2-opacity70);
}

```
---

## 11. 常见问题速查

| 问题 | 解决方案 |
|------|----------|
| 输入框聚焦边框不显示 | 检查 `outline: none` 和 `border` 样式优先级 |
| 下拉框被遮挡 | 检查父元素 `overflow: hidden` 或 `z-index` |
| 表格对齐问题 | 使用固定列宽或设置 `text-align` |
| 按钮点击无反应 | 检查是否设置 `pointer-events: none` |
| 弹窗滚动穿透 | 给弹窗父容器添加 `overflow: hidden` |
| 图标不显示 | 检查图标字体加载路径 |
| 响应式布局错乱 | 检查栅格断点和 `flex` 布局 |

---

## 12. 参考资源

- SweetUI组件库: 提供150+企业级Vue3组件
- 华为GTS设计系统: 内部设计规范
- WCAG 2.1: 无障碍设计标准
- MDN Web Docs: Web技术文档

---

*文档版本: V1.0*  
*更新时间: 2026年4月*