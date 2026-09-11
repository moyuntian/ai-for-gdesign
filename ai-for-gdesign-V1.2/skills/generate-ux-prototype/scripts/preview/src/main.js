// 真实工程接入入口（预览不执行此文件；预览由 index.swt.html 加载）
// 依赖：vue@^3.4、vue-router@^4.4、element-plus@^2.13.5、
//       @element-plus/icons-vue@^2.3、dayjs@^1.11、less@^4.2
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

// SWT 主题体系（g-design-enterprise tokens + 皮肤入口）
import './assets/themes/base.css'
// tokens/ 目录由 init.mjs 从 assets 包复制，包含：
//   primitive.css → semantic-light.css → semantic-dark.css
//   component.css → components/*.css → charts.css → code.css
//   element-plus.css（--el-* 桥接，EP 组件自动跟随颜色）
import './assets/themes/tokens/primitive.css'
import './assets/themes/tokens/semantic-light.css'
import './assets/themes/tokens/semantic-dark.css'
import './assets/themes/tokens/component.css'
import './assets/themes/tokens/components/form.css'
import './assets/themes/tokens/components/data.css'
import './assets/themes/tokens/components/overlay.css'
import './assets/themes/tokens/components/feedback.css'
import './assets/themes/tokens/charts.css'
import './assets/themes/tokens/code.css'
import './assets/themes/tokens/element-plus.css'
import './assets/themes/swt-default.css'

// 项目 Less 基础样式（Vite 自动编译 Less）
import './assets/style/base.less'
import './assets/style/theme/dark.less'

// 路由
import router from './router'

import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })
app.use(router)
for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, component)
}
app.mount('#app')
