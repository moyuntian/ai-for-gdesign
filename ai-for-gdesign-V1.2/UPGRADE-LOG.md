# AI for G Design V1.3 升级日志

升级日期：2026-09-10  
升级范围：`ai-for-gdesign-V1.2.zip` → `ai-for-gdesign-V1.3.zip`

## 本次升级内容

### 1. 颜色 Token

- 保留软件产品主强调色 `#0067D1`，不改变现有按钮、链接、选中、焦点、按下和禁用等业务语义。
- 在 H Design 基础色板之外新增参考图对应的展示型蓝—淡紫—浅粉渐变色。
- 新增 `visualPalette` 和 `glassTokens` 机器可读定义，便于 Skill 检索和原型生成时按语义调用。
- 保持 Light / Dark 同名语义；深色模式提供对应的深色渐变和玻璃表面映射。

### 2. Aurora Glass 资产

- 新增 `assets/g-design-enterprise-v1.3.0/tokens/glass.css`。
- 新增半透明表面、柔和表面、强表面、边框、模糊、饱和度、圆角和阴影 Token。
- 新增 `.g-glass-surface`、`.g-glass-surface-soft`、`.g-glass-header` 三个可复用视觉类。
- 玻璃效果推荐用于仪表盘头图、指标卡、顶部导航和概览面板。
- 表格、复杂表单和告警列表默认保持实色高对比表面，避免影响业务信息辨识。
- `backdrop-filter` 不可用时自动回退为高不透明度实色背景。

### 3. 资产调用规则

- 资产库 manifest 新增 `glass-surface` 能力和 `aurora-glass` 视觉风格登记。
- 原型生成规则增加“视觉风格显式选择”约束，避免模型未经确认自动对所有页面使用玻璃效果。
- 生成规则版本统一升级为 `1.3.0`。

### 4. 兼容性与保留项

- 四个独立 Skill、Vue 3、Element Plus 2.13.5、Light / Dark Token、离线 Lucide 1.43.0 和现有 67 项资产全部保留。
- 不修改 H Design 原始色板和原始来源文件；新增内容以视觉扩展方式独立管理。
- 不改变现有业务功能色、无障碍图表色、代码色和既有组件尺寸规范。

## 主要变更文件

- `asset-manifest.yaml`
- `skill-catalog.json`
- `assets/g-design-enterprise-v1.3.0/asset-manifest.json`
- `assets/g-design-enterprise-v1.3.0/references/generation-rules.yaml`
- `assets/g-design-enterprise-v1.3.0/tokens/color-tokens.json`
- `assets/g-design-enterprise-v1.3.0/tokens/glass.css`
- `assets/g-design-enterprise-v1.3.0/dist/glass.css`
- `assets/g-design-enterprise-v1.3.0/tokens/index.scss`
- `assets/g-design-enterprise-v1.3.0/tokens/component.css`
- `assets/g-design-enterprise-v1.3.0/tokens/README.md`
- `assets/g-design-enterprise-v1.3.0/README.md`
- `assets/g-design-enterprise-v1.3.0/CHANGELOG.md`
