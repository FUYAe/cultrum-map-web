<template>
  <Teleport to="body">
    <div v-show="store.isShowBrief" ref="briefRef" class="brief-container">
      <div class="close"><button @click="close" class="btn"><svg t="1668673145442" class="icon" viewBox="0 0 1024 1024"
            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3817" width="15" height="15">
            <path
              d="M753.365333 843.861333a64 64 0 0 0 90.496-90.496L602.496 512l241.365333-241.365333a64 64 0 0 0-90.496-90.496L512 421.504 270.634667 180.138667a64 64 0 1 0-90.496 90.496L421.504 512l-241.365333 241.365333a64 64 0 0 0 90.496 90.496L512 602.496l241.365333 241.365333z"
              p-id="3818" fill="#e0620d"></path>
          </svg></button></div>
      <h4>{{ currentData && currentData.name }}</h4>
      <div class="rate">
        <el-rate class="el-rate" v-model="rate" disabled text-color="#ff9900" />
      </div>
      <div>{{ currentData && currentData.fee }}</div>
      <div>{{ currentData && currentData.opentime }}</div>
      <div class="brief">
        <span>{{ currentData && currentData.brief }}</span>
      </div>
      <img :src="currentData && currentData.imgs[0].url1" draggable="false" class="img brief-img" alt="">
      <el-button class="info" style="width:100px" @click="gotoDetail" type="info" plain bg>详情</el-button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, onUnmounted, ref, watch } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
const store = useStore()
const router = useRouter()
const rate = ref(5)
const briefRef = ref({} as HTMLDivElement)
onMounted(() => {
  reLoc()

})
onUpdated(() => {
  reLoc()
})
const { currentData, isShowBrief } = storeToRefs(store)
watch(currentData, () => {

  reLoc()
})
const gotoDetail = () => {

  router.push({
    name: "post",
  })
}
const close = () => {
  store.isShowBrief = false
  store.briefCanMove = false
}
watch(isShowBrief, (nvl) => {
  if (!nvl) {
    store.briefCanMove = false
  }
})
const reLoc = () => {
  if (store.briefCanMove) return
  const style = getComputedStyle(briefRef.value)
  let w = parseFloat(style.width)
  let h = parseFloat(style.height)
  let innerH = window.innerHeight
  let innerW = window.innerWidth
  let locX = 0
  let locY = 0
  const ofY = store.briefLoc.offsetY
  const ofX = store.briefLoc.offsetX
  if (ofX >= innerW / 2) {
    locX = ofX - w - 20
  } else {
    locX = ofX + 20
  }
  if (ofY >= innerH / 2) {
    locY = ofY - h - 20
  } else {
    locY = ofY + 20
  }
  briefRef.value.style.top = `${Math.max(0, locY)}px`
  briefRef.value.style.left = `${Math.max(0, locX)}px`
}
let timer: any;
let time = 0
function onDrag(e: MouseEvent) {
  const container = briefRef.value
  let oddStyle = window.getComputedStyle(container);
  let left = parseFloat(oddStyle.left);
  let right = parseFloat(oddStyle.right);
  let top = parseFloat(oddStyle.top);
  let sX = e.movementX;
  let sY = e.movementY;
  if (left <= -300 && sX < 0) {
    sX = 0;
  }
  if (right <= -1200 && sX > 0) {
    sX = 0;
  }
  container.style.left = `${Math.max(left + sX)}px`;
  container.style.top = `${Math.max(top + sY)}px`;
  timer = setTimeout(() => {
    store.briefCanMove = true
  }, 500)
}

function onMousedown() {
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", onMouseup);

}
function onMouseup() {
  document.removeEventListener("mousemove", onDrag);
  clearTimeout(timer)
}


const makeitMove = () => {
  const dragElement = briefRef.value
  dragElement.addEventListener("mousedown", onMousedown);
};
const clearListener = () => {
  document.removeEventListener("mouseup", onMouseup);
  document.removeEventListener("mousedown", onMousedown);
  document.removeEventListener("mouseup", onMouseup);
};
onMounted(() => {
  makeitMove();
});
onUnmounted(() => {
  clearListener();
  store.briefCanMove = false
});
</script>

<style lang="scss" scoped>
.brief-container:hover {
  cursor: move;
}

.brief-container {
  user-select: none;
  width: 400px;
  height: 300px;
  padding: 10px;
  background-color: #ffffffdd;
  border-radius: 10px;
  position: fixed;
  z-index: 1000;
  display: grid;
  grid-template-rows: 10px 20px 20px 20px 20px 50px auto 30px;

  >div {
    font-size: 13px;
  }

  .close {
    text-align: right;

    button:hover {
      cursor: auto;
    }
  }

  .rate {

    // height: 40px;
    // padding: 6px 0;
    // vertical-align: top;
    // vertical-align: baseline;
    >span {
      display: inline-block;
      padding: 5px;
    }

  }

  .el-rate {
    display: inline-flex;
    align-items: center;
    height: 20px;
  }

  >h4 {
    height: 100%;
    vertical-align: text-top;
    margin: 0;
  }

  .brief {
    span {
      font-size: 12px;
    }
  }

  .brief-img {
    width: 100px;
    height: 100px;
  }

  .info {
    cursor: auto;
  }
}
</style>