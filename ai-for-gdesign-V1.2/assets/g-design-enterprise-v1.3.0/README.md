# G Design Enterprise 1.3.0

基于 `g-design-token.md` 与 `Element Plus 2.13.5` 的 Vue 3 企业级组件和页面模板资产库。

## 使用

```bash
npm install
npm run validate
npm run build
```

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import GDesignEnterprise from '@g-design/enterprise'
import '@g-design/enterprise/tokens/index.scss'

createApp(App).use(ElementPlus).use(GDesignEnterprise).mount('#app')
```

在根节点设置 `data-theme="dark"` 启用深色主题。每个组件和页面模板均独立成目录，并附机器可读 `metadata.json`。

## V1.2资产规模

- 43个基础组件：新增上传、穿梭框、树、虚拟树、自动补全、下拉、气泡确认、进度和折叠面板。
- 13个业务组件、5个复杂组件、6个页面模板。
- 共67项独立、可检索资产。
- 六套页面模板统一支持加载、空、失败、无权限、部分异常和正常状态。
- 统一提供保存成功／失败、删除确认和批量操作结果反馈。

## 完全离线Lucide图标

- 内置Lucide Static 1.43.0完整SVG资源，共2077个SVG文件。
- GIcon直接读取包内图标节点，不依赖CDN或运行时网络。
- 支持57个中文企业场景别名；完整标签索引随包提供。
- ISC许可证与第三方声明保存在licenses目录。

## 资产边界

- `basic`：保持 Element Plus API 习惯的基础封装。
- `business`：企业产品中的复合业务组件。
- `complex`：拓扑、监控、时间线和仪表盘等复杂组件。
- `page-templates`：可直接组合生成产品原型的页面模式。
