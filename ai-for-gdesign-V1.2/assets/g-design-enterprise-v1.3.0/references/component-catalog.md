# G Design Enterprise组件目录

## Basic（43）

| 分类 | 组件 |
|---|---|
| 操作 | GButton、GLink、GIcon（Lucide 1.43.0完全离线） |
| 输入 | GInput、GTextarea、GInputNumber |
| 选择 | GSelect、GCascader、GTreeSelect、GCheckbox、GRadio、GSwitch |
| 日期时间 | GDatePicker、GTimePicker |
| 标记提示 | GTag、GBadge、GTooltip |
| 浮层 | GDialog、GDrawer、GPopover |
| 表单数据 | GForm、GTable、GPagination、GTabs |
| 导航 | GMenu、GBreadcrumb、GSteps |
| 系统反馈 | GAlert、GMessage、GNotification |
| 页面状态 | GEmpty、GSkeleton、GLoading、GResult |
| 高频能力 | GUpload、GTransfer、GTree、GTreeV2、GAutocomplete、GDropdown、GPopconfirm、GProgress、GCollapse |

## Business（13）

GSearchBar、GStatusTag、GMetricCard、GDataTablePro、GPageHeader、GFilterBar、GAdvancedFilter、GTableToolbar、GBatchActionBar、GDescriptionPanel、GFormSection、GResourceTree、GPermissionState。

## Complex（5）

GTopology、GAlarmTopology、GTimelinePro、GMonitorPanel、GDashboardGrid。

AI应先读取组件目录的metadata.json，再决定是否加载实现。简单关系不用拓扑，常规表格能够承载时不调用高级表格。
