import '@/style/style.scss'
import "@/style/animation.scss"
import App from '@/App.vue'
import { createApp } from 'vue'
import { router } from "@/router"
import { pinia } from "@/store"
import { plugin } from '@/plugin'
import 'element-plus/dist/index.css'
import '@wangeditor/editor/dist/css/style.css'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(plugin)
app.mount('#app')