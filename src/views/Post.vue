<template>
  <div class="post-container">
    <div> <button v-back="router" class="btn post-back-btn"> <svg t="1668502402322" class="icon" viewBox="0 0 1024 1024"
          version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2960" width="20" height="20">
          <path d="M952 568H309c-30.93 0-56-25.07-56-56s25.07-56 56-56h643c30.93 0 56 25.07 56 56s-25.07 56-56 56z"
            fill="#2E91E5" p-id="2961"></path>
          <path
            d="M451.75 215.95L128.76 538.93c-21.87 21.87-57.33 21.87-79.2 0-21.87-21.87-21.87-57.33 0-79.2l322.99-322.99c21.87-21.87 57.33-21.87 79.2 0 21.87 21.88 21.87 57.34 0 79.21z"
            fill="#666666" p-id="2962"></path>
          <path
            d="M40.57 547.95l322.99 322.99c21.87 21.87 57.33 21.87 79.2 0 21.87-21.87 21.87-57.33 0-79.2l-323-322.99c-21.87-21.87-57.33-21.87-79.2 0-21.86 21.87-21.86 57.33 0.01 79.2z"
            fill="#666666" p-id="2963"></path>
        </svg></button></div>

    <div class="post" ref="vhtml">
      <el-skeleton v-if="loading" :rows="20" animated />
      <template v-html="usePost.currenthtmlVal"></template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, onUpdated, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { request } from '../axios';
import { usePostStore } from '../store';
import { useStore } from '../store';
const router = useRouter()
const store = useStore()
const usePost = usePostStore()
const vhtml = ref({} as HTMLDivElement)
const loading = ref(true)
onMounted(() => {
  if (!store.currentData && usePost.currentData) {
    ElMessage.error("加载文章出错")
    router.back()
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

</script>

<style lang="scss" scoped>
.post-container {
  width: 880px;
  height: auto;
  padding: 50px;
  margin: 0 auto;
  background-color: aliceblue;


  .post-back-btn {
    text-align: left;
    margin: 20px 10px;
  }

  .post {
    min-height: 100vh;
  }
}
</style>