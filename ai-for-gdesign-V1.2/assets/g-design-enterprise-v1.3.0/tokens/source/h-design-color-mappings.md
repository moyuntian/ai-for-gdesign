# H Design 颜色映射与使用规则

来源为 [色彩.docx](色彩.docx)，完整正文与原图见 [原文规范](h-design-color-spec.md)。CSS 变量保留原图名称，仅添加 `--` 前缀。基础色板与 UI 语义来自原文；深色 UI 兼容值、额外代码 Token 名称与运行时适配明确标注为实现层内容。

## 软件产品和门户场景

软件产品默认组件高亮色为 `brand-50 / #0067D1`；门户官网高亮色为 `gray-90 / #191919`，通过 `--color-portal-highlight` 提供，不把门户颜色强制应用到企业软件组件。公司识别红 `red-60 / #C7000B` 是基础色板中的色值，不能与本 Word 中蓝色的 `color-brand` 混淆。

## UI Token 完整转录

| CSS Token | 原图色阶或表达式 | 浅色执行值 | 使用规则 |
| --- | --- | --- | --- |
| `--color-brand` | `brand-50` | `#0067D1` | 软件产品组件高亮色，默认态 |
| `--color-brand-hover` | `brand-40` | `#2E86DE` | 强调色悬浮态 |
| `--color-brand-focus` | `brand-50` | `#0067D1` | 强调色选中态及焦点态 |
| `--color-brand-active` | `brand-60` | `#004EA8` | 强调色按下态 |
| `--color-brand-disabled` | `brand-20` | `#8ABEF3` | 强调色禁用态 |
| `--color-text-primary` | `gray-90` | `#191919` | 主要文本 |
| `--color-text-secondary` | `gray-50` | `#777777` | 次要文本 |
| `--color-text-placeholder` | `gray-30` | `#AEAEAE` | 占位文本 |
| `--color-text-disabled` | `gray-20` | `#C9C9C9` | 禁用文本 |
| `--color-text-inverse` | `gray-0` | `#FFFFFF` | 反白文本 |
| `--color-icon-primary` | `gray-90` | `#191919` | 主要图标；整体层级与文本匹配 |
| `--color-icon-secondary` | `gray-50` | `#777777` | 次要图标 |
| `--color-icon-tertiary` | `gray-40` | `#939393` | 三级图标 |
| `--color-icon-placeholder` | `gray-30` | `#AEAEAE` | 占位图标 |
| `--color-icon-disabled` | `gray-20` | `#C9C9C9` | 禁用图标 |
| `--color-icon-inverse` | `gray-0` | `#FFFFFF` | 反白图标 |
| `--color-icon-hover` | `brand-40` | `#2E86DE` | 图标悬浮态 |
| `--color-icon-focus` | `brand-50` | `#0067D1` | 图标选中态 |
| `--color-icon-active` | `brand-60` | `#004EA8` | 图标按下态 |
| `--color-border` | `gray-20` | `#C9C9C9` | 默认边框 |
| `--color-border-hover` | `gray-90` | `#191919` | 悬浮边框 |
| `--color-border-focus` | `brand-50` | `#0067D1` | 选中或焦点边框 |
| `--color-border-disabled` | `gray-20` | `#C9C9C9` | 禁用边框 |
| `--color-border-separator` | `gray-10` | `#DFDFDF` | 分割线 |
| `--color-border-separator-subtle` | `gray-05` | `#F3F3F3` | 浅版分割线 |
| `--color-bg-1` | `gray-05` | `#F3F3F3` | 页面背景 |
| `--color-bg-2` | `gray-0` | `#FFFFFF` | 侧边导航或侧滑面板 |
| `--color-bg-3` | `gray-0` | `#FFFFFF` | 侧滑面板 |
| `--color-bg-4` | `gray-0` | `#FFFFFF` | 下拉面板及弹窗 |
| `--color-bg-5` | `gray-0` | `#FFFFFF` | 白色卡片 |
| `--color-bg-6` | `rgba(201, 201, 201, 0.20)` | `rgba(201, 201, 201, 0.20)` | 带背景色卡片；按图中的 gray-20 20% 解释，旁注 #FFFFFF 冲突另存 |
| `--color-bg-mask` | `rgba(25, 25, 25, 0.30)` | `rgba(25, 25, 25, 0.30)` | 遮罩：gray-90 30% |
| `--color-hover` | `rgba(25, 25, 25, 0.05)` | `rgba(25, 25, 25, 0.05)` | 通用悬浮态；gray-90 5% |
| `--color-table-header` | `rgba(25, 25, 25, 0.05)` | `rgba(25, 25, 25, 0.05)` | 表头背景；gray-90 5% |
| `--color-fill` | `rgba(25, 25, 25, 0.05)` | `rgba(25, 25, 25, 0.05)` | 步骤条未开始、单选块未选、图片与文件上传默认填充；gray-90 5% |
| `--color-fill-disabled-subtle` | `rgba(25, 25, 25, 0.05)` | `rgba(25, 25, 25, 0.05)` | 含描边的标准按钮、输入框、搜索框、选择器禁用填充；gray-90 5% |
| `--color-table-zebra` | `rgba(147, 147, 147, 0.05)` | `rgba(147, 147, 147, 0.05)` | 表格斑马纹背景；gray-40 5% |
| `--color-select` | `brand-05` | `#E6F2FD` | 通用选中填充 |
| `--color-fill-subtle` | `gray-0` | `#FFFFFF` | 输入框等浅色模式有背景、深色模式无背景的填充 |
| `--color-fill-disabled` | `gray-10` | `#DFDFDF` | 不含描边的单选块、页签、滚动条及默认标签禁用填充 |
| `--color-error` | `red-50` | `#E02128` | 高关注度：错误 |
| `--color-alert` | `orange-50` | `#F4840C` | 高关注度：告警，搭配文字 |
| `--color-warning` | `yellow-50` | `#FCC800` | 高关注度：提醒，搭配文字 |
| `--color-success` | `mint-50` | `#09AA71` | 中关注度：成功 |
| `--color-info` | `blue-50` | `#2070F3` | 中关注度：信息 |
| `--color-none` | `gray-30` | `#AEAEAE` | 中关注度：失效 |
| `--color-error-subtle` | `red-05` | `#FEE7E8` | 低关注度：错误弱背景 |
| `--color-alert-subtle` | `orange-05` | `#FEF5E8` | 低关注度：告警弱背景 |
| `--color-warning-subtle` | `yellow-05` | `#FEFCE0` | 低关注度：提醒弱背景 |
| `--color-success-subtle` | `mint-05` | `#E7FBF2` | 低关注度：成功弱背景 |
| `--color-info-subtle` | `brand-05` | `#E6F2FD` | 低关注度：信息弱背景；原图指定 brand-05 |
| `--color-none-subtle` | `gray-05` | `#F3F3F3` | 低关注度：失效弱背景 |

图标颜色与文本层级相匹配。边框与分割线用于划分信息区域。功能色同时表达紧迫性与关注级别：错误、告警、提醒属于高关注度；成功、信息、失效属于中关注度；带 `-subtle` 的颜色用于弱背景。告警与提醒必须搭配文字说明。

## 公司基础色板

保留 Word 的全部 132 个色板条目：12 个彩色色相各 10 级，以及灰阶 12 项。基础色板固定，不随主题切换；主题变化发生在语义 Token 层。

| 原始名称 | CSS Token | 色值 |
| --- | --- | --- |
| `rose-05` | `--rose-05` | `#FEE5F2` |
| `rose-10` | `--rose-10` | `#FCC3E0` |
| `rose-20` | `--rose-20` | `#F99AC7` |
| `rose-30` | `--rose-30` | `#F470AB` |
| `rose-40` | `--rose-40` | `#ED448A` |
| `rose-50` | `--rose-50` | `#E61866` |
| `rose-60` | `--rose-60` | `#C40054` |
| `rose-70` | `--rose-70` | `#811439` |
| `rose-80` | `--rose-80` | `#540D24` |
| `rose-90` | `--rose-90` | `#330614` |
| `red-05` | `--red-05` | `#FEE7E8` |
| `red-10` | `--red-10` | `#FABDC1` |
| `red-20` | `--red-20` | `#F59297` |
| `red-30` | `--red-30` | `#EE696F` |
| `red-40` | `--red-40` | `#E7434A` |
| `red-50` | `--red-50` | `#E02128` |
| `red-60` | `--red-60` | `#C7000B` |
| `red-70` | `--red-70` | `#850F12` |
| `red-80` | `--red-80` | `#59080A` |
| `red-90` | `--red-90` | `#350305` |
| `orange-05` | `--orange-05` | `#FEF5E8` |
| `orange-10` | `--orange-10` | `#FDE2BD` |
| `orange-20` | `--orange-20` | `#FCCE92` |
| `orange-30` | `--orange-30` | `#F9B766` |
| `orange-40` | `--orange-40` | `#F69E39` |
| `orange-50` | `--orange-50` | `#F4840C` |
| `orange-60` | `--orange-60` | `#C76207` |
| `orange-70` | `--orange-70` | `#954304` |
| `orange-80` | `--orange-80` | `#642802` |
| `orange-90` | `--orange-90` | `#3D1601` |
| `yellow-05` | `--yellow-05` | `#FEFCE0` |
| `yellow-10` | `--yellow-10` | `#FEF8B8` |
| `yellow-20` | `--yellow-20` | `#FEF08A` |
| `yellow-30` | `--yellow-30` | `#FDE55C` |
| `yellow-40` | `--yellow-40` | `#FCD72E` |
| `yellow-50` | `--yellow-50` | `#FCC800` |
| `yellow-60` | `--yellow-60` | `#D19F00` |
| `yellow-70` | `--yellow-70` | `#9E7400` |
| `yellow-80` | `--yellow-80` | `#614500` |
| `yellow-90` | `--yellow-90` | `#2E1F00` |
| `green-05` | `--green-05` | `#F2FBE9` |
| `green-10` | `--green-10` | `#DFF4CC` |
| `green-20` | `--green-20` | `#C6E9A8` |
| `green-30` | `--green-30` | `#A8DB81` |
| `green-40` | `--green-40` | `#87C859` |
| `green-50` | `--green-50` | `#62B42E` |
| `green-60` | `--green-60` | `#488E20` |
| `green-70` | `--green-70` | `#316614` |
| `green-80` | `--green-80` | `#1B3E0A` |
| `green-90` | `--green-90` | `#0C2004` |
| `mint-05` | `--mint-05` | `#E7FBF2` |
| `mint-10` | `--mint-10` | `#BCF2DB` |
| `mint-20` | `--mint-20` | `#8FE5C2` |
| `mint-30` | `--mint-30` | `#63D5A8` |
| `mint-40` | `--mint-40` | `#36C18D` |
| `mint-50` | `--mint-50` | `#09AA71` |
| `mint-60` | `--mint-60` | `#058358` |
| `mint-70` | `--mint-70` | `#036142` |
| `mint-80` | `--mint-80` | `#02422E` |
| `mint-90` | `--mint-90` | `#00291D` |
| `cyan-05` | `--cyan-05` | `#E8FCFD` |
| `cyan-10` | `--cyan-10` | `#C9F6F9` |
| `cyan-20` | `--cyan-20` | `#A4ECF1` |
| `cyan-30` | `--cyan-30` | `#7DDFE7` |
| `cyan-40` | `--cyan-40` | `#55CCD9` |
| `cyan-50` | `--cyan-50` | `#2CB8C9` |
| `cyan-60` | `--cyan-60` | `#1C94A4` |
| `cyan-70` | `--cyan-70` | `#127180` |
| `cyan-80` | `--cyan-80` | `#094C57` |
| `cyan-90` | `--cyan-90` | `#04282F` |
| `blue-05` | `--blue-05` | `#EEF3FE` |
| `blue-10` | `--blue-10` | `#D0D8FD` |
| `blue-20` | `--blue-20` | `#B0BFFD` |
| `blue-30` | `--blue-30` | `#8CA3FA` |
| `blue-40` | `--blue-40` | `#668CF7` |
| `blue-50` | `--blue-50` | `#2070F3` |
| `blue-60` | `--blue-60` | `#1F55B5` |
| `blue-70` | `--blue-70` | `#1B3F86` |
| `blue-80` | `--blue-80` | `#112857` |
| `blue-90` | `--blue-90` | `#081635` |
| `indigo-05` | `--indigo-05` | `#EEEEFE` |
| `indigo-10` | `--indigo-10` | `#D5D3FD` |
| `indigo-20` | `--indigo-20` | `#BFB9FA` |
| `indigo-30` | `--indigo-30` | `#A89FF9` |
| `indigo-40` | `--indigo-40` | `#8E81F4` |
| `indigo-50` | `--indigo-50` | `#715AFB` |
| `indigo-60` | `--indigo-60` | `#5531EB` |
| `indigo-70` | `--indigo-70` | `#3F21B5` |
| `indigo-80` | `--indigo-80` | `#281675` |
| `indigo-90` | `--indigo-90` | `#160B48` |
| `purple-05` | `--purple-05` | `#F7EDFE` |
| `purple-10` | `--purple-10` | `#E8CFFE` |
| `purple-20` | `--purple-20` | `#D9B1FD` |
| `purple-30` | `--purple-30` | `#CB8EFB` |
| `purple-40` | `--purple-40` | `#BF68FA` |
| `purple-50` | `--purple-50` | `#B62BF7` |
| `purple-60` | `--purple-60` | `#8A21BC` |
| `purple-70` | `--purple-70` | `#651B8B` |
| `purple-80` | `--purple-80` | `#41125A` |
| `purple-90` | `--purple-90` | `#260937` |
| `pink-05` | `--pink-05` | `#FDE6FC` |
| `pink-10` | `--pink-10` | `#F9C5F6` |
| `pink-20` | `--pink-20` | `#F39DEC` |
| `pink-30` | `--pink-30` | `#EB74DF` |
| `pink-40` | `--pink-40` | `#E049CE` |
| `pink-50` | `--pink-50` | `#D41DBC` |
| `pink-60` | `--pink-60` | `#9F1C8D` |
| `pink-70` | `--pink-70` | `#751868` |
| `pink-80` | `--pink-80` | `#4C0F43` |
| `pink-90` | `--pink-90` | `#2E0728` |
| `brand-05` | `--brand-05` | `#E6F2FD` |
| `brand-10` | `--brand-10` | `#B8D9F9` |
| `brand-20` | `--brand-20` | `#8ABEF3` |
| `brand-30` | `--brand-30` | `#5CA2E9` |
| `brand-40` | `--brand-40` | `#2E86DE` |
| `brand-50` | `--brand-50` | `#0067D1` |
| `brand-60` | `--brand-60` | `#004EA8` |
| `brand-70` | `--brand-70` | `#003D83` |
| `brand-80` | `--brand-80` | `#002E6A` |
| `brand-90` | `--brand-90` | `#00214B` |
| `gray-0White` | `--gray-0White` | `#FFFFFF` |
| `gray-05` | `--gray-05` | `#F3F3F3` |
| `gray-10` | `--gray-10` | `#DFDFDF` |
| `gray-20` | `--gray-20` | `#C9C9C9` |
| `gray-30` | `--gray-30` | `#AEAEAE` |
| `gray-40` | `--gray-40` | `#939393` |
| `gray-50` | `--gray-50` | `#777777` |
| `gray-60` | `--gray-60` | `#595959` |
| `gray-70` | `--gray-70` | `#393939` |
| `gray-80` | `--gray-80` | `#2A2A2A` |
| `gray-90` | `--gray-90` | `#191919` |
| `gray-100Black` | `--gray-100Black` | `#000000` |

`gray-0White`、`gray-100Black` 保留正文大小写；图示的 `gray-0` 通过 `--gray-0` 别名提供。

## 公司辅助色

辅助色图和数字场景色板分别保留。第二排为彩色系公司辅助色，第三排为色相延展色，原图限定第三优先级使用。下列变量名是为保留原图色值新增的实现名称。

| 名称 | 色值 |
| --- | --- |
| `--color-corporate-black` | `#000000` |
| `--color-corporate-dark-gray` | `#393939` |
| `--color-corporate-gray` | `#777777` |
| `--color-corporate-light-gray` | `#C9C9C9` |
| `--color-corporate-white` | `#FFFFFF` |
| `--color-corporate-rose` | `#E61866` |
| `--color-corporate-orange` | `#F36900` |
| `--color-corporate-yellow` | `#FDC000` |
| `--color-corporate-green` | `#4FA700` |
| `--color-corporate-cyan` | `#54BCCE` |
| `--color-corporate-pink` | `#D41DBC` |
| `--color-corporate-purple` | `#B62BF7` |
| `--color-corporate-indigo` | `#5531EB` |
| `--color-corporate-blue` | `#2070F3` |
| `--color-corporate-mint` | `#00A874` |

## 图表颜色及取色规则

| 序号 | 默认方案 | 无障碍方案 |
| --- | --- | --- |
| `--color-chart-1` | `blue-50` / `#2070F3` | `blue-60` / `#1F55B5` |
| `--color-chart-2` | `green-50` / `#62B42E` | `green-60` / `#488E20` |
| `--color-chart-3` | `indigo-50` / `#715AFB` | `indigo-60` / `#5531EB` |
| `--color-chart-4` | `cyan-50` / `#2CB8C9` | `cyan-60` / `#1C94A4` |
| `--color-chart-5` | `orange-40` / `#F69E39` | `orange-60` / `#C76207` |
| `--color-chart-6` | `brand-30` / `#5CA2E9` | `brand-40` / `#2E86DE` |

默认优先使用六色，并按顺序使用。环形图或堆叠柱状图颜色超过六个时，可按业务场景用 `--color-chart-tail: var(--blue-70)` 替换最后一色。

无障碍方案通过 `data-chart-palette="accessible"` 切换 `--color-chart-1` 至 `--color-chart-6`；固定别名为 `--color-chart-accessible-1` 至 `--color-chart-accessible-6`。这是方案切换，不是暗色主题。使用原文无障碍方案名称不代表已经对任意实际组合完成对比度认证；原文阈值表述保持在来源文档中。

三套延展方案按原图顺序保存，可用 `data-chart-palette="extension-1"`、`extension-2`、`extension-3` 调用。每套仅四种，5、6 号清空，避免混入另一套方案。

1. `mint-50` → `indigo-40` → `cyan-50` → `purple-40`

2. `indigo-50` → `yellow-40` → `blue-50` → `green-40`

3. `purple-50` → `green-40` → `cyan-50` → `orange-40`

同类色使用同一色相 10 至 70 级。下表按原图右侧图例从左到右记录使用顺序；色相可按业务替换。

| 数量 | 色阶顺序 |
| --- | --- |
| 1 | 40 |
| 2 | 40 → 20 |
| 3 | 60 → 40 → 20 |
| 4 | 60 → 50 → 40 → 20 |
| 5 | 60 → 50 → 40 → 30 → 20 |
| 6 | 60 → 50 → 40 → 30 → 20 → 10 |
| 7 | 70 → 60 → 50 → 40 → 30 → 20 → 10 |

单色渐变取同色相的 30、50 级。双色渐变取邻近色的 50 级；原图展示 blue / purple / red 的邻近关系。ToB 场景以数据精准为核心，不建议使用渐变；ToC 可按业务逻辑表达走势或告警区间，不应只作为装饰。

## StarCode 代码颜色

下表将图20的明细映射转成可检索数据；新增 `--color-code-*` 名称仅是 CSS 实现接口，不声称原图已有这些变量名。明暗 HEX 均保留，不强行套用同名公司色阶。全部原始示例、表格中的选色理由和图18不同方案保存在原图中。

| 功能大类 / 子类 | Highlight.js | IDE 示例设置项 | 频率 | 浅色 | 深色 | CSS Token |
| --- | --- | --- | --- | --- | --- | --- |
| 基础与容器 / 代码块基础 | `.hljs` | background | 高 | `#FAFAFA` | `#131416` | `--color-code-background` |
| 基础与容器 / 默认文本 | `foreground` | foreground | 高 | `#393939` | `#DFDFDF` | `--color-code-foreground` |
| 注释内容 / 普通注释 | `.hljs-comment` | Comment | 高 | `#939393` | `#777777` | `--color-code-comment` |
| 注释内容 / 引用/指导 | `.hljs-quote` | / | 低 | `#939393` | `#777777` | `--color-code-quote` |
| 注释内容 / 项目符号 | `.hljs-bullet` | / | 低 | `#939393` | `#777777` | `--color-code-bullet` |
| 注释内容 / 文档注释界定符 | `.hljs-javadoc` | / | 低 | `#939393` | `#777777` | `--color-code-javadoc` |
| 注释内容 / 文档标签 | `.hljs-doctag` | / | 低 | `#939393` | `#777777` | `--color-code-doctag` |
| 注释内容 / 链接 | `.hljs-link` | / | 低 | `#2E86DE` | `#2E86DE` | `--color-code-link` |
| 程序结构 / 关键字 | `.hljs-keyword` | Keyword; New class 中的 new | 高 | `#C98208` | `#F8CD75` | `--color-code-keyword` |
| 程序结构 / 标点符号 | `.hljs-punctuation` | Braces; Brackets; Comma; Dot sign; Semicolon; Parenthesis; Arrow function | 高 | `#393939` | `#DFDFDF` | `--color-code-punctuation` |
| 程序结构 / 操作符 | `.hljs-operator` | Operator | 高 | `#393939` | `#DFDFDF` | `--color-code-operator` |
| 程序结构 / 章节/区块 | `.hljs-section` | / | 低 | `#939393` | `#777777` | `--color-code-section` |
| 修饰器与元指令 / 修饰器 | `.hljs-meta` | Decorator | 高 | `#C76207` | `#C76207` | `--color-code-meta` |
| 类型系统 / 类型注解 | `.hljs-type` | Interface; Class; Enum; Type parameter（泛型） | 高 | `#5531EB` | `#A89FF9` | `--color-code-type` |
| 类型系统 / 类/结构体名 | `.hljs-title` | Inherited class; Implemented interface; Component name | 高 | `#058358` | `#36C18D` | `--color-code-title` |
| 类型系统 / 类/结构体名 | `.hljs-class` | Module name; Struct; Type alias; Type parameter | 高 | `#0067D1` | `#5CA2E9` | `--color-code-class` |
| 函数与调用 / 函数名 | `.hljs-name` | Function/Method call | 高 | `#0067D1` | `#5CA2E9` | `--color-code-name` |
| 函数与调用 / 函数定义 | `.hljs-function` | Function/Method declaration | 高 | `#0067D1` | `#5CA2E9` | `--color-code-function` |
| 函数与调用 / 函数参数 | `.hljs-params` | Parameter | 高 | `#393939` | `#DFDFDF` | `--color-code-params` |
| 函数与调用 / 内置函数 | `.hljs-built_in` | Primitive types | 中 | `#127180` | `#55CCD9` | `--color-code-built-in` |
| 属性和变量 / 属性名 | `.hljs-attr` | Object key | 高 | `#5531EB` | `#A89FF9` | `--color-code-attr` |
| 属性和变量 / 属性值 | `.hljs-value` | Injected language fragment | 中 | `#D41DBC` | `#EB74DF` | `--color-code-value` |
| 属性和变量 / 对象属性访问 | `.hljs-property` | Field; Static field | 高 | `#0067D1` | `#5CA2E9` | `--color-code-property` |
| 属性和变量 / 变量 | `.hljs-variable` | Local variable; Label; Variable | 高 | `#393939` | `#DFDFDF` | `--color-code-variable` |
| 数据与字面量 / 字符串 | `.hljs-string` | String | 高 | `#393939` | `#DFDFDF` | `--color-code-string` |
| 数据与字面量 / 字面量 | `.hljs-literal` | Enum constant; Hexadecimal number; Number | 高 | `#393939` | `#DFDFDF` | `--color-code-literal` |
| 数据与字面量 / 数值 | `.hljs-number` | Enum constant; Hexadecimal number; Number | 高 | `#393939` | `#DFDFDF` | `--color-code-number` |
| 数据与字面量 / 正则表达式 | `.hljs-regexp` | Regular expression | 低 | `#393939` | `#DFDFDF` | `--color-code-regexp` |
| 数据与字面量 / 布尔值 | `.hljs-boolean` | Keyword | 高 | `#C98208` | `#F8CD75` | `--color-code-boolean` |
| 数据与字面量 / 符号 | `.hljs-symbol` | / | 低 | `#393939` | `#DFDFDF` | `--color-code-symbol` |
| 数据与字面量 / 模板字符串变量 | `.hljs-template-variable` | / | 中 | `#393939` | `#DFDFDF` | `--color-code-template-variable` |
| 数据与字面量 / 模板字符串变量 | `.hljs-subst` | / | 中 | `#393939` | `#DFDFDF` | `--color-code-subst` |
| 标记与标签 / 组件标签 | `.hljs-tag` | / | 中 | `#393939` | `#DFDFDF` | `--color-code-tag` |
| 其他 / 选择器 | `.hljs-selector-tag` | / | 极低 | `#393939` | `#DFDFDF` | `--color-code-selector-tag` |
| 其他 / 选择器 | `.hljs-selector-class` | / | 极低 | `#393939` | `#DFDFDF` | `--color-code-selector-class` |
| 其他 / 选择器 | `.hljs-selector-id` | / | 极低 | `#393939` | `#DFDFDF` | `--color-code-selector-id` |
| 其他 / 警示 | `.hljs-error` | Bad Character | 高 | `#E02128` | `#EE696F` | `--color-code-error` |

使用顺序：确定功能大类及子类 → 按 Web 或 IDE 定位语法项 → 选择浅色或深色色值 → 核对用途和选色理由。IDE 名称基于 DevEco，实际产品可能不同。高亮语法类型比例不建议超过 80%，色相数量不建议超过 10。

可在代码块外包裹 `.h-design-code`，`code.css` 会把相应 `.hljs-*` 类绑定到 Token。它只负责颜色，不安装或执行 Highlight.js。

## 深色主题兼容说明

Word 提供了明确的代码深浅色对照，但没有完整的深色 UI 语义表。`semantic-light.css` 对应原文 UI；`semantic-dark.css` 使用本文基础色板建立项目兼容映射，以保留现有组件的深色能力。该映射不视作来源文档规定，也没有覆盖原文。

| UI Token | 深色兼容值 |
| --- | --- |
| `--color-brand` | `var(--brand-40)` |
| `--color-brand-hover` | `var(--brand-30)` |
| `--color-brand-focus` | `var(--brand-40)` |
| `--color-brand-active` | `var(--brand-50)` |
| `--color-brand-disabled` | `var(--brand-80)` |
| `--color-text-primary` | `var(--gray-05)` |
| `--color-text-secondary` | `var(--gray-30)` |
| `--color-text-placeholder` | `var(--gray-40)` |
| `--color-text-disabled` | `var(--gray-60)` |
| `--color-text-inverse` | `var(--gray-0)` |
| `--color-icon-primary` | `var(--gray-05)` |
| `--color-icon-secondary` | `var(--gray-30)` |
| `--color-icon-tertiary` | `var(--gray-40)` |
| `--color-icon-placeholder` | `var(--gray-40)` |
| `--color-icon-disabled` | `var(--gray-60)` |
| `--color-icon-inverse` | `var(--gray-0)` |
| `--color-icon-hover` | `var(--brand-30)` |
| `--color-icon-focus` | `var(--brand-40)` |
| `--color-icon-active` | `var(--brand-50)` |
| `--color-border` | `var(--gray-60)` |
| `--color-border-hover` | `var(--gray-30)` |
| `--color-border-focus` | `var(--brand-40)` |
| `--color-border-disabled` | `var(--gray-70)` |
| `--color-border-separator` | `var(--gray-70)` |
| `--color-border-separator-subtle` | `var(--gray-80)` |
| `--color-bg-1` | `var(--gray-100)` |
| `--color-bg-2` | `var(--gray-90)` |
| `--color-bg-3` | `var(--gray-90)` |
| `--color-bg-4` | `var(--gray-90)` |
| `--color-bg-5` | `var(--gray-90)` |
| `--color-bg-6` | `rgba(201, 201, 201, 0.20)` |
| `--color-bg-mask` | `rgba(0, 0, 0, 0.70)` |
| `--color-hover` | `rgba(255, 255, 255, 0.05)` |
| `--color-table-header` | `rgba(255, 255, 255, 0.05)` |
| `--color-fill` | `rgba(255, 255, 255, 0.05)` |
| `--color-fill-disabled-subtle` | `rgba(255, 255, 255, 0.05)` |
| `--color-table-zebra` | `rgba(147, 147, 147, 0.05)` |
| `--color-select` | `var(--brand-90)` |
| `--color-fill-subtle` | `transparent` |
| `--color-fill-disabled` | `var(--gray-70)` |
| `--color-error` | `var(--red-50)` |
| `--color-alert` | `var(--orange-50)` |
| `--color-warning` | `var(--yellow-50)` |
| `--color-success` | `var(--mint-50)` |
| `--color-info` | `var(--blue-50)` |
| `--color-none` | `var(--gray-30)` |
| `--color-error-subtle` | `var(--red-90)` |
| `--color-alert-subtle` | `var(--orange-90)` |
| `--color-warning-subtle` | `var(--yellow-90)` |
| `--color-success-subtle` | `var(--mint-90)` |
| `--color-info-subtle` | `var(--brand-90)` |
| `--color-none-subtle` | `var(--gray-80)` |
| `--color-portal-highlight` | `var(--gray-90)` |

## 现有 G Design 组件兼容

现有组件继续使用 `--g-*`，值统一转接到 H Design 语义 Token。布局、字体、间距、尺寸和圆角保持原值。`--g-brand` 和 `--g-accent` 都映射到 Word 的蓝色组件高亮语义；公司红仍可通过 `--red-60` 引用。

| 现有变量 | 新语义变量 |
| --- | --- |
| `--g-brand` | `--color-brand` |
| `--g-accent` | `--color-brand` |
| `--g-success` | `--color-success` |
| `--g-urgent` | `--color-error` |
| `--g-important` | `--color-alert` |
| `--g-warning` | `--color-warning` |
| `--g-bg-page` | `--color-bg-1` |
| `--g-bg-surface` | `--color-bg-5` |
| `--g-bg-hover` | `--color-hover` |
| `--g-text-primary` | `--color-text-primary` |
| `--g-text-secondary` | `--color-text-secondary` |
| `--g-text-disabled` | `--color-text-disabled` |
| `--g-border` | `--color-border` |
| `--g-focus` | `--color-border-focus` |
| `--g-mask` | `--color-bg-mask` |
| `--g-topology-node-normal` | `--color-brand` |
| `--g-topology-node-success` | `--color-success` |
| `--g-topology-node-warning` | `--color-warning` |
| `--g-topology-node-danger` | `--color-error` |

Element Plus 的 primary / success / warning / danger / error / info 分别映射到组件高亮 / 成功 / 提醒 / 错误 / 错误 / 信息。橙色告警单独通过 `--color-alert` 与 `--g-feedback-alert` 提供。组件桥接中非原文明确指定的衍生状态属于实现适配；主按钮默认、悬浮、选中、按下、禁用严格使用原图五态。

## V1.3 Aurora Glass 视觉扩展

参考图中的渐变和磨砂玻璃属于展示型视觉层，不替代 H Design 的基础色板、业务功能色或交互状态色。主强调色仍为 `#0067D1`。

| Token | Light | Dark | 用途 |
| --- | --- | --- | --- |
| `--visual-gradient-hero` | 蓝—淡紫—浅粉渐变 | 深蓝—深紫—深粉渐变 | 仪表盘头图、概览背景 |
| `--glass-surface` | `rgba(255,255,255,.56)` | `rgba(25,25,25,.58)` | 标准玻璃卡片 |
| `--glass-surface-soft` | `rgba(255,255,255,.38)` | `rgba(25,25,25,.42)` | 轻量玻璃面板 |
| `--glass-surface-strong` | `rgba(255,255,255,.72)` | `rgba(25,25,25,.76)` | 导航、高层级面板 |
| `--glass-border` | `rgba(255,255,255,.72)` | `rgba(255,255,255,.22)` | 玻璃高光边框 |
| `--glass-blur` | `20px` | `20px` | 背景模糊 |
| `--glass-saturate` | `120%` | `120%` | 色彩增强 |
| `--glass-shadow` | `0 8px 24px rgba(54,76,130,.12)` | `0 8px 24px rgba(0,0,0,.24)` | 玻璃层级阴影 |

### 使用规则

- 生成原型时必须显式选择 `aurora-glass`，不得默认应用到所有页面。
- 玻璃效果优先用于仪表盘头图、指标卡、顶部导航、概览面板和轻量信息卡。
- 表格、复杂表单、告警列表等高密度区域默认使用实色表面，保持文字、状态和数据的对比度。
- `backdrop-filter` 不可用时回退到高不透明度实色背景。
- 详细可执行样式见 `../glass.css`。

## 原文差异及采用依据

### background-6

```json
{
  "id": "background-6",
  "source": "image8.png",
  "original": [
    "gray-20 20%",
    "#FFFFFF"
  ],
  "applied": "rgba(201, 201, 201, 0.20)",
  "basis": "采用包含色阶和透明度的完整标注；冲突的 HEX 原文保留。"
}
```

### code-table-priority

```json
{
  "id": "code-table-priority",
  "source": [
    "image18.png",
    "image20.png",
    "代码色应用指南正文"
  ],
  "original": "示意图/正文与明细表中 gray-10、浅色函数/类/属性蓝、布尔值等映射不同。",
  "applied": "可执行代码色采用文档要求作为协作依据的语义映射明细表（图20）。图18和正文原样保留。"
}
```

### code-palette-separation

```json
{
  "id": "code-palette-separation",
  "source": [
    "image18.png",
    "image20.png",
    "公司色板"
  ],
  "original": "代码专用黄色 #F8CD75/#C98208、粉色 #EB74DF/#D41DBC 等与公司色板同名刻度值不完全相同。",
  "applied": "代码 Token 保留代码表 HEX，不改写公司基础色板。"
}
```

### auxiliary-palette-separation

```json
{
  "id": "auxiliary-palette-separation",
  "source": [
    "image3.png",
    "公司色板"
  ],
  "original": "公司辅助色图中的 orange/green/cyan/mint 等不等于数字色板的同名 50 级。",
  "applied": "以独立 --color-corporate-* Token 保存原值，避免覆盖数字色板。"
}
```

### dark-ui

```json
{
  "id": "dark-ui",
  "source": "Word 未提供完整深色 UI 语义表",
  "applied": "semantic-dark.css 是基于新色板的项目兼容映射，不作为 Word 原始规范；代码色的深色值则来自图20。"
}
```

### chart-accessible

```json
{
  "id": "chart-accessible",
  "source": [
    "image11.png",
    "image13.png"
  ],
  "original": "默认方案和无障碍方案复用 color-chart-1…6 名称。",
  "applied": "默认保留原名；data-chart-palette=\"accessible\" 切换同名值，并提供 --color-chart-accessible-* 显式别名。"
}
```

### gray-endpoint-names

```json
{
  "id": "gray-endpoint-names",
  "source": [
    "公司色板",
    "image5.png"
  ],
  "original": [
    "gray-0White",
    "gray-100Black",
    "gray-0"
  ],
  "applied": "保留正文名称大小写，另加 --gray-0 和 --gray-100 指向相同端点。"
}
```

## 使用约束

- 业务代码优先引用有使用语义的 `--color-*`；基础色阶用于建立映射或按图表规则配色。
- 自定义主题在 `[data-theme]` 边界覆写语义变量，不改基础色板的身份。
- 导入顺序：Element Plus 基础样式在前，本目录 `index.scss` 在后。
- 原始 Word、原图和逐段正文是来源记录；兼容映射单独说明，不把推导写成原文事实。
- 本次更新只涉及 tokens 目录，已有组件源码中的硬编码颜色不会自动变成 Token 引用。
