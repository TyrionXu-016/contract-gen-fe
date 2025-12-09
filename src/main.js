// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

// 导入全局样式（如果需要）
import './assets/main.css'

const app = createApp(App)

// 配置Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// 配置路由
app.use(router)

app.mount('#app')
