# Text-to-UI Skill Compact - 上下文占用优化对照包

本目录包含两个 `text-to-ui-compact` skill 包,对照展示上下文占用优化前后的差异。

## 包说明

| 包名 | 大小 | 文件数 | 状态 | 说明 |
|---|---|---|---|---|
| `text-to-ui-compact-original.zip` | ~4.4 MB | 992 | git HEAD `e70d9f2`(优化前) | 原版完整 skill 包,含所有文件 |
| `text-to-ui-compact-optimized.zip` | ~4.1 MB | 920 | 当前工作区(优化后) | 精简版,排除仓库管理文件 + 测试脚本 + 维护预览 |

## 优化内容(optimized vs original)

### A. 上下文占用优化(核心改动)

1. **删除冗余文件**:根目录 `pixso-fidelity-import-pipeline.md`(与 `references/pixso-fidelity-import-pipeline.md` 重复,~20 KB)
2. **SKILL.md 增加"模型默认不直接读"清单段**:显式列出 `.delivery-manifest.json`、`references/index/generated/*`、`mapping-registry.md`、14 份聚合产物
3. **新建 `references/README.md`**:三分类导航(路由必读 / 按需查询 / 脚本生成不直接读)
4. **`references/routing-guide.md` 增加"模型默认不直接读"子段**
5. **`references/resource-workflow.md` 增加"模型默认不直接读"子段**
6. **重建 `.delivery-manifest.json`**:路径归一化(`/` 格式)+ 去重(993 files)
7. **重建 9 个 generated 索引**:`resources:build` → `catalog:build` → `index:build`

### B. 打包精简(optimized 包排除的非运行文件)

从 optimized 包中排除以下 skill 运行不需要的文件(共 72 文件 / ~218 KB):

| 排除项 | 文件数 | 大小 | 原因 |
|---|---|---|---|
| `.gitignore` | 1 | 0.04 KB | git 仓库配置,skill 包不是 git 仓库 |
| `pnpm-lock.yaml` | 1 | 1 KB | lockfile,只有 `pnpm install` 才用 |
| `MIGRATION.md` | 1 | 2.09 KB | 历史迁移文档 |
| `.delivery-manifest.json` | 1 | 121.75 KB | 脚本生成,无脚本读取,模型默认不直接读 |
| `maintenance/` | 2 | 25 KB | 维护校验产物 |
| `preview/` | 3 | 45 KB | 预览测试 HTML |
| `scripts/test-*.mjs` | 62 | 367 KB | 测试脚本,skill 运行不需要 |
| `scripts/update_preview_cache.py` | 1 | 3.2 KB | Python 脚本,在 Node 项目里 |

**原版包保持完整**,包含上述所有文件,作为 git HEAD 的对照基线。

### 优化目标

减少 skill 被模型加载时的上下文占用,同时保证:
- 三层路由(Workflow → Task → Pattern)不降级
- 49 个组件契约、Tokens/Pattern 不动
- 切片查询脚本 API(`query-resources.mjs` / `query-components.mjs` / `query-tokens.mjs`)不变
- 门禁机制(sdd-riper-one 的 checkpoint/approval/validation/reverse sync)不弱化

### 上下文占用大户(优化机制)

| 大户 | 体积 | 优化机制 |
|---|---|---|
| `references/index/generated/` | 417 KB | SKILL.md + references/README.md 显式标"模型默认不直接读" |
| 14 份聚合产物 | ~400 KB | references/README.md 三分类 + 显式映射到源目录 `references/resources/<topic>/` |
| `mapping-registry.md` | 102 KB | SKILL.md 清单约束 |

### 验证状态(optimized 包,重建索引后)

- `pnpm resources:check` ✅ PASS
- `pnpm catalog:check` ✅ PASS
- `pnpm index:check` ✅ PASS
- `node scripts/resolve-workflow-route.mjs --route new-page` ✅ PASS

**注意**:optimized 包已排除 `.delivery-manifest.json`,如需重建运行 `node scripts/skill-delivery.mjs`(需用 export 的 `deliveryManifest(root)` 函数 + 路径归一化)。

## 使用方法

1. 解压 zip 到本地目录
2. 在 opencode 或其他 AI 编码工具中,将该目录配置为 skill 根
3. 调用 `$text-to-ui-compact` 触发 skill

## 来源

- 原始仓库:https://github.com/ahai66666/text-to-ui-skill-compact
- 优化任务 Spec:见原仓库 `mydocs/specs/2026-10-19_skill-context-slim.md`

## 协议

UNLICENSED(见原仓库 LICENSE)
