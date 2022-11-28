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
        </svg></button>

      <el-button @click="download('res.json', JSON.stringify({ data: postStore.post }))" type="primary">下载json格式文件
      </el-button>
    </div>
    <div></div>
    <hr>
    <div>

      <div>
      </div>

    </div>
    <hr>
    <h3>正文：</h3>
    <hr>
    <div ref="view" class="post"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue';
import { usePostStore } from '../../store';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
const router = useRouter()
const postStore = usePostStore()
const { post } = storeToRefs(postStore)
const view = ref({} as HTMLDivElement)
onMounted(() => {
  view.value.innerHTML = post.value.htmlVal
})
function download(filename: string, text: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
</script>

<style lang="scss" scoped>
.post-container {
  position: relative;
  max-width: 880px;
  height: auto;
  margin: 0 auto;
  min-height: 100vh;
  background-color: aliceblue;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 50px;



  .post {
    // padding: 20px;

    img {
      width: 100px;
    }
  }

  .post-back-btn {
    margin: 20px 0;
  }
}
</style>