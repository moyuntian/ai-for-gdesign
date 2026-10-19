# Element Plus 2.13.5 开发指南

## 版本信息
- Element Plus 2.13.5
- @element-plus/icons-vue（293 图标白名单）
- 121 组件白名单（build 校验）

## 常用图标（import from '@element-plus/icons-vue'）
```
Search  Plus  Edit  Delete  View  Refresh  Setting  User  Lock  Check
Close  Warning  InfoFilled  ArrowDown  ArrowUp  ArrowLeft  ArrowRight
Monitor  Filter  More  Calendar  Bell  Download  Upload
```

## 常用组件速查
```
el-button el-input el-select el-option el-table el-table-column
el-pagination el-form el-form-item el-dialog el-drawer el-tag
el-icon el-menu el-container el-header el-aside el-main
el-row el-col el-card el-tabs el-tab-pane el-tooltip el-dropdown
el-input-number el-date-picker el-empty el-loading el-skeleton
```

## Mock API 模式

Mock 数据是页面真实感的来源——**凡是数据驱动的 UI，一律走 mock**，禁止在 template 里硬编码。

### 必须覆盖 mock 的场景
| 场景 | mock 函数 | 说明 |
|------|----------|------|
| 主列表/表格 | `fetchList(params)` | ≥10 条，字段覆盖所有 table-column prop |
| 下拉/筛选选项 | `fetchOptions(field)` 或 constants | el-select/cascader 的 options |
| KPI/统计卡片 | `fetchKpi()` | 看板页数值、趋势、环比 |
| 详情面板 | `fetchDetail(id)` | drawer/dialog 展示的完整字段 |
| 保存/新增 | `saveItem(data)` | 表单提交模拟 |
| 删除 | `deleteItem(id)` | 删除操作模拟 |

### 数据字段要求
- **日期：** `'2025-09-01'` 或 `'2025-09-10 14:30'` 字符串格式
- **金额：** 数字带小数 `12500.00`
- **百分比/进度：** 0-100 整数
- **状态枚举：** value/label/tagType 三元组，与 constants.js 对齐
- **分页：** 返回 `{ data: [...], total: N }`

### 示例
```js
import { fetchList, fetchDetail, fetchOptions, fetchKpi } from '../../../mock/modules/{slug}.js'
// mock/modules/{slug}.js: Promise + setTimeout 模拟异步
```

## i18n 模式
```js
const t = { title: '页面标题', refresh: '刷新' }
// 模板: {{ t.title }}
```

## 运行时错误预防
1. **el-select v-model 值必须在 options 中** — 初始值 `''`（配合 clearable）
2. **el-table column prop 与 data key 匹配**
3. **template 不引用未声明的变量**
4. **Less 嵌套 ≤ 3 层**

## Vue SFC 反模式
- `v-for` 忘 `:key`；`v-if` 与 `v-for` 同标签
- 图片路径写死相对字符串 — 应 `import img from '...'`
- 组件注册到全局 — 一律显式 import
- 静态内联 `style="..."` — 禁止
- px 单位 — 改用 rem（**例外:** 组件 prop 如 `el-table-column` 的 `width`/`min-width`、`el-icon` 的 `:size` 保持数字像素值）
