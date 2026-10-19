#!/usr/bin/env node
// init.mjs
// Initializes a generate-ux-prototype page workspace: creates {slug}/ with a REAL Vue 3
// deliverable (standard structure under src/) plus the offline preview runtime.
//
// Tokens, references, and components are copied from the assets package
// (g-design-enterprise) into the workspace — the skill itself does NOT store
// copies, ensuring assets upgrades require zero changes to this skill.
//
// Layout created:
//   {slug}/
//   ├── mock/modules/{slug}.js           # Mock 数据 + API 模拟
//   ├── public/library/                  # 预览运行时 UMD（FIXED）
//   ├── references/                      # ★ 从 assets 包复制（规范文件，AI 按需读取）
//   ├── src/
//   │   ├── main.js                      # 工程入口（FIXED）
//   │   ├── App.vue                      # 应用壳
//   │   ├── assets/
//   │   │   ├── themes/                  # base.css + swt-default.css + tokens/★
//   │   │   │   ├── base.css             # STABLE
//   │   │   │   ├── swt-default.css       # STABLE（主题入口）
//   │   │   │   └── tokens/              # ★ 从 assets 包复制（clean copy）
//   │   │   ├── fonts/ style/ images/
//   │   ├── components/                  # ★ 从 assets 包复制（组件匹配用）
//   │   ├── locales/
//   │   ├── router/index.js
//   │   └── views/{slug}/
//   ├── index.swt.html
//   └── preview-data.js
//
// Usage:
//   node init.mjs "<artifact-folder>" "<slug>" [--assets-root=<path>] [--ui-library=element-plus|sweetui] [--with-components|--without-components]
//
// Output (agent-parseable):
//   RESULT: OK
//   HTML_PATH: <absolute path to {slug}/index.swt.html>
//   SRC_DIR: <absolute path to {slug}/src>
//   PAGE: <PascalCase page name>
//   ASSETS_ROOT: <resolved assets root or 'none'>
//   ASSETS_ROOT_SOURCE: <flag|env:ASSETS_ROOT|auto-detect (N levels)|none>
//   UI_LIBRARY: <element-plus|sweetui>
//   COMPONENTS: <enabled|disabled>
//   RESULT: FAIL | <reason>

import {
  existsSync,
  statSync,
  mkdirSync,
  cpSync,
  writeFileSync,
  readdirSync,
  rmdirSync,
} from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { refresh } from './build-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

function fail(reason) {
  console.log(`RESULT: FAIL | ${reason}`);
  process.exit(1);
}

// --- args ---
const rawArgs = process.argv.slice(2);
const args = rawArgs.filter((a) => !a.startsWith('-'));
let artifactFolder, slug;
if (args.length === 2) {
  [artifactFolder, slug] = args;
} else if (args.length === 1) {
  artifactFolder = process.cwd();
  [slug] = args;
} else {
  fail('Usage: node init.mjs "<artifact-folder>" "<slug>" [--ui-library=element-plus|sweetui] [--with-components|--without-components]');
}

// Parse optional flags
function getFlag(name) {
  const idx = rawArgs.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (idx === -1) return undefined;
  const val = rawArgs[idx];
  if (val.includes('=')) return val.split('=')[1];
  return rawArgs[idx + 1];
}
function hasFlag(name) {
  return rawArgs.includes(`--${name}`);
}

const uiLibrary = getFlag('ui-library') || 'element-plus';

// Resolve assets root: --assets-root=<path> > $ASSETS_ROOT > walk up from skill dir
function findLibraryUnder(assetsDir) {
  if (!existsSync(assetsDir)) return undefined;
  const entries = readdirSync(assetsDir)
    .filter((n) => n.startsWith('g-design-enterprise'))
    .sort()
    .reverse(); // prefer highest version when several are present
  return entries.length > 0 ? join(assetsDir, entries[0]) : undefined;
}

let assetsRoot = getFlag('assets-root');
let assetsRootSource = 'flag';
if (!assetsRoot && process.env.ASSETS_ROOT) {
  const envVal = resolve(process.env.ASSETS_ROOT);
  if (existsSync(join(envVal, 'asset-manifest.json'))) {
    assetsRoot = envVal; // points at the library itself
    assetsRootSource = 'env:ASSETS_ROOT';
  } else {
    assetsRoot = findLibraryUnder(envVal); // points at an assets/ parent
    if (assetsRoot) assetsRootSource = 'env:ASSETS_ROOT';
  }
}
if (!assetsRoot) {
  // Auto-detect: walk up from the skill dir (≤6 levels) looking for assets/g-design-enterprise-*.
  // At each level probe <level>/assets and <level>/*/assets (package folders like
  // ai-for-gdesign-V1.2/ may nest the assets dir one level below the repo root).
  let cursor = resolve(__dirname, '..'); // skill root
  for (let i = 0; i < 6 && !assetsRoot; i++) {
    assetsRoot = findLibraryUnder(join(cursor, 'assets'));
    if (assetsRoot) {
      assetsRootSource = `auto-detect (walked up ${i} level${i === 1 ? '' : 's'})`;
      break;
    }
    for (const entry of readdirSync(cursor, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
      assetsRoot = findLibraryUnder(join(cursor, entry.name, 'assets'));
      if (assetsRoot) {
        assetsRootSource = `auto-detect (walked up ${i} level${i === 1 ? '' : 's'}, via ${entry.name}/assets)`;
        break;
      }
    }
    if (assetsRoot) break;
    const next = resolve(cursor, '..');
    if (next === cursor) break;
    cursor = next;
  }
}
if (assetsRoot && !existsSync(join(assetsRoot, 'asset-manifest.json'))) {
  console.log(`WARN: ASSETS_ROOT "${assetsRoot}" (from ${assetsRootSource}) has no asset-manifest.json — tokens/references/components may be missing`);
}
if (!assetsRoot) {
  console.log('WARN: assets library not found — workspace will be created WITHOUT tokens/references/components.');
  console.log('WARN: fix by re-running with --assets-root=<path to g-design-enterprise-v1.3.0> or setting env ASSETS_ROOT.');
}

if (!['element-plus', 'sweetui'].includes(uiLibrary)) {
  fail(`Invalid --ui-library "${uiLibrary}" — must be "element-plus" or "sweetui"`);
}

if (!existsSync(artifactFolder) || !statSync(artifactFolder).isDirectory()) {
  fail(`Artifact folder does not exist or is not a directory: ${artifactFolder}`);
}
if (!/^[a-z0-9]+(-[a-z0-9]+){1,5}$/.test(slug)) {
  fail(`Slug must be kebab-case ascii, 2-6 hyphen-separated segments: '${slug}'`);
}

// ---------- 1. resolve template ----------
const preview = resolve(__dirname, 'preview');
const scaffoldSrc = join(preview, 'src');
const libSrc = join(preview, 'public', 'library');
const htmlSrc = join(preview, 'index.swt.html');
for (const p of [scaffoldSrc, libSrc, htmlSrc]) {
  if (!existsSync(p)) fail(`template incomplete, missing: ${p}`);
}

// ---------- 2. derive names ----------
const pageName = slug
  .split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
  .join('');

// ---------- 3. create destination ----------
const dest = join(artifactFolder, slug);
if (existsSync(join(dest, 'src'))) {
  fail(`target already exists (use Modification Workflow instead): ${dest}`);
}
mkdirSync(dest, { recursive: true });

// ---------- 4. copy deliverable scaffold (main.js + assets + README) ----------
const srcDir = join(dest, 'src');
cpSync(scaffoldSrc, srcDir, { recursive: true });

// ---------- 5. create directories ----------
mkdirSync(join(dest, 'mock', 'modules'), { recursive: true });
mkdirSync(join(srcDir, 'locales', 'lang', 'zh-CN'), { recursive: true });
mkdirSync(join(srcDir, 'locales', 'lang', 'en-US'), { recursive: true });
mkdirSync(join(srcDir, 'views', slug, 'js'), { recursive: true });

// ---------- 6. write starter files ----------

// --- 6a. mock/modules/{slug}.js ---
writeFileSync(
  join(dest, 'mock', 'modules', `${slug}.js`),
  `// ${pageName} — Mock 数据 + API 请求模拟
// 真实工程中替换为实际 API 调用（axios/fetch）
// 注意：此文件应覆盖页面所有数据驱动区域——列表、详情、选项、KPI 等

// ---- 状态枚举（与 constants.js 对齐）----
const STATUS_OPTIONS = [
  { value: 'running', label: '运行中', tagType: 'success' },
  { value: 'stopped', label: '已停止', tagType: 'danger' },
  { value: 'pending', label: '待处理', tagType: 'warning' },
  { value: 'idle', label: '空闲', tagType: 'info' },
  { value: 'maintenance', label: '维护中', tagType: 'primary' },
]

// ---- 下拉/筛选选项 mock ----
const FILTER_OPTIONS = {
  status: STATUS_OPTIONS,
  department: [
    { value: 'dev', label: '研发部' },
    { value: 'ops', label: '运维部' },
    { value: 'product', label: '产品部' },
    { value: 'design', label: '设计部' },
  ],
}

// ---- 主列表数据（≥10 条；紧凑元组 + map 展开，勿逐条写完整对象字面量）----
// 元组: [name, status, department, owner, createdAt, updatedAt, amount, progress, priority]
const ROWS = [
  ['前端优化方案', 'running', 'dev', '张明', '2025-09-01 09:30', '2025-09-10 14:20', 12500, 85, 'high'],
  ['后端服务迁移', 'stopped', 'dev', '李华', '2025-08-25 10:00', '2025-09-08 16:45', 38000, 40, 'medium'],
  ['数据库扩容', 'pending', 'ops', '王强', '2025-09-05 11:15', '2025-09-09 09:00', 7500, 0, 'high'],
  ['UI 组件库升级', 'running', 'design', '赵芳', '2025-08-20 14:00', '2025-09-10 11:30', 6200, 60, 'low'],
  ['监控告警系统', 'idle', 'ops', '刘伟', '2025-09-02 08:45', '2025-09-07 17:00', 18000, 100, 'medium'],
  ['用户权限重构', 'running', 'dev', '陈静', '2025-08-28 13:20', '2025-09-10 15:00', 24000, 55, 'high'],
  ['API 网关部署', 'maintenance', 'ops', '杨光', '2025-09-03 10:30', '2025-09-09 14:00', 15500, 30, 'medium'],
  ['产品需求评审', 'pending', 'product', '周婷', '2025-09-06 09:00', '2025-09-08 12:00', 0, 0, 'low'],
  ['性能压测方案', 'running', 'dev', '吴磊', '2025-08-30 15:45', '2025-09-10 10:15', 9800, 70, 'high'],
  ['日志分析平台', 'stopped', 'ops', '孙超', '2025-08-22 16:00', '2025-09-05 11:00', 21000, 25, 'medium'],
  ['设计规范文档', 'running', 'design', '林雪', '2025-09-04 14:30', '2025-09-10 09:45', 3200, 90, 'low'],
  ['安全审计整改', 'pending', 'dev', '郑刚', '2025-09-07 10:00', '2025-09-09 16:30', 45000, 0, 'high'],
]

const mockData = ROWS.map(([name, status, department, owner, createdAt, updatedAt, amount, progress, priority], i) => ({
  id: i + 1,
  name: \`${pageName}-\${name}\`,
  status, department, owner, createdAt, updatedAt, amount, progress, priority,
}))

// ---- KPI/统计 mock ----
const mockKpi = {
  total: mockData.length,
  running: mockData.filter((i) => i.status === 'running').length,
  pending: mockData.filter((i) => i.status === 'pending').length,
  totalAmount: mockData.reduce((sum, i) => sum + i.amount, 0),
  avgProgress: Math.round(mockData.reduce((sum, i) => sum + i.progress, 0) / mockData.length),
}

// ---- 列表查询（支持分页、关键词、状态筛选）----
export function fetchList(params = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...mockData]
      if (params.keyword) {
        result = result.filter((item) => item.name.includes(params.keyword) || item.owner.includes(params.keyword))
      }
      if (params.status) {
        result = result.filter((item) => item.status === params.status)
      }
      if (params.department) {
        result = result.filter((item) => item.department === params.department)
      }
      const page = params.page || 1
      const pageSize = params.pageSize || 10
      const start = (page - 1) * pageSize
      resolve({ data: result.slice(start, start + pageSize), total: result.length })
    }, 300)
  })
}

// ---- 详情查询 ----
export function fetchDetail(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = mockData.find((item) => item.id === Number(id))
      resolve({ data: item ? { ...item, statusLabel: STATUS_OPTIONS.find((s) => s.value === item.status)?.label, description: \`这是 \${item.name} 的详细描述信息，包含项目背景、目标和执行计划。\`, timeline: [
        { time: item.createdAt, event: '项目创建', operator: item.owner },
        { time: item.updatedAt, event: '状态更新', operator: item.owner },
      ] } : null })
    }, 200)
  })
}

// ---- 下拉选项查询 ----
export function fetchOptions(field) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: FILTER_OPTIONS[field] || [] })
    }, 100)
  })
}

// ---- KPI 查询 ----
export function fetchKpi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockKpi })
    }, 200)
  })
}

// ---- 新增/编辑（模拟保存）----
export function saveItem(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { ...data, id: data.id || Date.now() }, success: true })
    }, 300)
  })
}

// ---- 删除（模拟）----
export function deleteItem(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { id, success: true } })
    }, 200)
  })
}
`,
  'utf8',
);

// --- 6b. locales/lang/zh-CN/common.json ---
writeFileSync(
  join(srcDir, 'locales', 'lang', 'zh-CN', 'common.json'),
  JSON.stringify({
    confirm: '确定', cancel: '取消', search: '搜索', reset: '重置',
    add: '新增', edit: '编辑', delete: '删除', view: '查看', refresh: '刷新',
    operation: '操作', status: '状态', name: '名称', success: '成功', failed: '失败',
  }, null, 2) + '\n',
  'utf8',
);

// --- 6c. locales/lang/en-US/common.json ---
writeFileSync(
  join(srcDir, 'locales', 'lang', 'en-US', 'common.json'),
  JSON.stringify({
    confirm: 'Confirm', cancel: 'Cancel', search: 'Search', reset: 'Reset',
    add: 'Add', edit: 'Edit', delete: 'Delete', view: 'View', refresh: 'Refresh',
    operation: 'Action', status: 'Status', name: 'Name', success: 'Success', failed: 'Failed',
  }, null, 2) + '\n',
  'utf8',
);

// --- 6d. locales/index.js ---
writeFileSync(
  join(srcDir, 'locales', 'index.js'),
  `// i18n 入口 — 预览环境简单对象合并；真实工程用 vue-i18n
import zhCNCommon from './lang/zh-CN/common.json'
import enUSCommon from './lang/en-US/common.json'

export const messages = {
  'zh-CN': { common: zhCNCommon },
  'en-US': { common: enUSCommon },
}
`,
  'utf8',
);

// --- 6e. router/index.js (simple inline, no guards/modules) ---
writeFileSync(
  join(srcDir, 'router', 'index.js'),
  `import { createRouter, createWebHashHistory } from 'vue-router'
import ${pageName} from '../views/${slug}/index.vue'

const routes = [
  { path: '/', name: '${slug}', component: ${pageName} },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
`,
  'utf8',
);

// --- 6f. views/{slug}/index.vue ---
writeFileSync(
  join(srcDir, 'views', slug, 'index.vue'),
  `<script setup>
// ${pageName} — 页面主组件（交付入口；真实工程中由路由挂载）
import { ref, onMounted } from 'vue'
import { Monitor } from '@element-plus/icons-vue'
import { fetchList } from '../../../mock/modules/${slug}.js'
import { PAGE_TITLE, STATUS_MAP } from './js/constants.js'

const loading = ref(false)
const dataList = ref([])

async function fetchData() {
  loading.value = true
  try {
    const res = await fetchList()
    dataList.value = res.data
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="page-root">
    <el-card shadow="never">
      <template #header>
        <div class="header">
          <span class="title">{{ PAGE_TITLE }}</span>
          <el-button type="primary" :icon="Monitor" @click="fetchData">刷新</el-button>
        </div>
      </template>
      <el-table :data="dataList" v-loading="loading">
        <el-table-column type="index" label="序号" width="6rem" />
        <el-table-column prop="name" label="名称" min-width="14rem" />
        <el-table-column label="状态" width="10rem">
          <template #default="{ row }">
            <el-tag :type="STATUS_MAP[row.status]?.type || 'info'">
              {{ STATUS_MAP[row.status]?.label || row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.page-root {
  min-height: 100%;
  padding: 2.4rem;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }
}
</style>
`,
  'utf8',
);

// --- 6g. views/{slug}/js/constants.js ---
writeFileSync(
  join(srcDir, 'views', slug, 'js', 'constants.js'),
  `// ${pageName} — 常量定义
// 常量命名：全大写 + 下划线（如 ALARM_LEVEL）

export const PAGE_TITLE = '${pageName}'

export const STATUS_MAP = {
  running:     { label: '运行中', type: 'success' },
  stopped:     { label: '已停止', type: 'danger' },
  pending:     { label: '待审核', type: 'warning' },
  idle:        { label: '空闲',   type: 'info' },
  maintenance: { label: '维护中', type: 'warning' },
}

export const STATUS_OPTIONS = [
  { label: '运行中', value: 'running' },
  { label: '已停止', value: 'stopped' },
  { label: '待审核', value: 'pending' },
  { label: '空闲',   value: 'idle' },
  { label: '维护中', value: 'maintenance' },
]
`,
  'utf8',
);

// --- 6h. App.vue ---
writeFileSync(
  join(srcDir, 'App.vue'),
  `<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
`,
  'utf8',
);

// ---------- 7. copy preview runtime + loader ----------
cpSync(libSrc, join(dest, 'public', 'library'), { recursive: true });
cpSync(htmlSrc, join(dest, 'index.swt.html'));

// ---------- 7a. copy tokens, references, components from assets package ----------
if (assetsRoot && existsSync(assetsRoot)) {
  const tokensSrc = join(assetsRoot, 'tokens');
  const tokensDest = join(srcDir, 'assets', 'themes', 'tokens');
  if (existsSync(tokensSrc)) {
    cpSync(tokensSrc, tokensDest, { recursive: true });
  }

  // Copy references (design specs, component catalog, etc.) — opt-in via --with-references
  // Default OFF: generated code packages stay clean (specs live in the skill/assets package)
  if (hasFlag('with-references')) {
    const refsSrc = join(assetsRoot, 'references');
    if (existsSync(refsSrc)) {
      cpSync(refsSrc, join(dest, 'references'), { recursive: true });
    }
  }

  // Components are NOT copied here — use copy-components.mjs after deciding
  // which components the page needs (see references/component-catalog.md).
  // Create empty components/ dir so import paths resolve during development.
  mkdirSync(join(srcDir, 'components'), { recursive: true });
}

// ---------- 8. generate preview-data.js ----------
const result = refresh(dest);
if (!result.ok) fail(result.reason);

// ---------- 8a. remove empty directories ----------
function removeEmptyDirs(dir) {
  let removed = false;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const full = join(dir, entry.name);
      if (removeEmptyDirs(full)) removed = true;
    }
  }
  if (readdirSync(dir).length === 0) {
    rmdirSync(dir);
    return true;
  }
  return removed;
}
removeEmptyDirs(dest);

// ---------- 9. done ----------
console.log('RESULT: OK');
console.log(`HTML_PATH: ${resolve(join(dest, 'index.swt.html'))}`);
console.log(`SRC_DIR: ${resolve(srcDir)}`);
console.log(`PAGE: ${pageName}`);
console.log(`ASSETS_ROOT: ${assetsRoot || 'none'}`);
console.log(`ASSETS_ROOT_SOURCE: ${assetsRootSource}`);
console.log(`UI_LIBRARY: ${uiLibrary}`);
process.exit(0);
