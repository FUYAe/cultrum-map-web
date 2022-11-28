import type { App } from "vue"
export const plugin = {
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