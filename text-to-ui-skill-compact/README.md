# Text-to-UI Skill Compact - 上下文占用优化对照包

本目录包含两个 `text-to-ui-compact` skill 包,对照展示上下文占用优化前后的差异。

## 包说明

| 包名 | 大小 | 状态 | 说明 |
|---|---|---|---|
| `text-to-ui-compact-original.zip` | ~4.4 MB | git HEAD `e70d9f2`(优化前) | 原版 skill,未做上下文占用优化 |
| `text-to-ui-compact-optimized.zip` | ~4.4 MB | 当前工作区(优化后) | 含上下文占用优化改动 |

## 优化内容(optimized vs original)

### 改动清单

1. **删除冗余文件**:根目录 `pixso-fidelity-import-pipeline.md`(与 `references/pixso-fidelity-import-pipeline.md` 重复,~20 KB)
2. **SKILL.md 增加"模型默认不直接读"清单段**:显式列出 `.delivery-manifest.json`、`references/index/generated/*`、`mapping-registry.md`、14 份聚合产物
3. **新建 `references/README.md`**:三分类导航(路由必读 / 按需查询 / 脚本生成不直接读)
4. **`references/routing-guide.md` 增加"模型默认不直接读"子段**
5. **`references/resource-workflow.md` 增加"模型默认不直接读"子段**
6. **重建 `.delivery-manifest.json`**:路径归一化(`/` 格式)+ 去重(993 files)
7. **重建 9 个 generated 索引**:`resources:build` → `catalog:build` → `index:build`

### 优化目标

减少 skill 被模型加载时的上下文占用,同时保证:
- 三层路由(Workflow → Task → Pattern)不降级
- 49 个组件契约、Tokens/Pattern 不动
- 切片查询脚本 API(`query-resources.mjs` / `query-components.mjs` / `query-tokens.mjs`)不变
- 门禁机制(sdd-riper-one 的 checkpoint/approval/validation/reverse sync)不弱化

### 上下文占用大户(优化机制)

| 大户 | 体积 | 优化机制 |
|---|---|---|
| `.delivery-manifest.json` | 121 KB | SKILL.md + references/README.md 显式标"模型默认不直接读" |
| `references/index/generated/` | 417 KB | 同上 + routing-guide.md / resource-workflow.md 清单约束 |
| 14 份聚合产物 | ~400 KB | references/README.md 三分类 + 显式映射到源目录 `references/resources/<topic>/` |
| `mapping-registry.md` | 102 KB | SKILL.md 清单约束 |

### 验证状态(optimized 包)

- `pnpm resources:check` ✅ PASS
- `pnpm catalog:check` ✅ PASS
- `pnpm index:check` ✅ PASS
- `node scripts/resolve-workflow-route.mjs --route new-page` ✅ PASS

### Skill 必驻入口字节数

- 原版:~8 KB(SKILL.md 4.54 + README.md 3.22 + agents/openai.yaml 0.37)
- 优化版:9.41 KB(增加 1.41 KB,因增加"模型默认不直接读"清单)

## 使用方法

1. 解压任一 zip 到本地目录
2. 在 opencode 或其他 AI 编码工具中,将该目录配置为 skill 根
3. 调用 `$text-to-ui-compact` 触发 skill

## 来源

- 原始仓库:https://github.com/ahai66666/text-to-ui-skill-compact
- 优化任务 Spec:见原仓库 `mydocs/specs/2026-10-19_skill-context-slim.md`(仅 optimized 包含)

## 协议

UNLICENSED(见原仓库 LICENSE)
