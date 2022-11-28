import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { useStore, pinia } from "../store"

const routes: RouteRecordRaw[] = [
  {
    path: "/", component: () => import("../views/Home.vue"), redirect: "/mapecharts", children: [
      { path: "/amap", name: "amap", component: () => import("../views/pages/AMap.vue") },
      { path: "/mapecharts", name: "mapecharts", component: () => import("../views/pages/MapEcharts.vue") },
    ]
  },
  { path: "/editor", name: "editor", component: () => import("../views/editor/Editor.vue") },
  {
    path: "/info", name: "info", component: () => import("../views/pages/InfoWrapper.vue"), children: [
      { path: "/post", name: "post", component: () => import("../views/pages/Post.vue") },
      { path: "/previewpost", name: "previewpost", component: () => import("../views/editor/PreviewPost.vue") },
    ]
  },
  { path: "/:catchAll(.*)", component: () => import("../views/Error.vue") },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const store = useStore(pinia)
  store.isShowBrief = false
  next()

})
export { router }