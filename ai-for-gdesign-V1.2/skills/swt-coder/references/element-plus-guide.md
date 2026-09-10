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
```js
import { fetchList } from '../../../mock/modules/{slug}.js'
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
- px 单位 — 改用 rem
