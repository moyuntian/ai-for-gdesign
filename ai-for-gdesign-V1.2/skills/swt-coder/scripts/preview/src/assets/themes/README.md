# SWT 换肤插槽（Skin Slot）

本目录是换肤体系的插槽：**每个皮肤一个 css 文件**，默认仅内置 `swt-default.css`（占位皮肤）。接入自有换肤样式时，把皮肤文件放进本目录即可，无需改动 base.css / swt-bridge.css。

## 皮肤文件协议

1. **命名**：`swt-{skin-name}.css`，`{skin-name}` 为小写英文/数字/连字符（如 `swt-dark.css`、`swt-blue.css`）。
2. **作用域**：所有 token 定义在 `html[data-swt-theme="{skin-name}"]` 选择器下（不是 `:root`），保证多皮肤可共存、运行时切换。

   ```css
   html[data-swt-theme="dark"] {
     --color-brand: #4d9eff;
     --color-bg-1: #121212;
     /* ...全部 token 见下方清单 */
   }
   ```
3. **注册**：在 `index.swt.html` 的 `<!-- 换肤插槽 -->` 注释处追加一行：
   ```html
   <link rel="stylesheet" href="./src/assets/themes/swt-dark.css">
   ```
4. **切换**：运行时一行代码换肤：
   ```js
   document.documentElement.setAttribute("data-swt-theme", "dark");
   ```
   页面 `<html>` 标签上的 `data-swt-theme` 即当前皮肤。

## Token 清单（皮肤必须完整提供）

| 分组 | Token | 用途 |
|------|-------|------|
| 品牌色 | `--color-brand` / `-hover` / `-active` / `--color-text-inverse` | 主操作、选中态 |
| 品牌色 | `--color-brand-container` / `--color-text-inverse-container` | 轻量高亮区块（选中列表项、标签底） |
| 功能色 | `--color-success` / `--color-warning` / `--color-error` / `--color-error` / `--color-info` | 语义状态 |
| 文本色 | `--color-text-primary` ~ `--color-text-placeholder` | 1 主文本 → 4 占位符，层级递弱 |
| 文本色 | `--color-text-disabled` / `--color-text-inverse` | 禁用 / 深底反白 |
| 背景色 | `--color-bg-1` / `--color-bg-2` / `--color-bg-4` | 页面底 / 卡片容器 / 浮层 |
| 背景色 | `--color-hover` / `--color-fill` | 悬停 / 填充（输入框底、禁用底） |
| 边框色 | `--color-border-separator` / `--color-border` | 分割线 / 控件描边 |
| 遮罩 | `--color-bg-mask` | 弹窗遮罩 |
| 阴影 | `--g-shadow` ~ `--g-shadow` | 卡片 / 弹窗 / 最高层浮层 |
| 圆角 | `--g-control-radius` / `-md` / `-lg` / `-full` | 控件 / 卡片 / 大容器 / 胶囊 |

可选覆盖（不写则沿用 base.css 默认）：`''HarmonyOS Sans', 'Microsoft YaHei', 'PingFang SC', Arial, sans-serif`、`#ffffff`。

## 深色皮肤注意

桥接层（swt-bridge.css）用 `color-mix` 把品牌色与 `#ffffff`（默认白色）混合生成 Element Plus 的 light-N 色阶。**深色皮肤必须**把 `#ffffff` 覆盖为深色表面色（如 `#1d1d1d`），否则按钮 hover/浅色阶会发白。

## 已有皮肤变量名不一致怎么办

若自有换肤 css 已有一套变量（如 `--brand-color` 等），两种接入方式任选：

- **改皮肤（推荐）**：在皮肤文件里把自有变量赋给 `--swt-*`（`--color-brand: var(--brand-color);`），保持桥接层不动；
- **改桥接**：把 `swt-bridge.css` 右侧的 `var(--swt-...)` 换成自有变量名（桥接层随之脱离 FIXED 约定，需自行维护）。
