<template>
  <Transition name="fromleft">
    <div class="control" v-if="store.isShowControl">
      <div class="ext-btn-wrapper">
        <button class="btn" @click="store.handleControl(false)">
          <svg t="1668439068266" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4484" width="20" height="20">
            <path
              d="M832 0a192 192 0 0 1 192 192v640a192 192 0 0 1-192 192H192a192 192 0 0 1-192-192v-112.576l56.256 56.256c20.544 20.544 45.12 35.2 71.744 44.608V832a64 64 0 0 0 64 64h640c35.392 0 64-28.608 64-64V192a64 64 0 0 0-64-64H192C156.672 128 128 156.672 128 192v11.648c-26.56 9.408-51.136 24-71.744 44.544L0 304.448V192a192 192 0 0 1 192-192h640zM216.512 324.8A64.042667 64.042667 0 0 1 256 383.936V448h192a64 64 0 0 1 64 64c0 35.392-28.608 64-64 64h-192v63.936c0 25.856-15.616 49.28-39.488 59.136a64.213333 64.213333 0 0 1-69.76-13.888l-128-128A63.829333 63.829333 0 0 1 0 511.936c0-16.384 6.272-32.768 18.752-45.248l128-128a64.106667 64.106667 0 0 1 69.76-13.888z"
              fill="" p-id="4485"></path>
          </svg>
        </button>
      </div>
      <el-radio-group v-model="radio">
        <el-radio-button label="高德地图" />
        <el-radio-button label="可视化" />
      </el-radio-group>
    </div>
  </Transition>
  <button v-show="!store.isShowControl" @click="store.handleControl(true)" class="btn show-control">
    <svg t="1668438117273" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="2688" width="20" height="20">
      <path
        d="M170.666667 469.333333h682.666666a42.666667 42.666667 0 0 1 0 85.333334H170.666667a42.666667 42.666667 0 0 1 0-85.333334z m0-298.666666h597.333333a42.666667 42.666667 0 0 1 0 85.333333H170.666667a42.666667 42.666667 0 1 1 0-85.333333z m0 597.333333h512a42.666667 42.666667 0 0 1 0 85.333333H170.666667a42.666667 42.666667 0 0 1 0-85.333333z"
        p-id="2689"></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
const router = useRouter();
const store = useStore();
const radio = ref("可视化");
watch(radio, (nvl) => {
  if (nvl === "高德地图") {
    router.push({
      path: "/amap",
    });
  } else if (nvl === "可视化") {
    router.push({
      path: "/mapecharts",
    });
  }
  store.isShowControl = false;
});

</script>

<style lang="scss" scoped>
.control {
  position: absolute;
  left: 0;
  height: 100vh;
  width: 240px;
  padding: 0 10px;
  z-index: 1005;
  background-color: #fffe;
  display: grid;
  grid-template-rows: 40px repeat(8, 1fr);
  place-items: start center;

  .ext-btn-wrapper {
    width: 100%;
    padding: 10px 0;
    text-align: right;
  }
}

.show-control {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 1002;
}
</style>