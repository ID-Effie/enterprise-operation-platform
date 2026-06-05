import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { setupDirectives } from '@/directives'

// 创建 Vue 应用
const app = createApp(App)

app.use(createPinia())
app.use(router)

// 设置自定义指令-权限
setupDirectives(app)

// 挂载到页面里的 #app 节点
app.mount('#app')
