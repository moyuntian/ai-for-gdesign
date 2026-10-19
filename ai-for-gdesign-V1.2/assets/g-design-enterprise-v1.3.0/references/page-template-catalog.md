# 页面模板目录

| 模板 | 复杂度 | 场景 |
|---|---|---|
| StandardListPage | 简单 | 标准查询与管理 |
| DeviceManagementPage | 中等 | 设备与资产管理 |
| EditFormPage | 简单 | 新建与编辑 |
| ObjectDetailPage | 中等 | 对象详情和运行状态 |
| TopologyMonitoringPage | 复杂 | 网络、服务依赖监控 |
| AlarmImpactPage | 复杂 | 故障定位与影响分析 |

页面私有内容保留在模板目录；可跨页面复用的能力必须提升至组件层。

所有模板统一接入 PageStateShell，支持 loading、empty、error、forbidden、partial、ready；保存、删除与批量操作反馈由 usePageFeedback 统一提供。
