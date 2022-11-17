import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { useStore, pinia } from "../store"
import { request } from "../axios"
import { tr } from "element-plus/es/locale"
const routes: RouteRecordRaw[] = [
  {
    path: "/", component: () => import("../views/Home.vue"), redirect: "/mapecharts", children: [
      { path: "/amap", component: () => import("../views/AMap.vue") },
      { path: "/mapecharts", component: () => import("../views/MapEcharts.vue") },
    ]
  },
  { path: "/editor", component: () => import("../views/Editor.vue") },
  { path: "/post", component: () => import("../views/Post.vue") },
  { path: "/previewpost", component: () => import("../views/PreviewPost.vue") },
  { path: "/error", component: () => import("../views/Error.vue") },
  { path: "/:catchAll(.*)", component: () => import("../views/Error.vue") },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from) => {
  const store = useStore(pinia)
  store.handleBrief(false)

})
export { router }