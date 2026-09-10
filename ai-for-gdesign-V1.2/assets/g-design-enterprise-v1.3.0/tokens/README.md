# H Design 色彩 Token

本目录以用户提供的《色彩.docx》为颜色来源，保留完整规范并向现有 G Design 组件提供兼容变量。

- [完整规范与原图](source/h-design-color-spec.md)
- [Token 表、颜色值和使用规则](source/h-design-color-mappings.md)
- [机器可读映射](color-tokens.json)
- [原始 Word](source/色彩.docx)
- [保留的非颜色规范](source/g-design-token.md)

## 文件职责

| 文件 | 内容 |
| --- | --- |
| primitive.css | 132 个 Word 基础色板项、灰阶端点别名、公司辅助色，以及原有非颜色基础变量 |
| semantic-light.css | Word UI 原始语义与透明度 |
| semantic-dark.css | 使用新色板的项目深色兼容映射，非 Word 完整深色 UI 原值 |
| component.css、components/*.css | 现有 --g-* 变量和表单、表格、反馈、浮层映射 |
| charts.css | 默认、无障碍和三套延展方案；尾部色 |
| code.css | StarCode 明暗 Token 与可选的 .h-design-code / Highlight.js 颜色绑定 |
| element-plus.scss、element-plus.css | 编译基础色和运行时状态、主题映射 |
| index.scss | 统一导入入口 |

## 使用

先加载 Element Plus 基础样式，再导入本目录 `index.scss`。默认是软件产品浅色主题。

```css
.primary-action { background: var(--color-brand); }
.primary-action:hover { background: var(--color-brand-hover); }
.primary-action:active { background: var(--color-brand-active); }
.primary-action:disabled { background: var(--color-brand-disabled); }
.body-text { color: var(--color-text-primary); }
.selected-row { background: var(--color-select); }
```

```html
<section data-theme="dark">深色兼容主题</section>
<section data-chart-palette="accessible">无障碍图表方案，使用 --color-chart-1 至 6</section>
<div class="h-design-code"><pre><code class="hljs">代码高亮结果</code></pre></div>
```

门户官网另有 `--color-portal-highlight: #191919`；不将门户颜色套用到默认的软件产品组件。

Word 的部分图例存在互相不一致的标注，执行选择和原值均记录在映射文档中。完整 Word 与图片未改动。当前更新入口是 tokens 源文件；如直接消费已有 dist 成品，需要由项目在具备构建依赖时重新打包。
