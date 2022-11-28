<template>
  <div class="post-container">
    <div class="post">
      <div class="content" ref="vhtml">
        <el-skeleton :rows="20" />
      </div>
      <div class="sider" ref="sider">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { request } from '@/axios';
import { usePostStore, useStore } from '@/store';
const router = useRouter()
const store = useStore()
const usePost = usePostStore()
const vhtml = ref({} as HTMLDivElement)
const sider = ref({} as HTMLDivElement)
const loading = ref(true)
onMounted(() => {
  if (!store.currentData && !usePost.currentData) {
    ElMessage.error("加载文章出错")
    router.back()
    return
  }
  if ((!store.currentData) && usePost.currentData) {
    loading.value = false
    vhtml.value.innerHTML = usePost.currenthtmlVal
    return
  }

  request.get("get_post?pid=" + store.currentData.pid,).then(res => {
    usePost.currenthtmlVal = res.data.data.htmlVal
    // console.log('res.data', usePost.currenthtmlVal)
    vhtml.value.innerHTML = usePost.currenthtmlVal
    usePost.currentData = store.currentData
    loading.value = false
  }).catch(res => {
    ElMessage.error("加载文章出错" + res)
    setTimeout(() => {
      router.back()
    }, 1000)
  })



})
onMounted(() => {
  window.onscroll = function (e) {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollTop < 20) {
      sider.value.style.top = "0px"
    } else if (scrollTop >= 20) {
      sider.value.style.top = `${scrollTop - 20}px`

    }
  }

})
</script>

<style lang="scss" scoped>
.post-container {
  margin-top: 80px;
  width: 1200px;
  margin: 80px auto;

  .post {
    height: auto;
    position: relative;
    filter: none;

    >div {
      display: inline-block;
    }

    .content {
      left: 0;
      position: absolute;
      padding: 40px;
      width: 880px;
      background-color: aliceblue;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      min-height: 100vh;
    }

    .sider {
      width: 300px;

      // margin-left: 20px;
      right: 0;
      position: absolute;

      >div {
        width: 300px;
        height: 400px;
        border-radius: 20px;
        background-color: #FFF;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
      }
    }


  }
}
</style>