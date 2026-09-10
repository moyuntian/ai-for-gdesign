# AI for G Design V1

一个可跨大模型工具复用的 AI For Design 安装包，内含四个独立 Skill 与 `g-design-enterprise-v1.3.0` 企业设计资产库。

## 能力链路

`extract-structured-requirements` → `derive-experience-insights` → `generate-ux-prototype` →（原型验证后）`manage-design-assets`

四个 Skill 保持独立，可单独调用，也可按上述顺序组成完整设计流程。AI 不替代设计师确认需求、批准设计方向或批准资产入库。

## 安装

### 支持 Skill / Rules 目录的工具

```bash
./installer/install-skills.sh /path/to/target/skills
```

Windows PowerShell：

```powershell
.\installer\install-skills.ps1 -Destination "C:\path\to\target\skills"
```

安装脚本只复制四个 Skill；`g-design-enterprise-v1.3.0` 资产库随包保留，需要在调用原型生成或资产治理时将 `assets/g-design-enterprise-v1.3.0` 作为 `ASSETS_ROOT` 提供给模型。

### 仅支持项目知识 / 文件上传的工具

上传 `skills/`、`assets/`、`workflow-contracts/` 和 `asset-manifest.yaml`，并要求模型先读取相应 Skill 的 `SKILL.md`。

### 仅支持系统提示词的工具

使用 `standalone-prompt.md`，同时提供对应 Skill 文件夹与资产根路径。

## 资产调用

首个资产库为 `g-design-enterprise-v1.3.0`：Vue 3、Element Plus 2.13.5、Light / Dark Token、43 个基础组件、13 个业务组件、5 个复杂组件、6 个页面模板，以及离线 Lucide 1.43.0 图标库。

原型生成必须遵守：一个原型只使用一个已登记资产库和一个精确版本；多个设计方向只有被设计师标记为 `approved` 的方向才生成原型。

## 目录

```text
ai-for-gdesign-V1/
├── skills/                       # 四个独立 Skill
├── assets/g-design-enterprise-v1.3.0/
├── workflow-contracts/            # 阶段间输入输出约定
├── installer/                     # macOS/Linux 与 Windows 安装脚本
├── asset-manifest.yaml            # 统一资产入口
├── skill-catalog.json
└── standalone-prompt.md
```
