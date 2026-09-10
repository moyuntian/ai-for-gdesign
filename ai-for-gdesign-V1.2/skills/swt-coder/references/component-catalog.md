# 已定义组件目录

## 来源
g-design-enterprise-v1.3.0 组件库，已迁移至 `swt-coder/components/`。

## 使用方式
`--with-components`（默认开启）时，AI 生成页面优先检查本目录是否有匹配的已定义组件：
1. 读取本目录获取组件清单
2. 匹配页面需求 → 直接 import 组件 .vue 文件（CV）
3. 未匹配 → AI 自由编写

## 组件分类

### 布局组件
- Container / Header / Aside / Main / Footer
- Row / Col / Space / Divider

### 表单组件
- Input / InputNumber / Textarea / Select / SelectTree
- Checkbox / Radio / Switch / Slider
- TimePicker / DatePicker / Cascader / ColorPicker
- Upload / Transfer / Form / FormItem

### 展示组件
- Table / Tree / Timeline / Tabs / Steps
- Card / Descriptions / Avatar / Image
- Tag / Badge / Progress / Skeleton / Empty / Result

### 导航组件
- Menu / Breadcrumb / Anchor / Backtop / Affix

### 反馈组件
- Dialog / Drawer / Popconfirm / Tooltip / Popover
- Message / Notification / MessageBox / Loading / Alert

### 图表组件
- LineChart / BarChart / PieChart / AreaChart
- RadarChart / GaugeChart / LiquidfillChart

## 后续扩展
组件源后续可从本地目录切换为云端 URL（预留 `CONFIG.componentsSource` 参数）。
