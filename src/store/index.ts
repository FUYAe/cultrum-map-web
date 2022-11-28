import { createPinia, defineStore } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import type { ECharts } from "echarts";
import { request } from "../axios";
import { base64 } from "./base64";
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const usePostStore = defineStore("post", {
  persist: true,
  state: () => {
    return {
      post: {
        name: "",
        loc: "",
        title: "",
        longitude: "",
        latitude: "",
        brief: "",
        rate: 3,
        htmlVal: "<p>hello</p>",
        fee: "",
        opentime: "",
        viewtype: "",
        imgs: [] as {
          alt: string,
          name: string,
          size: number,
          url: string,
          href: string,

        }[]
      },
      currenthtmlVal: "",
      currentData: null as unknown as PostLight,
    }
  },
})
const useStore = defineStore("main", {
  state: () => {
    return {
      homeloading: true,
      amapSymbol: base64.amapSymbol,
      symbol: base64.symbol,
      scatter: [] as Scatter[],
      isShowBrief: false,
      post_lights: [] as PostLight[],
      briefLoc: { offsetX: 80, offsetY: 10 },
      briefCanMove: false,
      currentData: null as unknown as PostLight,
      myChart: null as unknown as ECharts,
      isShowControl: false
    }
  },
  actions: {
    handleBrief(isShow: boolean, index?: number, options?: { offsetX: number, offsetY: number }) {
      if (options && isShow && !this.briefCanMove) {
        const { offsetX, offsetY } = options
        this.briefLoc.offsetX = offsetX
        this.briefLoc.offsetY = offsetY
      }
      if (isShow) {
        this.currentData = this.post_lights[Number(index)]
      }
      if (this.briefCanMove) return
      this.isShowBrief = isShow
    },
    async load_post_lights() {
      return request.get("/get_light_posts").then(res => {
        let light_posts: PostLight[] = res.data.data
        this.post_lights = light_posts
        for (let i in light_posts) {
          let post = light_posts[i]
          this.scatter.push({
            name: post.name,
            value: [
              post.longitude, post.latitude
            ],
            pid: post.pid,
            index: i
          })
        }
        return this.scatter

      }).catch(err => {
        console.log('err', err)
      })
    },
    handleControl(isShow: boolean) {
      this.isShowControl = isShow;
    }
  }
})
const useSessionStroe = defineStore("sessionStorage", {
  persist: {
    storage: sessionStorage,
  },
  state: () => {
    return {
      istoleft: false,
      istoright: false,
    }
  }
})

export { usePostStore, useStore, useSessionStroe, pinia }