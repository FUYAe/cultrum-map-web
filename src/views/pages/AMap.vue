<template>
  <div class="container" v-loading="showLoading" element-loading-text="加载中资源...">
    <div id="map"></div>
    <Transition name="slide-fade">
      <div class="control" v-show="isShowAmapControl">
        <label for="">显示卫星图层</label>
        <el-switch v-model="showSatellite" size="large" />
        <div class="input-card" style="width:19rem">
          <h4>设置地图显示要素</h4>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="bg">区域面</el-checkbox>
            <el-checkbox label="road">道路</el-checkbox>/>
            <el-checkbox label="building">建筑物</el-checkbox>
            <el-checkbox label="point">标注</el-checkbox>
          </el-checkbox-group>
          <el-checkbox v-model="isShowCurrentTraffic" label="">实时路况</el-checkbox>
        </div>
      </div>
    </Transition>
    <Transition name="slide-fade">
      <button @click="handleAmapControl(!isShowAmapControl)" class="btn amap-btn">

        <svg v-show="!isShowAmapControl" t="1668699147233" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="2684" width="20" height="20">
          <path
            d="M445.2096 0H49.2288C22.20544 0 0.22528 21.97504 0.22528 48.98816V444.9792c0 27.01312 21.98016 48.98816 48.9984 48.98816h395.9808c27.01312 0 48.99328-21.97504 48.99328-48.98816V48.99328C494.20288 21.96992 472.2176 0 445.2096 0z m-16.3328 428.6464H65.55648V65.32096h363.32032V428.6464zM974.7712 0h-395.9808c-27.01824 0-48.99328 21.97504-48.99328 48.98816V444.9792c0 27.01312 21.97504 48.98816 48.99328 48.98816h395.9808c27.01824 0 48.99328-21.97504 48.99328-48.98816V48.99328c0-27.01824-21.97504-48.99328-48.99328-48.99328z m-16.3328 428.6464h-363.32032V65.32096h363.32544V428.6464z m-513.2288 101.38624H49.2288c-27.01824 0-48.9984 21.97504-48.9984 48.99328v395.9808c0 27.01824 21.98016 48.99328 48.9984 48.99328h395.9808c27.01312 0 48.99328-21.98016 48.99328-48.99328v-395.9808c0-27.01824-21.98016-48.99328-48.99328-48.99328z m-16.3328 428.6464H65.55648V595.3536h363.32032v363.32544z m545.8944-428.6464h-395.9808c-27.01824 0-48.99328 21.97504-48.99328 48.99328v395.9808c0 27.01824 21.97504 48.99328 48.99328 48.99328h395.9808c27.01824 0 48.99328-21.98016 48.99328-48.99328v-395.9808c0-27.01824-21.97504-48.99328-48.99328-48.99328z m-16.3328 428.6464h-363.32032V595.3536h363.32544v363.32544z"
            p-id="2685"></path>
        </svg>
        <svg v-show="isShowAmapControl" t="1668482326847" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="13663" width="20" height="20">
          <path
            d="M649.179 512l212.839-212.84c37.881-37.881 37.881-99.298 0-137.179s-99.298-37.881-137.179 0L512 374.821l-212.839-212.84c-37.881-37.881-99.298-37.881-137.179 0s-37.881 99.298 0 137.179L374.821 512 161.982 724.84c-37.881 37.881-37.881 99.297 0 137.179 18.94 18.94 43.765 28.41 68.589 28.41 24.825 0 49.649-9.47 68.589-28.41L512 649.179l212.839 212.84c18.94 18.94 43.765 28.41 68.589 28.41s49.649-9.47 68.59-28.41c37.881-37.882 37.881-99.298 0-137.179L649.179 512z"
            p-id="13664"></path>
        </svg>
      </button>
    </Transition>
  </div>
</template >

<script lang="ts" setup>
import { onMounted, shallowRef, ref, onUpdated, reactive, toRefs, watch } from "vue"
import AMapLoader from '@amap/amap-jsapi-loader';
import "@amap/amap-jsapi-types";
import locpng from "@/assets/location.png"
import { useStore } from "@/store";

const map = shallowRef(null as unknown as AMap.Map);
const thisAMap = ref({} as any)
const store = useStore()
const controlConfig = reactive({
  showSatellite: false,
  isShowAmapControl: false,
  isShowCurrentTraffic: false,
  checkList: ["bg", "point", "building", "road"]
})
const { showSatellite, isShowAmapControl, isShowCurrentTraffic, checkList } = toRefs(controlConfig)
const showLoading = ref(true)
const mapOptions: AMap.MapOptions & { terrain?: boolean } = {
  zooms: [7, 18],
  zoom: 12,
  center: [112.95, 28.19],
  pitch: 60,
  cacheSize: 7,
  mapStyle: 'amap://styles/fresh',
  features: ['bg', 'road', 'building', 'point']
}
async function initAMap() {
  const AMap = await AMapLoader.load({
    key: "a5653ec1767fc1db8bfdb91789e95b64",
    version: "2.0",
    plugins: ['AMap.DistrictSearch']
  });
  thisAMap.value = AMap;
  let district: any = null;
  if (!district) {
    district = new AMap.DistrictSearch({
      extensions: 'all',
      level: 'province'
    });
  }

  district.search("湖南省", function (status: any, result: any) {
    let bounds = result.districtList[0].boundaries;
    let mask = [];
    for (let i = 0; i < bounds.length; i += 1) {
      mask.push([bounds[i]]);
    }
    map.value = new AMap.Map('map', {
      mask: mask,
      ...mapOptions
    });
    map.value.on('complete', function () {
      showLoading.value = false
    })

    let icon = new AMap.Icon({
      size: new AMap.Size(30, 30),
      image: locpng,
      imageSize: new AMap.Size(30, 30)
    });
    for (let s of store.scatter) {
      // console.log("1");
      (new AMap.Marker({
        map: map.value,
        position: new AMap.LngLat(s.value[0], s.value[1]),
        icon: icon,
        title: s.name,
        extData: s
      })).on('click', (params: any) => {
        store.handleBrief(true, params.target._originOpts.extData.index, { offsetX: params.pixel.x, offsetY: params.pixel.y })

      })
    }
    map.value.on('click', (e) => {
      store.handleBrief(false)
    });
    AMap.plugin(['AMap.ToolBar',
      'AMap.Scale',
      'AMap.Geolocation'], function () {
        map.value.addControl(new AMap.Scale());
        map.value.addControl(new AMap.Geolocation());
      });

  });


  return AMap;

}

onMounted(async () => {
  if (store.post_lights.length == 0) {
    await store.load_post_lights()
    await initAMap()
    addWatch()
  } else {
    await initAMap()
    addWatch()
  }
})

let satellite!: any
let currentTraffic: any
const changeMa = (isShow: boolean) => {
  satellite = satellite || new thisAMap.value.TileLayer.Satellite()
  isShow && map.value.add(satellite);
  (!isShow) && map.value.remove(satellite)
}
const changeTra = () => {
  currentTraffic = currentTraffic || new thisAMap.value.TileLayer.Traffic({
    zIndex: 10,
    zooms: [7, 22],
  });
  currentTraffic.setMap(map.value);
}



const handleAmapControl = (isShow: boolean) => {
  isShowAmapControl.value = isShow
}
//绑定checkbox点击事件
const addWatch = () => {
  watch(showSatellite, (nvl) => {
    changeMa(nvl)
  })
  watch(checkList, (nvl) => {
    map.value && map.value.setFeatures(nvl)
  })
  watch(isShowCurrentTraffic, (nvl) => {
    currentTraffic || changeTra()
    nvl && currentTraffic.show();
    !nvl && currentTraffic.hide();
  })
}
</script>

<style lang="scss" scoped>
.container {

  width: 100%;
  height: 100%;
  position: relative;
  z-index: 20;


  #map {
    width: 100%;
    height: 100%;
  }

  .control {
    padding: 10px;
    position: absolute;
    right: 0;
    top: 0;
    background-color: #fffe;
    border-radius: 20px;
    padding: 10px;
    margin: 10px;

  }

  .amap-btn {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
