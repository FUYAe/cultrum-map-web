import type { App } from "vue"
import { } from "vue-router"
import { router } from "../router"
export default {
  install(app: App) {
    app.directive("back", {
      created(el, binding, vnode, prevVnode) {
        (el as HTMLButtonElement).addEventListener("click", () => {
          binding.value.back()
        })
      }
    })
  }
}