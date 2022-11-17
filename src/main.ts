import { createApp } from 'vue'
import './style.scss'
import { router } from "./router"
import { pinia } from "./store"
import App from './App.vue'
import plugin from './plugin'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@wangeditor/editor/dist/css/style.css'
createApp(App).use(router).use(pinia).use(plugin).mount('#app')
