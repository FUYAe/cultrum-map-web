<template>
  <div class="echart-container">
    <div class="map" ref="changshaMap" style="height: 100vh;"></div>
    <div class="button-info">
      <span>JIAN</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import changshaJSON from "@/assets/mapJSON/430100.json"
import * as echarts from "echarts"
import { onMounted, ref } from 'vue'
import { useStore } from "@/store"

const changshaMap = ref()
const store = useStore()
onMounted(async () => {
  if (store.post_lights.length === 0) {
    store.load_post_lights().then(res => {
      initEchart()
    })
  } else {
    initEchart()
  }
})
const initEchart = () => {
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
        return `<div>${param.data.name}</div>`
      }

    },
    geo: {
      map: 'changsha',
      roam: true, //是否允许缩放，拖拽
      zoom: 1, //初始化大小
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
      type: 'scatter',
      coordinateSystem: 'geo',
      data: store.scatter,
      roam: true,
      showEffectOn: 'render',
      symbol: "image://" + store.symbol,
      emphasis: { scale: true },
      symbolSize: 30,
      itemStyle: {
        //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时

        color: '#454545', //散点的颜色
        shadowBlur: 10,
        shadowColor: 20,
        fontSize: '12px',

      },
      zlevel: 1,
    },
  }

  var chart = echarts.init(changshaMap.value)
  echarts.registerMap('changsha', changshaJSON as any); //注册可用的地图
  chart.setOption(option)


  window.addEventListener("resize", () => {
    chart.resize();
  })
  chart.on("click", 'series', (params) => {
    store.handleBrief(true, (params.data as any).index, { offsetX: params.event!.offsetX, offsetY: params.event!.offsetY })
  })
  chart.on("mousedown", "geo", (params) => {
    store.handleBrief(false)
  })




}
</script>

<style lang="scss" scoped>
.echart-container {
  position: relative;

  .map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
  }

  .button-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    padding: 80px;
  }
}
</style>