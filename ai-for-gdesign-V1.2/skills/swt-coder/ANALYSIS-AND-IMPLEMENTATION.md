# SWT-Coder 分析与实施方案

> 版本：1.0.0  
> 日期：2026-09-10  
> 状态：已实施

---

## 一、背景与问题分析

### 1.1 原始痛点

用户拥有多个分散的设计规范和代码生成工具，彼此割裂：

| 来源 | 作用 | 问题 |
|------|------|------|
| gts-autin-coder | AI 生成 Vue3 + EP 页面，有完整 init/build/verify 工具链 | token 用 `--gts-*` 前缀，与设计规范脱节 |
| generate-ux-prototype | 从资产库复制已注册组件并配置 | 不写代码，灵活性低，Python 脚本与 JS 工具链不统一 |
| g-design-enterprise tokens | H Design 色彩.docx 映射，132 基础色板 + 语义层 | 用 `--color-*` 前缀，与 AI 代码生成不衔接 |
| gts-ux-spec.txt | 完整 GTS UX 设计规范（1356行），已用 `--swt-` 前缀 | 太长，无法直接全量加载到上下文 |
| sweetui-frontend-development.md | SweetUI 150+ 组件开发指南（871行） | SweetUI UMD 包未提供，无法实际运行 |
| guifan.txt (GTS统一配色版) | 简单规范说明（68行） | 无 token 值，与 gts-autin-coder SKILL.md 重复 |
| ICT3.1 (ict-coder) | 设计规范最佳实践：Tonal Layering、有阴影无边框等 | 用 Tailwind，与 Vue3+EP+Less 技术栈不同 |

### 1.2 三套 Token 体系冲突分析

| 维度 | gts-ux-spec.txt | g-design-enterprise tokens | gts-autin-coder |
|------|----------------|---------------------------|-----------------|
| 前缀 | `--swt-*` | `--color-*` / `--g-*` | `--gts-*` |
| 主色(蓝) | accent-normal: `#0067D1` | brand: `#0067D1` | primary(值未定义) |
| 品牌色(红) | brand-normal: `#C7000B` | 不存在 | 不存在 |
| 灰度 | gray1-13(13级含别名) | gray-0~90(10级) | text-1~4(4级) |
| 功能色 | 5类×6状态=30个 | 5类(仅normal+subtle) | 5类(仅normal) |
| 辅助色 | 12色系×10级=120个 | 13色系×10级=130个 | 无 |
| 字体/间距/圆角/阴影 | 完整体系(14级字号等) | 无 | 简化速查(4级圆角等) |
| 浅/深色主题 | 完整双主题 | 完整双主题 | 仅dark.less覆盖 |

**核心冲突：**
- g-design-enterprise 的 `brand`(#0067D1) = gts-ux-spec 的 `accent`(#0067D1)，但 gts-ux-spec 还有独立的 `brand`(#C7000B红色)
- 三套前缀 `--swt-*` / `--color-*` / `--gts-*` 互不兼容
- 粒度差异大：gts-ux-spec 最细（每色6状态），gts-autin-coder 最粗

### 1.3 gts-autin-coder vs generate-ux-prototype 定位冲突

| 维度 | gts-autin-coder | generate-ux-prototype |
|------|-----------------|----------------------|
| 核心模式 | AI 自由写 .vue 代码 | 从资产库复制已注册组件 |
| 工具链 | init.mjs/build.mjs/serve.mjs (JS) | resolve_source_assets.py (Python) |
| 代码约束 | `--gts-*` token, EP白名单校验 | 资产锁定，不可手写组件 |
| 交付件 | .vue SFC + 离线预览 | 配置后的资产副本 |
| 灵活性 | 高（AI自由发挥） | 低（只能用已注册组件） |

**用户决策：** 替换 generate-ux-prototype，采用 gts-autin-coder 的"AI 自由写码"能力，同时保留"匹配到已定义组件时直接 CV"的能力。

### 1.4 SweetUI 与 ElementPlus 兼容性发现

SweetUI 支持 `sweet-config-provider namespace="sweet"` 或 `namespace="el"`，与 ElementPlus API 兼容。切换只需改 import 路径和 namespace，大大简化双 UI 库支持。

### 1.5 guifan.txt（GTS统一配色版）价值评估

仅 68 行，无 token 值定义，内容（技术栈说明 + 项目结构 + rem 规范 + 命名规范）与 gts-autin-coder SKILL.md 高度重复。实际价值有限，已合并吸收进 design_system.md。

---

## 二、方案设计

### 2.1 命名决策

**新名称：`swt-coder`**

- `swt` = SWT Design Token，与 `--swt-` 前缀一致
- `coder` 明确表达"生成代码"的能力
- 比 `gts-autin-coder` 更直观（"autin"含义不明）
- 简短，适合作为独立 skill 包名

### 2.2 目录结构

```
ai-for-gdesign-V1.2/
├── skills/
│   ├── swt-coder/                        # ★ 新建（替换 generate-ux-prototype）
│   │   ├── SKILL.md                      # 主入口（~220行）
│   │   ├── standalone-prompt.md          # 独立发布用 prompt
│   │   ├── references/
│   │   │   ├── design_system.md          # Token全表+布局规范+ICT最佳实践（~140行）
│   │   │   ├── element-plus-guide.md     # EP 2.13.5 开发要点
│   │   │   ├── sweetui-guide.md          # SweetUI 差异指南（预留，待UMD）
│   │   │   ├── component-catalog.md      # 已定义组件目录索引
│   │   │   ├── gts-ux-spec.md            # 完整 token 参考（原 gts-ux-spec.txt）
│   │   │   └── sweetui-frontend-development.md  # 完整 SweetUI 指南
│   │   ├── tokens/                       # 从 g-design-enterprise 迁移
│   │   │   ├── primitive.css             # 132 基础色板（色值来源）
│   │   │   ├── semantic-light.css        # 浅色语义 + --swt-* 三层别名
│   │   │   ├── semantic-dark.css         # 深色语义 + --swt-* 三层别名
│   │   │   ├── component.css             # 组件级 token
│   │   │   ├── charts.css                # 图表 token
│   │   │   ├── code.css                  # 代码高亮 token
│   │   │   ├── element-plus.css          # EP 桥接
│   │   │   ├── sweetui.css               # SweetUI 桥接（占位）
│   │   │   ├── index.scss                # 统一导入
│   │   │   ├── color-tokens.json         # 机器可读映射
│   │   │   └── components/ source/       # 子目录
│   │   ├── scripts/
│   │   │   ├── init.mjs                  # 初始化工作区（+--ui-library + --with-components）
│   │   │   ├── build.mjs                 # 构建校验（+UI库切换 + --swt-* 校验）
│   │   │   ├── serve.mjs                 # 预览服务
│   │   │   ├── build-data.mjs            # 源码映射生成
│   │   │   ├── preview/                  # 预览模板（index.swt.html + UMD + scaffold）
│   │   │   └── verify/
│   │   │       ├── compiler/             # @vue/compiler-sfc, less, postcss
│   │   │       └── whitelists/
│   │   │           ├── element-plus-components.json   # 121 个组件
│   │   │           ├── element-plus-exports.json      # EP 导出
│   │   │           ├── element-plus-icons.json        # 293 个图标
│   │   │           ├── sweetui-components.json        # 占位 []
│   │   │           └── sweetui-exports.json           # 占位 []
│   │   ├── components/                   # 从 g-design-enterprise 迁移（默认开）
│   │   │   ├── basic/                    # 48 个基础组件（GButton, GTable 等）
│   │   │   ├── business/                 # 13 个业务组件（GFilterBar, GMetricCard 等）
│   │   │   └── complex/                  # 5 个复杂组件（GTopology, GDashboardGrid 等）
│   │   └── installer/
│   │       └── install.sh                # 独立安装脚本
│   ├── extract-structured-requirements/  # 保留不动
│   ├── derive-experience-insights/       # 保留不动
│   ├── manage-design-assets/             # 保留不动
│   └── generate-ux-prototype.deprecated/ # 旧目录已重命名
├── installer/
│   ├── install-skills.ps1                # 已更新：引用 swt-coder
│   └── install-skills.sh                 # 已更新：引用 swt-coder
├── assets/g-design-enterprise-v1.3.0/    # 保留（tokens 已复制到 swt-coder，src/components 已复制）
├── skill-catalog.json                    # 已更新 v1.2.0
├── asset-manifest.yaml
├── README.md
└── standalone-prompt.md
```

### 2.3 Token 三层合并方案

**策略：g-design-enterprise 提供色值 + gts-ux-spec 提供命名规范 = 合并为 `--swt-*` 体系**

在 `semantic-light.css` 和 `semantic-dark.css` 中构建三层结构：

#### Layer 1：g-design-enterprise 原始色值（保留不动）

```css
--color-brand: var(--brand-50);        /* #0067D1 */
--color-error: var(--red-50);          /* #E02128 */
--color-success: var(--mint-50);      /* #09AA71 */
--color-text-primary: var(--gray-90);
/* ... g-design-enterprise 原始 token 继续 ... */
```

#### Layer 2：`--swt-*` 完整 token（gts-ux-spec 命名 + g-design-enterprise 色值）

```css
--swt-color-accent-normal: var(--color-brand);           /* #0067D1 */
--swt-color-brand-normal: #C7000B;                       /* gts-ux-spec 红色品牌色 */
--swt-color-function-urgent-normal: var(--color-error);  /* #E02128 */
--swt-color-function-success-normal: var(--color-success);
--swt-color-text-primary: var(--color-text-primary);
--swt-color-bg-primary: var(--color-bg-2);
--swt-space-size-4: 4px;
--swt-radius-size-normal: 4px;
--swt-shadow1: var(--g-shadow);
/* ... 完整 token ... */
```

#### Layer 3：简化别名（AI 高频使用，向后兼容 gts-autin-coder）

```css
--swt-color-primary: var(--swt-color-accent-normal);
--swt-color-success: var(--swt-color-function-success-normal);
--swt-color-danger: var(--swt-color-function-urgent-normal);
--swt-text-1: var(--swt-color-text-primary);
--swt-bg-page: var(--swt-color-bg-secondary);
--swt-border-1: var(--swt-color-dividing-line-primary);
--swt-radius-sm: var(--swt-radius-size-small);
/* ... 简化别名 ... */
```

深色主题 `semantic-dark.css` 同样三层结构，色值切换为深色模式值。

### 2.4 双 UI 库支持架构

利用 SweetUI 的 namespace 兼容机制：

| 维度 | Element Plus (默认) | SweetUI (预留) |
|------|-------------------|----------------|
| import | `from 'element-plus'` | `from '@hw-seq/sweet-ui-base'` |
| 组件前缀 | `el-*` | `sweet-*` |
| 消息提示 | `ElMessage` | `SweetMessageBox` |
| UMD | `public/library/element-plus.full.min.js` | 待提供 |
| 白名单 | element-plus-components.json (121个) | sweetui-components.json (占位 []) |

init.mjs 参数：
```bash
node scripts/init.mjs "<folder>" "<slug>" --ui-library=element-plus   # 默认
node scripts/init.mjs "<folder>" "<slug>" --ui-library=sweetui         # 预留
```

build.mjs 根据参数切换白名单和组件前缀校验逻辑。

### 2.5 组件库开关机制

```bash
--with-components     # 引入 g-design-enterprise 组件库（默认）
--without-components  # 不引入，纯 AI 生成
```

**组件匹配策略（需求 8）：**
1. AI 生成页面时，检查 `references/component-catalog.md` 是否有匹配的已定义组件
2. 匹配 → 直接 import 组件 .vue 文件（CV），节省时间，不重复造轮子
3. 未匹配 → AI 自由编写 ElementPlus/SweetUI 代码
4. 混合模式：已定义组件用 CV，自定义部分用 AI 生成

**后续扩展预留：**
组件源后续可从本地目录切换为云端 URL（预留 `CONFIG.componentsSource` 参数）。

### 2.6 上下文优化策略

参考 ICT3.1 的分层加载策略：

| 层级 | 内容 | 行数 | 加载时机 |
|------|------|------|---------|
| SKILL.md | 核心工作流 + Token 速查表 + 代码规范 | ~220行 | 始终加载 |
| design_system.md | Token 全表 + 布局规范 + 换肤协议 + ICT 最佳实践 | ~140行 | 按需（换肤/深色/token咨询） |
| element-plus-guide.md | EP 组件要点 + 高频错误预防 | ~60行 | 按需（组件API不确定时） |
| sweetui-guide.md | SweetUI 差异点 | ~50行 | 仅切 SweetUI 时 |
| component-catalog.md | 组件目录索引 | ~40行 | 仅 --with-components 时 |
| gts-ux-spec.md | 完整 token 参考（1356行） | 1356行 | 仅深度 token 查询时（不默认加载） |
| sweetui-frontend-development.md | 完整 SweetUI 指南（871行） | 871行 | 仅 SweetUI 模式 + 深度查询时 |

**默认上下文占用：仅 SKILL.md (~220行) ≈ 3-4K tokens**

### 2.7 ICT 最佳实践吸收

以下来自 ict-coder 的设计规范要点已写入 design_system.md：

- **Tonal Layering（色调分层）：**
  - Level 0（底色）：`--swt-bg-page`，无阴影
  - Level 1（容器）：`--swt-bg-container` + `--swt-shadow-1`，主要内容容器
  - Level 2（内部）：`--swt-bg-hover` 或变体色，容器内部分区
- **有阴影无边框（Mutual Exclusion）：** 浮起容器不加结构性 border
- **无左侧色条（No Accent Strips）：** 用 `--swt-color-function-*-background` 浅色底替代
- **语义状态配对：** `*-background` 底色 + 对应 `*-text-normal` 文字色

---

## 三、实施记录

### 3.1 执行清单

#### 批次 1+2：核心重构（已完成）

| # | 步骤 | 状态 | 说明 |
|---|------|------|------|
| 0 | 创建 swt-coder 目录结构 | ✅ | references/tokens/scripts/components/installer |
| 1 | 复制 tokens | ✅ | 从 g-design-enterprise 全套复制 |
| 2 | 添加 --swt-* 别名层 | ✅ | semantic-light.css + semantic-dark.css 三层结构 |
| 3 | 复制 scripts | ✅ | init.mjs/build.mjs/serve.mjs/build-data.mjs |
| 4 | 复制 verify/compiler + whitelists | ✅ | 含 @vue/compiler-sfc, less, postcss |
| 5 | 适配 scripts | ✅ | --gts-* → --swt-*, +--ui-library, +--with-components |
| 6 | 复制 components | ✅ | basic(48) + business(13) + complex(5) |
| 7 | 编写 SKILL.md | ✅ | ~220行，含 token 速查、组件匹配策略 |
| 8 | 编写 design_system.md | ✅ | ~140行，含 ICT 最佳实践 |
| 9 | 编写 element-plus-guide.md | ✅ | ~60行 |
| 10 | 编写 sweetui-guide.md | ✅ | ~50行，占位 |
| 11 | 编写 component-catalog.md | ✅ | 组件目录索引 |
| 12 | 复制 gts-ux-spec.md | ✅ | 原 gts-ux-spec.txt → references/ |
| 13 | 复制 sweetui-frontend-development.md | ✅ | → references/ |
| 14 | 编写 standalone-prompt.md | ✅ | 独立发布用 |
| 15 | 编写 installer/install.sh | ✅ | 独立安装脚本 |
| 16 | 创建 SweetUI 占位文件 | ✅ | sweetui.css, sweetui-components.json[], sweetui-exports.json[] |
| 17 | 更新 skill-catalog.json | ✅ | v1.2.0, generate-ux-prototype → swt-coder |
| 18 | 重命名旧目录 | ✅ | generate-ux-prototype → .deprecated |
| 19 | 修复 installer 脚本 | ✅ | install-skills.ps1 + install-skills.sh 中旧名引用 |

#### 批次 3+4：扩展与优化（已完成）

| # | 步骤 | 状态 | 说明 |
|---|------|------|------|
| 20 | SweetUI 切换逻辑 | ✅ | init.mjs/build.mjs 中 --ui-library 参数 |
| 21 | 组件库开关 | ✅ | --with-components/--without-components（默认开） |
| 22 | 上下文优化 | ✅ | 分层加载策略，SKILL.md ~220行默认加载 |
| 23 | 独立发布能力 | ✅ | standalone-prompt.md + install.sh |

### 3.2 验证结果

```
# init.mjs 验证
$ node scripts/init.mjs "<test-dir>" "test-page"
RESULT: OK
HTML_PATH: .../test-page/index.swt.html
SRC_DIR: .../test-page/src
PAGE: TestPage
UI_LIBRARY: element-plus
COMPONENTS: enabled

# build.mjs 验证
$ node scripts/build.mjs --dir "<test-dir>/test-page"
RESULT: OK
OK index.swt.html verified (1 page, 1 components, 5 el-tag uses, ui=element-plus)
```

### 3.3 关键改动对照

#### SKILL.md（旧 → 新）

| 改动点 | 原 gts-autin-coder | 新 swt-coder |
|--------|--------------------|--------------|
| name | gts-autin-coder | swt-coder |
| token 前缀 | `--gts-*` | `--swt-*` |
| EP 版本 | 2.x | 2.13.5 |
| UI 库切换 | 无 | `--ui-library=element-plus/sweetui` |
| 组件匹配 | 无 | `--with-components`(默认开) |
| 换肤属性 | `data-gts-theme` | `data-swt-theme` |
| 预览文件 | index.gts.html | index.swt.html |
| 依赖白名单 | 5项 | 5项 + 预留 @hw-seq/sweet-ui-base |

#### Scripts 适配点

| 文件 | 适配内容 |
|------|---------|
| init.mjs | --gts-* → --swt-*, +--ui-library 参数, +--with-components 参数, 输出 UI_LIBRARY + COMPONENTS |
| build.mjs | --gts-* → --swt-*, +--ui-library 参数, +SweetUI 白名单切换, +@hw-seq/sweet-ui-base 依赖, 组件前缀动态切换 |
| serve.mjs | index.gts.html → index.swt.html |
| build-data.mjs | __GTS_SRC__ → __SWT_SRC__, index.gts.html → index.swt.html |

#### skill-catalog.json

```json
// 旧
"generate-ux-prototype": {"stage":"prototype","entry":"skills/generate-ux-prototype/SKILL.md","assetsRoot":"assets"}
// 新
"swt-coder": {"stage":"prototype","entry":"skills/swt-coder/SKILL.md","assetsRoot":"assets"}
```

#### installer 脚本

```
# 旧
$Skills = @('derive-experience-insights','extract-structured-requirements','generate-ux-prototype','manage-design-assets')
# 新
$Skills = @('derive-experience-insights','extract-structured-requirements','swt-coder','manage-design-assets')
```

---

## 四、需求覆盖矩阵

| # | 需求 | 方案 | 实施状态 |
|---|------|------|---------|
| 1 | gts-autin-coder 功能放到 generate-ux-prototype | 替换：以 gts-autin-coder 为骨架重写 generate-ux-prototype | ✅ |
| 2 | 可切换 SweetUI/ElementPlus | --ui-library 参数 + SweetUI namespace 兼容机制 | ✅ 预留 |
| 3 | spec 统一用 --swt- | Token 三层结构，全部 --swt-* 前缀 | ✅ |
| 4 | token/样式/主题用 g-design-enterprise tokens | Layer 1 保留原始色值，Layer 2 映射到 --swt-* | ✅ |
| 5 | GTS统一配色版集成 | guifan.txt 内容合并进 design_system.md，文件不保留 | ✅ |
| 6 | ict-coder 最佳实践参考 | Tonal Layering / 有阴影无边框 / 无左侧色条 / 语义配对 | ✅ |
| 7 | AI 生成页面直接写 EP/SweetUI 代码 | SKILL.md 完整工作流 + init/build 工具链 | ✅ |
| 8 | 匹配已定义组件则 CV | --with-components(默认开) + component-catalog.md | ✅ |
| 9 | 组件部分做成独立可开关 | --with-components/--without-components + 预留云端源 | ✅ |
| 10 | SweetUI UMD 预留口子 | sweetui.css/components.json/exports.json 占位 | ✅ |
| 11 | 优先跑通 ElementPlus | EP 2.13.5 为默认，init/build 验证通过 | ✅ |
| 12 | 原写代码部分不理，以 gts-autin-coder 为主 | 旧 generate-ux-prototype 重命名 .deprecated | ✅ |
| 13 | 独立 skill 包 | standalone-prompt.md + installer/install.sh | ✅ |
| 14 | 名字可改 | gts-autin-coder → swt-coder | ✅ |
| 15 | 分析冲突重复 | 见上方"三套 Token 体系冲突分析" | ✅ |
| 16 | 不占太多上下文 | 分层加载策略，默认仅 SKILL.md ~220行 | ✅ |

---

## 五、后续待办

### SweetUI UMD 可用后

- [ ] 填充 sweetui-components.json（组件白名单）
- [ ] 填充 sweetui-exports.json（导出白名单）
- [ ] 创建 sweetui.css（token 桥接）
- [ ] 在 preview/public/library/ 下放置 SweetUI UMD 文件
- [ ] 在 index.swt.html 中添加 SweetUI UMD 引用分支
- [ ] 完善 sweetui-guide.md（从 sweetui-frontend-development.md 精简差异点）

### 组件库云端化

- [ ] 实现 `CONFIG.componentsSource` 参数（本地路径 / 云端 URL）
- [ ] init.mjs 中根据 componentsSource 远程拉取组件
- [ ] component-catalog.md 动态生成

### 其他

- [ ] 删除 generate-ux-prototype.deprecated（确认无引用后）
- [ ] 考虑将 tokens/ 和 components/ 做成可选下载包（减小 skill 包体积）
