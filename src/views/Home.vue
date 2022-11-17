<template>
  <div class="home-container">
    <Transition name="slide-fade-left">
      <div class="left" v-if="!useSession.istoleft"></div>
    </Transition>
    <Transition name="slide-fade-right">
      <div v-if="!useSession.istoright" class="right"></div>
    </Transition>
    <div class="opendoor" v-show="!useSession.istoleft"><button @click="openDoor">
        <h1>点击开门</h1>
      </button></div>
    <Transition name="fromleft">
      <div class="control" v-if="isShowControl">
        <div class="out-btn"><button class="btn" @click="handleControl(false)"><svg t="1668439068266" class="icon"
              viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4484" width="20"
              height="20">
              <path
                d="M832 0a192 192 0 0 1 192 192v640a192 192 0 0 1-192 192H192a192 192 0 0 1-192-192v-112.576l56.256 56.256c20.544 20.544 45.12 35.2 71.744 44.608V832a64 64 0 0 0 64 64h640c35.392 0 64-28.608 64-64V192a64 64 0 0 0-64-64H192C156.672 128 128 156.672 128 192v11.648c-26.56 9.408-51.136 24-71.744 44.544L0 304.448V192a192 192 0 0 1 192-192h640zM216.512 324.8A64.042667 64.042667 0 0 1 256 383.936V448h192a64 64 0 0 1 64 64c0 35.392-28.608 64-64 64h-192v63.936c0 25.856-15.616 49.28-39.488 59.136a64.213333 64.213333 0 0 1-69.76-13.888l-128-128A63.829333 63.829333 0 0 1 0 511.936c0-16.384 6.272-32.768 18.752-45.248l128-128a64.106667 64.106667 0 0 1 69.76-13.888z"
                fill="" p-id="4485"></path>
            </svg></button></div>
        <el-radio-group v-model="radio">
          <el-radio-button label="高德地图" />
          <el-radio-button label="可视化" />
        </el-radio-group>
      </div>
    </Transition>

    <router-view @click="handleControl(false)" v-slot="{ Component }">
      <transition name="MainFade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <button v-show="!isShowControl" @click="handleControl(true)" class="btn show-control">

      <svg t="1668438117273" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2688" width="20" height="20">
        <path
          d="M170.666667 469.333333h682.666666a42.666667 42.666667 0 0 1 0 85.333334H170.666667a42.666667 42.666667 0 0 1 0-85.333334z m0-298.666666h597.333333a42.666667 42.666667 0 0 1 0 85.333333H170.666667a42.666667 42.666667 0 1 1 0-85.333333z m0 597.333333h512a42.666667 42.666667 0 0 1 0 85.333333H170.666667a42.666667 42.666667 0 0 1 0-85.333333z"
          p-id="2689"></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useRouter } from "vue-router"
import { request } from '../axios';
import { useStore, useSessionStroe } from '../store';
import 'animate.css'
const router = useRouter()
const store = useStore()
const useSession = useSessionStroe()
const isShowControl = ref(false)
const radio = ref("可视化")
onMounted(async () => {

})
watch(radio, (nvl) => {
  if (nvl === "高德地图") {
    router.push({
      path: "/amap"
    })
  } else if (nvl === "可视化") {
    router.push({
      path: "/mapecharts"
    })
  }
  isShowControl.value = false
})
const handleControl = (isShow: boolean) => {
  isShowControl.value = isShow
}
const openDoor = () => {
  useSession.istoleft = true
  useSession.istoright = true
}
</script>

<style lang="scss" scoped>
.slide-fade-left-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-left-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-left-enter-from,
.slide-fade-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-fade-right-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-right-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-right-enter-from,
.slide-fade-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f9f5ee;

  .left {
    position: fixed;
    width: 50vw;
    left: 0;
    height: 100vh;
    z-index: 2000;
    background-color: #777a;
    animation: all 5s ease-out;

  }

  .right {
    position: fixed;
    width: 50vw;
    right: 0;
    height: 100vh;
    z-index: 2000;
    background-color: #6669;
    animation: all 5s ease-out;
  }

  .opendoor {
    position: fixed;
    width: 100vw;
    z-index: 2001;
    height: 100vh;

    button {
      margin: 0 auto;
      width: 100%;
      background: transparent;
      position: absolute;
      top: 50%;
      left: 50%;
      border: none;
      transform: translate(-50%, -50%);


    }
  }

  .to-left {
    transform: translateX(-100%);
    // left: -50vw;
    animation: all 5s ease-out;
  }

  .to-right {
    transform: translateX(100%);
    animation: all 5s ease-out;
  }

  .fromleft-enter-active,
  .fromleft-leave-active {
    transition: all 0.5s ease;
  }

  .fromleft-enter-from,
  .fromleft-leave-to {
    opacity: 0;
    transform: translateX(-400px);
  }

  .MainFade-enter-from,
  .MainFade-leave-to {
    opacity: 0;
  }

  .MainFade-enter-to,
  .MainFade-leave-from {
    opacity: 1;
  }

  .MainFade-enter-active,
  .MainFade-leave-active {
    transition: opacity 500ms;
  }

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


    .out-btn {
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
}
</style>