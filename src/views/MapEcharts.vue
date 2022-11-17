<template>
  <div class="map-container">
    <div class="map" ref="shangshaMap" style="height: 100vh;"></div>
    <div class="info">hhhh</div>
  </div>
</template>

<script setup lang="ts">
import a from "../assets/vue.svg"
import changshaJSON from "../assets/mapJSON/430100.json"
import * as echarts from "echarts"
import { onMounted, ref, h, render, VueElement, shallowRef, onUpdated, onUnmounted } from 'vue'
import { useStore } from "../store"
import axios from "axios"
import { request } from "../axios"
const shangshaMap = ref()
const store = useStore()
let div = document.createElement("div")
onMounted(async () => {
  if (store.post_lights.length === 0) {
    store.load_post_lights().then(res => {
      console.log('res', res)
      init()
    })
  } else {
    init()
  }
})
const init = () => {
  let regions = [
    {
      name: '长沙县',
      itemStyle: {
        areaColor: '#eee',
        opacity: 1,
      },
    },
    {
      name: '望城区',
      itemStyle: {
        areaColor: '#eee',
        opacity: 1,
      },
    },
    {
      name: '浏阳市',
      itemStyle: {
        areaColor: '#eee',
        opacity: 1,
      },
    },
    {
      name: '岳麓区',
      itemStyle: {
        areaColor: '#f7d5af',
        opacity: 1,
      },
    },
    {
      name: '宁乡县',
      itemStyle: {
        areaColor: '#eee',
        opacity: 1,
      },
    },
    {
      name: '开福区',
      itemStyle: {
        areaColor: '#f7d5af',
        opacity: 1,
      },
    },
    {
      name: '雨花区',
      itemStyle: {
        areaColor: '#f7d5af',
        opacity: 1,
      },
    },
    {
      name: '天心区',
      itemStyle: {
        areaColor: '#f7d5af',
        opacity: 1,
      }
    },
    {
      name: '芙蓉区',
      itemStyle: {
        areaColor: '#f7d5af',
        opacity: 1,
      },
    },

  ]

  let option: echarts.EChartsCoreOption = {
    tooltip: {
      show: true,
      formatter: function (param: any) {
        render(h("div", [
          h("span", 1),
          h("span", 2),
          h("span", 3),
          h("span", 4),
          h("img", { src: a }, 5),
        ]), div)

        return `<div>${param.data.name}</div>`
      }

    },
    geo: {
      map: 'changsha',
      roam: true, //是否允许缩放，拖拽
      zoom: 2, //初始化大小
      //缩放大小限制
      scaleLimit: {
        min: 1, //最小
        max: 200, //最大
      },
      //设置中心点
      center: [112.95, 28.19],
      //省份地图添加背景

      itemStyle: {
        areaColor: '#f7d5af',
        color: 'red',
        borderColor: '#fff',
        borderWidth: 1,
      },
      //高亮状态
      emphasis: {
        disabled: true,
        itemStyle: {
          areaColor: '#f7d5af',
          color: '#fff',
        },
      },
      regions: regions,
    },
    //配置属性

    series: {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: store.scatter,
      roam: true,
      showEffectOn: 'render',
      symbol: "image://" + store.symbol,
      rippleEffect: {
        //涟漪特效相关配置
        brushType: 'stroke', //波纹的绘制方式，可选 'stroke' 和 'fill'
      },
      emphasis: { scale: true },
      symbolSize: 30,
      itemStyle: {
        //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时

        color: '#ffffff', //散点的颜色
        shadowBlur: 10,
        shadowColor: 20,
        fontSize: '12px',

      },
      zlevel: 1,
    },
  }

  function drawChina() {
    // const hunanJSOM = (await axios.get("https://geo.datav.aliyun.com/areas_v3/bound/430000_full.json")).data
    var myChart = echarts.init(shangshaMap.value)
    echarts.registerMap('changsha', changshaJSON as any); //注册可用的地图
    myChart.setOption(option)
    myChart.resize({
      width: "auto",
      height: "auto"
    })
    myChart.on("click", 'series', (params) => {
      console.log('params', params)
      store.handleBrief(true, (params.data as any).index, { offsetX: params.event!.offsetX, offsetY: params.event!.offsetY })
    })
    myChart.on("mousedown", "geo", (params) => {
      store.handleBrief(false)
    })
    myChart.on("click", (params) => {
      console.log('params', params)
    })

  }
  drawChina()
}
</script>

<style lang="scss" scoped>
.map-container {
  position: relative;

  .map {
    background-color: #f9f5ee;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
  }

  .info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
}
</style>