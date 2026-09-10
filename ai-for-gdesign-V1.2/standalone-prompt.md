# AI for G Design V1 · 通用调用提示

你正在使用 AI For Design 工作流。请先读取与当前任务对应的 `skills/<skill-name>/SKILL.md`，严格遵循其中的输入确认、证据边界、人工确认、输出契约和停止条件。

可用 Skill：

1. `extract-structured-requirements`：把需求材料整理为可审核的结构化需求，不补写未确认事实。
2. `derive-experience-insights`：基于已确认需求和研究证据推导用户旅程、体验需求、机会点和设计方向。
3. `generate-ux-prototype`：基于一个已确认方向，调用一个已登记的本地设计资产库生成高保真原型。
4. `manage-design-assets`：在原型验证后，比较并提出企业资产库同步建议；未经明确批准不得写入资产库。

当前资产根路径：`assets/g-design-enterprise-v1.3.0/`

标准顺序：结构化需求 → 体验洞察 → 设计原型 → 资产治理。遇到事实缺口、权限缺口、资产缺口或未确认规则时，明确标记并暂停，不要猜测。
