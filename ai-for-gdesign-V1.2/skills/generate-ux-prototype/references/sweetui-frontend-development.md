---
name: sweetui-frontend-development
description: 基于SweetUI组件库开发前端页面和组件的技能指南。涵盖150+组件的使用方法、代码模板、最佳实践，帮助Agent快速生成符合SweetUI规范的前端代码。
language: vue3
---

# SweetUI 前端开发指南

## 概述

SweetUI 是一个基于 Vue 3 的企业级组件库，提供 150+ 个高质量组件，适用于中后台系统开发。组件遵循一致的 API 设计和 TypeScript 类型支持。

### 组件命名规范

- **组件前缀**: 所有组件使用 `sweet-` 前缀
- **示例**: `sweet-button`, `sweet-input`, `sweet-form`
- **导入方式**: 全量导入或按需导入

### 项目目录结构

```
src/
├── components/          # 业务组件
│   └── YourComponent/
│       └── index.vue
├── views/               # 页面组件
├── composables/         # 组合式函数
├── types/               # 类型定义
└── utils/               # 工具函数
```

---

## 组件分类速查

### 表单组件 (Form Components)

| 组件     | 说明             | 组件名               |
| -------- | ---------------- | -------------------- |
| 输入框   | 文本输入         | `sweet-input`        |
| 数字输入 | 数值输入         | `sweet-input-number` |
| 多行文本 | 文本域           | `sweet-textarea`     |
| 下拉选择 | 单选/多选        | `sweet-select`       |
| 树形选择 | 树形数据结构选择 | `sweet-select-tree`  |
| 复选框   | 多选             | `sweet-checkbox`     |
| 单选框   | 单选             | `sweet-radio`        |
| 开关     | 布尔切换         | `sweet-switch`       |
| 滑块     | 数值范围选择     | `sweet-slider`       |
| 时间选择 | 时间选择器       | `sweet-time-picker`  |
| 日期选择 | 日期选择器       | `sweet-date-picker`  |
| 级联选择 | 多级联动选择     | `sweet-cascader`     |
| 颜色选择 | 颜色选择器       | `sweet-color-picker` |
| 上传     | 文件上传         | `sweet-upload`       |
| 穿梭框   | 双向选择         | `sweet-transfer`     |
| 表单     | 表单容器         | `sweet-form`         |
| 表单项   | 表单项           | `sweet-form-item`    |

### 布局组件 (Layout Components)

| 组件   | 说明         | 组件名                    |
| ------ | ------------ | ------------------------- |
| 容器   | 整体布局容器 | `sweet-container`         |
| 头部   | 页面头部     | `sweet-header`            |
| 侧边栏 | 侧边导航     | `sweet-aside`             |
| 主体   | 主内容区     | `sweet-main`              |
| 底部   | 页面底部     | `sweet-footer`            |
| 栅格   | 24栏栅格系统 | `sweet-row` / `sweet-col` |
| 间距   | 元素间距     | `sweet-space`             |
| 分割线 | 内容分割     | `sweet-divider`           |

### 展示组件 (Display Components)

| 组件     | 说明       | 组件名               |
| -------- | ---------- | -------------------- |
| 表格     | 数据表格   | `sweet-table`        |
| 树形控件 | 树形展示   | `sweet-tree`         |
| 时间线   | 时间轴     | `sweet-timeline`     |
| 标签页   | 切换面板   | `sweet-tabs`         |
| 步骤条   | 步骤指示   | `sweet-steps`        |
| 卡片     | 卡片容器   | `sweet-card`         |
| 描述列表 | 键值对展示 | `sweet-descriptions` |
| 头像     | 用户头像   | `sweet-avatar`       |
| 图片     | 图片展示   | `sweet-image`        |
| 标签     | 内容标记   | `sweet-tag`          |
| 徽标     | 数量徽标   | `sweet-badge`        |
| 进度条   | 进度指示   | `sweet-progress`     |
| 骨架屏   | 加载占位   | `sweet-skeleton`     |
| 空状态   | 空数据提示 | `sweet-empty`        |
| 结果页   | 操作结果   | `sweet-result`       |

### 导航组件 (Navigation Components)

| 组件     | 说明     | 组件名             |
| -------- | -------- | ------------------ |
| 菜单     | 导航菜单 | `sweet-menu`       |
| 面包屑   | 路径导航 | `sweet-breadcrumb` |
| 锚点     | 页面锚点 | `sweet-anchor`     |
| 返回顶部 | 返回顶部 | `sweet-backtop`    |
| 固定     | 固定定位 | `sweet-affix`      |

### 反馈组件 (Feedback Components)

| 组件     | 说明       | 组件名               |
| -------- | ---------- | -------------------- |
| 对话框   | 模态窗口   | `sweet-dialog`       |
| 抽屉     | 侧边抽屉   | `sweet-drawer`       |
| 气泡确认 | 确认提示   | `sweet-popconfirm`   |
| 工具提示 | 悬浮提示   | `sweet-tooltip`      |
| 弹出框   | 弹出层     | `sweet-popover`      |
| 消息提示 | 顶部消息   | `sweet-message`      |
| 通知     | 通知提醒   | `sweet-notification` |
| 消息框   | 确认对话框 | `sweet-message-box`  |
| 加载     | 加载状态   | `sweet-loading`      |
| 警告     | 警告提示   | `sweet-alert`        |

### 图表组件 (Chart Components)

| 组件   | 说明     | 组件名                   |
| ------ | -------- | ------------------------ |
| 折线图 | 折线趋势 | `sweet-line-chart`       |
| 柱状图 | 柱状对比 | `sweet-bar-chart`        |
| 饼图   | 占比分布 | `sweet-pie-chart`        |
| 面积图 | 面积趋势 | `sweet-area-chart`       |
| 雷达图 | 雷达分析 | `sweet-radar-chart`      |
| 仪表盘 | 仪表盘   | `sweet-gauge-chart`      |
| 水球图 | 水球展示 | `sweet-liquidfill-chart` |

---

## 常用代码模板

### 1. 表单页面模板

```vue
<template>
  <sweet-card>
    <sweet-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
    >
      <!-- 文本输入 -->
      <sweet-form-item label="用户名" prop="username">
        <sweet-input v-model="formData.username" placeholder="请输入用户名" />
      </sweet-form-item>

      <!-- 密码输入 -->
      <sweet-form-item label="密码" prop="password">
        <sweet-input
          v-model="formData.password"
          type="password"
          show-password
          placeholder="请输入密码"
        />
      </sweet-form-item>

      <!-- 下拉选择 -->
      <sweet-form-item label="角色" prop="role">
        <sweet-select v-model="formData.role" placeholder="请选择角色">
          <sweet-option label="管理员" value="admin" />
          <sweet-option label="普通用户" value="user" />
        </sweet-select>
      </sweet-form-item>

      <!-- 日期选择 -->
      <sweet-form-item label="创建时间" prop="createTime">
        <sweet-date-picker
          v-model="formData.createTime"
          type="datetime"
          placeholder="选择日期时间"
        />
      </sweet-form-item>

      <!-- 开关 -->
      <sweet-form-item label="状态" prop="enabled">
        <sweet-switch v-model="formData.enabled" />
      </sweet-form-item>

      <!-- 多选 -->
      <sweet-form-item label="权限" prop="permissions">
        <sweet-checkbox-group v-model="formData.permissions">
          <sweet-checkbox label="read">读取</sweet-checkbox>
          <sweet-checkbox label="write">写入</sweet-checkbox>
          <sweet-checkbox label="delete">删除</sweet-checkbox>
        </sweet-checkbox-group>
      </sweet-form-item>

      <!-- 文本域 -->
      <sweet-form-item label="备注" prop="remark">
        <sweet-textarea
          v-model="formData.remark"
          :rows="3"
          placeholder="请输入备注"
        />
      </sweet-form-item>

      <!-- 按钮组 -->
      <sweet-form-item>
        <sweet-button @click="handleReset">重置</sweet-button>
        <sweet-button type="primary" :loading="loading" @click="handleSubmit">
          提交
        </sweet-button>
      </sweet-form-item>
    </sweet-form>
  </sweet-card>
</template>

<script setup>
import { reactive, ref } from "vue";

const formRef = ref(null);
const loading = ref(false);

const formData = reactive({
  username: "",
  password: "",
  role: "",
  createTime: "",
  enabled: true,
  permissions: [],
  remark: "",
});

const formRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度至少 6 位", trigger: "blur" },
  ],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    loading.value = true;

    // 提交表单
    console.log("提交数据:", formData);
  } catch (error) {
    console.error("表单验证失败:", error);
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  formRef.value?.resetFields();
};
</script>
```

### 2. 表格页面模板

```vue
<template>
  <div class="table-page">
    <!-- 搜索区域 -->
    <sweet-card class="search-card">
      <sweet-form :model="searchForm" inline>
        <sweet-form-item label="用户名">
          <sweet-input
            v-model="searchForm.username"
            placeholder="请输入用户名"
            clearable
          />
        </sweet-form-item>
        <sweet-form-item label="状态">
          <sweet-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
          >
            <sweet-option label="启用" value="enabled" />
            <sweet-option label="禁用" value="disabled" />
          </sweet-select>
        </sweet-form-item>
        <sweet-form-item>
          <sweet-button type="primary" @click="handleSearch">查询</sweet-button>
          <sweet-button @click="handleReset">重置</sweet-button>
        </sweet-form-item>
      </sweet-form>
    </sweet-card>

    <!-- 表格区域 -->
    <sweet-card>
      <!-- 工具栏 -->
      <div class="table-toolbar">
        <sweet-button type="primary" @click="handleAdd">新增</sweet-button>
        <sweet-button
          type="danger"
          :disabled="!selectedRows.length"
          @click="handleBatchDelete"
        >
          批量删除
        </sweet-button>
      </div>

      <!-- 表格 -->
      <sweet-table
        v-model:selection="selectedRows"
        :data="tableData"
        :loading="loading"
        stripe
        border
        @selection-change="handleSelectionChange"
      >
        <sweet-table-column type="selection" width="55" />
        <sweet-table-column prop="id" label="ID" width="80" />
        <sweet-table-column prop="username" label="用户名" min-width="120" />
        <sweet-table-column prop="email" label="邮箱" min-width="180" />
        <sweet-table-column prop="role" label="角色" width="100" />
        <sweet-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <sweet-tag :type="row.status === 'enabled' ? 'success' : 'info'">
              {{ row.status === "enabled" ? "启用" : "禁用" }}
            </sweet-tag>
          </template>
        </sweet-table-column>
        <sweet-table-column prop="createTime" label="创建时间" width="180" />
        <sweet-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <sweet-button type="primary" link @click="handleEdit(row)"
              >编辑</sweet-button
            >
            <sweet-button type="danger" link @click="handleDelete(row)"
              >删除</sweet-button
            >
          </template>
        </sweet-table-column>
      </sweet-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <sweet-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.size"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </sweet-card>

    <!-- 编辑对话框 -->
    <sweet-dialog v-model="dialogVisible" :title="dialogTitle" width="600px">
      <sweet-form :model="editForm" label-width="80px">
        <sweet-form-item label="用户名">
          <sweet-input v-model="editForm.username" />
        </sweet-form-item>
        <sweet-form-item label="邮箱">
          <sweet-input v-model="editForm.email" />
        </sweet-form-item>
      </sweet-form>
      <template #footer>
        <sweet-button @click="dialogVisible = false">取消</sweet-button>
        <sweet-button type="primary" @click="handleConfirm">确定</sweet-button>
      </template>
    </sweet-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// 搜索表单
const searchForm = reactive({
  username: "",
  status: "",
});

// 表格数据
const loading = ref(false);
const tableData = ref([]);
const selectedRows = ref([]);

// 分页
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0,
});

// 对话框
const dialogVisible = ref(false);
const dialogTitle = ref("新增");
const editForm = reactive({
  id: "",
  username: "",
  email: "",
});

// 查询
const handleSearch = () => {
  pagination.page = 1;
  fetchData();
};

// 重置
const handleReset = () => {
  searchForm.username = "";
  searchForm.status = "";
  handleSearch();
};

// 获取数据
const fetchData = async () => {
  loading.value = true;
  // 模拟API调用
  setTimeout(() => {
    tableData.value = [];
    pagination.total = 0;
    loading.value = false;
  }, 500);
};

// 分页变化
const handleSizeChange = (size) => {
  pagination.size = size;
  fetchData();
};

const handleCurrentChange = (page) => {
  pagination.page = page;
  fetchData();
};

// 选择变化
const handleSelectionChange = (rows) => {
  selectedRows.value = rows;
};

// 操作
const handleAdd = () => {
  dialogTitle.value = "新增";
  editForm.id = "";
  editForm.username = "";
  editForm.email = "";
  dialogVisible.value = true;
};

const handleEdit = (row) => {
  dialogTitle.value = "编辑";
  Object.assign(editForm, row);
  dialogVisible.value = true;
};

const handleDelete = (row) => {
  // 删除确认
  console.log("删除:", row);
};

const handleBatchDelete = () => {
  console.log("批量删除:", selectedRows.value);
};

const handleConfirm = () => {
  dialogVisible.value = false;
  fetchData();
};
</script>

<style scoped>
.table-page {
  padding: 16px;
}

.search-card {
  margin-bottom: 16px;
}

.table-toolbar {
  margin-bottom: 16px;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
```

### 3. 页面布局模板

```vue
<template>
  <sweet-container class="layout-container">
    <sweet-header class="layout-header">
      <div class="header-content">
        <div class="logo">系统名称</div>
        <sweet-menu mode="horizontal" :default-active="activeMenu">
          <sweet-menu-item index="1">首页</sweet-menu-item>
          <sweet-menu-item index="2">管理</sweet-menu-item>
        </sweet-menu>
      </div>
    </sweet-header>

    <sweet-container>
      <sweet-aside width="200px" class="layout-aside">
        <sweet-menu :default-active="activeMenu" :collapse="collapsed">
          <sweet-menu-item index="1">
            <sweet-icon name="home" />
            <span>首页</span>
          </sweet-menu-item>
          <sweet-submenu index="2">
            <template #title>
              <sweet-icon name="folder" />
              <span>系统管理</span>
            </template>
            <sweet-menu-item index="2-1">用户管理</sweet-menu-item>
            <sweet-menu-item index="2-2">角色管理</sweet-menu-item>
          </sweet-submenu>
        </sweet-menu>
      </sweet-aside>

      <sweet-main class="layout-main">
        <!-- 面包屑 -->
        <sweet-breadcrumb separator="/" class="breadcrumb">
          <sweet-breadcrumb-item>首页</sweet-breadcrumb-item>
          <sweet-breadcrumb-item>系统管理</sweet-breadcrumb-item>
          <sweet-breadcrumb-item>用户管理</sweet-breadcrumb-item>
        </sweet-breadcrumb>

        <!-- 页面内容 -->
        <div class="page-content">
          <router-view />
        </div>
      </sweet-main>
    </sweet-container>
  </sweet-container>
</template>

<script setup>
import { ref } from "vue";

const collapsed = ref(false);
const activeMenu = ref("1");
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.layout-header {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.logo {
  width: 200px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.layout-aside {
  background: #001529;
}

.layout-main {
  background: #f0f2f5;
  padding: 16px;
}

.breadcrumb {
  margin-bottom: 16px;
}

.page-content {
  background: #fff;
  border-radius: 4px;
  padding: 16px;
  min-height: calc(100vh - 180px);
}
</style>
```

### 4. 弹窗/抽屉模板

```vue
<template>
  <!-- 对话框 -->
  <sweet-dialog
    v-model="dialogVisible"
    title="编辑用户"
    width="500px"
    :close-on-click-modal="false"
  >
    <sweet-form :model="formData" label-width="80px">
      <sweet-form-item label="用户名">
        <sweet-input v-model="formData.username" />
      </sweet-form-item>
    </sweet-form>

    <template #footer>
      <sweet-button @click="dialogVisible = false">取消</sweet-button>
      <sweet-button type="primary" @click="handleConfirm">确定</sweet-button>
    </template>
  </sweet-dialog>

  <!-- 抽屉 -->
  <sweet-drawer v-model="drawerVisible" title="详情" direction="rtl" size="50%">
    <sweet-descriptions :column="1" border>
      <sweet-descriptions-item label="用户名">{{
        detailData.username
      }}</sweet-descriptions-item>
      <sweet-descriptions-item label="邮箱">{{
        detailData.email
      }}</sweet-descriptions-item>
    </sweet-descriptions>
  </sweet-drawer>

  <!-- 确认对话框 -->
  <sweet-message-box
    v-model="confirmVisible"
    title="确认删除"
    message="确定要删除该记录吗？"
    type="warning"
    @confirm="handleDelete"
  />
</template>

<script setup>
import { reactive, ref } from "vue";

// 对话框
const dialogVisible = ref(false);
const formData = reactive({
  username: "",
  email: "",
});

// 抽屉
const drawerVisible = ref(false);
const detailData = reactive({
  username: "",
  email: "",
});

// 确认框
const confirmVisible = ref(false);

const handleConfirm = () => {
  dialogVisible.value = false;
};

const handleDelete = () => {
  console.log("确认删除");
};
</script>
```

### 5. 消息提示模板

```vue
<script setup>
import { SweetMessageBox } from "@hw-seq/sweet-ui-base";
import { getCurrentInstance} from "vue";
const { $sweetNotify } = getCurrentInstance().proxy

// 消息提示
const showMessage = () => {
  SweetMessageBox.success("操作成功");
  SweetMessageBox.error("操作失败");
  SweetMessageBox.warning("警告信息");
  SweetMessageBox.info("提示信息");
};

// 通知
const showNotification = () => {
  $sweetNotify({
    title: "提示",
    message: "这是一条通知消息",
    type: "success",
  });
};

// 确认框
const showConfirm = async () => {
  try {
    await SweetMessageBox.confirm("确定要执行此操作吗？", "提示");
    console.log("用户确认");
  } catch {
    console.log("用户取消");
  }
};

</script>
```

---


### useNamespace - 命名空间
模板代码如下，在根组件用sweet-config-provider包裹，配置命名空间，支持el和sweet两种：

```vue
<sweet-config-provider namespace="sweet">
    <router-view></router-view>
  </sweet-config-provider>
```
---


### 组件引入

模板代码如下，引入组件库和样式文件，并进行国际化和主题配置：

```typescript
import sweetUIBase from '@hw-seq/sweet-ui-base';
import '@hw-seq/sweet-ui-base/theme-chalk/index.css';
import App from './App.vue';

const app = createApp(App);
const language = 'zh_CN';
sweetUIBase.i18n(language, app);
sweetUIBase.setTheme('light', app);
app.use(sweetUIBase);
app.mount('#app');

```

---


### 响应式设计

```scss
.sweet-container {
  // 默认移动端
  width: 100%;

  // 平板及以上
  @media (min-width: 768px) {
    width: 720px;
  }

  // 桌面及以上
  @media (min-width: 1024px) {
    width: 960px;
  }
}
```

---

## 最佳实践

### 1. 按需引入

```typescript
// 推荐：按需引入
import { SweetButton, SweetInput } from "@hw-seq/sweet-ui-base";

// 或使用自动导入插件
```

### 2. v-model 使用

```vue
<!-- 双向绑定 -->
<sweet-input v-model="value" />
<sweet-switch v-model="checked" />

<!-- 多选绑定 -->
<sweet-checkbox-group v-model="checkedList" />
<sweet-select v-model="selected" multiple />
```

### 3. 表单验证

```typescript
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  age: [
    { required: true, message: "请输入年龄", trigger: "change" },
    {
      type: "number",
      min: 18,
      max: 100,
      message: "年龄在 18 到 100 之间",
      trigger: "change",
    },
  ],
};
```

### 4. 事件处理

```vue
<template>
  <!-- 使用简写 -->
  <sweet-button @click="handleClick">点击</sweet-button>

  <!-- 完整写法 -->
  <sweet-button @click="(e) => handleClick(e)">点击</sweet-button>

  <!-- 修饰符 -->
  <sweet-input v-model="value" @change="handleChange" />
</template>
```

### 5. 插槽使用

```vue
<sweet-dialog>
  <!-- 默认插槽 -->
  <div>对话框内容</div>
  
  <!-- 命名插槽 -->
  <template #header>
    <div class="custom-header">自定义标题</div>
  </template>
  
  <template #footer>
    <sweet-button @click="handleClose">关闭</sweet-button>
  </template>
</sweet-dialog>
```

---

## 常见场景速查

| 场景     | 组件组合                    | 代码模式          |
| -------- | --------------------------- | ----------------- |
| 登录页面 | Form + Input + Button       | 参见表单模板      |
| 用户列表 | Table + Pagination + Dialog | 参见表格模板      |
| 详情页   | Descriptions + Drawer       | 参见抽屉模板      |
| 树形展示 | Tree + Button + Dialog      | 树操作按钮 + 弹窗 |
| 文件上传 | Upload + Progress + Dialog  | 上传+进度+预览    |
| 数据筛选 | Form + Table                | 搜索表单 + 表格   |
| 步骤流程 | Steps + Form + Dialog       | 步骤条引导表单    |
| 批量操作 | Table(selection) + Button   | 多选 + 批量按钮   |

---


---

## 开发工作流程

1. **分析需求** - 确定页面功能和组件需求
2. **选择组件** - 根据组件分类速查表选择合适组件
3. **参考模板** - 使用对应的代码模板
4. **定制开发** - 修改模板代码适应具体需求
5. **样式调整** - 使用CSS变量和响应式设计
6. **测试验证** - 确保组件交互正常