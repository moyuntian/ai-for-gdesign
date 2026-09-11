# SweetUI 开发指南（预留 — 待 UMD）

## 状态
SweetUI 目前无法提供 UMD 包。此文件为预留指南，待 UMD 包可用后补充完整。

## SweetUI 与 Element Plus 的兼容性

SweetUI 支持 `sweet-config-provider` 配置 `namespace="sweet"` 或 `namespace="el"`，与 Element Plus API 兼容。

### 切换差异

| 维度 | Element Plus | SweetUI |
|------|-------------|---------|
| import | `from 'element-plus'` | `from '@hw-seq/sweet-ui-base'` |
| 组件前缀 | `el-*` | `sweet-*` |
| 消息提示 | `ElMessage.success()` | `SweetMessageBox.success()` |
| 通知 | `ElNotification` | `$sweetNotify()` |
| 确认框 | `ElMessageBox.confirm()` | `SweetMessageBox.confirm()` |
| 命名空间 | `<el-config-provider>` | `<sweet-config-provider namespace="sweet">` |
| CSS | `element-plus/dist/index.css` | `@hw-seq/sweet-ui-base/theme-chalk/index.css` |
| i18n | `ElementPlusLocale` | `sweetUIBase.i18n(language, app)` |
| 主题 | CSS 变量覆盖 | `sweetUIBase.setTheme('light', app)` |

### 组件对照（前缀替换）
```
el-button    → sweet-button
el-input     → sweet-input
el-table     → sweet-table
el-form      → sweet-form
el-dialog    → sweet-dialog
el-select    → sweet-select
el-pagination→ sweet-pagination
...
```

### init 时切换
```bash
node scripts/init.mjs "<folder>" "<slug>" --ui-library=sweetui
```

### build 时校验
```bash
node scripts/build.mjs --dir "<folder>" --ui-library=sweetui
```
SweetUI 组件白名单（`sweetui-components.json`）目前为空数组，待 UMD 包提供后填充。

## 待办（UMD 可用后）
- [ ] 填充 sweetui-components.json（组件白名单）
- [ ] 填充 sweetui-exports.json（导出白名单）
- [ ] 创建 sweetui.css（token 桥接）
- [ ] 在 preview/public/library/ 下放置 SweetUI UMD 文件
- [ ] 在 index.swt.html 中添加 SweetUI UMD 引用分支

## 完整指南参考
详见 `references/sweetui-frontend-development.md`（完整 871 行指南）。
