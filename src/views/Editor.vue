<template>
  <div class="container">
    <div class="control">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button type="info" @click="look">预览效果</el-button>
      <el-button type="info" @click="clear">清空</el-button>
    </div>
    <div class="info">
      <div>
        <label for="">地点名字</label>
        <el-input v-model="post.name" show-word-limit maxlength="20" placeholder="地点名字" clearable />
      </div>
      <div>
        <label for="">位置</label>
        <el-input v-model="post.loc" minlength="1" show-word-limit maxlength="64" placeholder="位置" clearable />
      </div>
      <div><label for="">文章标题</label>
        <el-input v-model="post.title" minlength="1" show-word-limit maxlength="64" placeholder="文章标题" clearable />
      </div>
      <div><label for="">费用情况</label>
        <el-input v-model="post.fee" minlength="1" show-word-limit maxlength="64" placeholder="费用情况" clearable />
      </div>
      <div><label for="">开放时间</label>
        <el-input v-model="post.opentime" minlength="1" show-word-limit maxlength="64" placeholder="开放时间" clearable />
      </div>
      <div><label for="">经度</label>
        <el-input v-model="post.longitude" minlength="1" show-word-limit type="number" placeholder="经度" clearable />
      </div>
      <div><label for="">纬度</label>
        <el-input v-model="post.latitude" minlength="1" show-word-limit type="number" placeholder="纬度" clearable />
      </div>
      <div><label for="">简介</label>
        <el-input v-model="post.brief" minlength="1" show-word-limit :rows="4" maxlength="100" type="textarea"
          placeholder="输入简介100字以内" />
      </div>
      <div>
        <label for="">推荐指数</label>
        <el-rate v-model="post.rate" allow-half />
      </div>
      <div>
        <label for="">类型</label>
        <el-select v-model="post.viewtype" class="m-2" placeholder="Select" size="large">
          <el-option v-for="item in viewTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
    <div style="border: 1px solid #ccc" class="editor">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor style="min-height: 1600px; overflow-y: hidden;" v-model="post.htmlVal" :defaultConfig="editorConfig"
        :mode="mode" @onCreated="handleCreated" />
    </div>

  </div>
</template>

<script setup lang="ts">

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, reactive } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { usePostStore } from "../store"
import { useRouter } from "vue-router"
import { request } from '../axios'
import { ElMessage, ElMessageBox, MessageHandler } from 'element-plus'
import { storeToRefs } from 'pinia'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = ref('default')
const postStore = usePostStore()
const router = useRouter()
const { post } = storeToRefs(postStore)
const uploadmsg = ref<MessageHandler | null>(null)
// 模拟 ajax 异步获取内容
let uploading = false
const viewTypeOptions = [
  {
    value: 'building',
    label: '建筑',
  },
  {
    value: 'outside',
    label: '山水',
  },
  {
    value: 'other',
    label: '其他',
  }

]
const toolbarConfig = {}
const editorConfig = {
  MENU_CONF: {
    uploadImage: {
      fieldName: 'file',
      server: import.meta.env.VITE_UPLOAD_URL,
      maxFileSize: 1.5 * 1024 * 1024,
      onBeforeUpload(file: File) { // TS 语法
        // onBeforeUpload(file) {    // JS 语法
        // file 选中的文件，格式如 { key: file }
        uploadmsg.value = ElMessage({
          message: '图片上传中...',
          duration: 0
        })

        // 可以 return
        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
      },
      onSuccess(file: File, res: any) {  // TS 语法
        // onSuccess(file, res) {   
        // // JS 语法

        uploadmsg.value?.close()
        ElMessage.success("图片上传成功")
        // post.value.imgs.push({ url: res.data.url, href: res.data.href, alt: res.data.alt, name: file.name, size: file.size })
        // console.log(`${file} 上传成功`, { url: res.data.url, href: res.data.href, alt: res.data.alt, name: file.name, size: file.size })
      },
      onFailed(file: File, res: any) {   // TS 语法
        // onFailed(file, res) {    
        uploadmsg.value?.close()       // JS 语法
        ElMessage.error("图片上传失败")
      },

      // 上传错误，或者触发 timeout 超时
      onError(file: File, err: any, res: any) {  // TS 语法
        // onError(file, err, res) {   
        uploadmsg.value?.close()            // JS 语法
        ElMessage.error("图片上传出错")
      },
    }
  }
}
let editor: any;
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const submit = async () => {
  const { value } = await ElMessageBox.prompt('请输入管理员密码', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })

  const res = await request.post("check", { passwd: value || "123456" })
  console.log(' ', res)
  if (res.data.code !== 200) {
    ElMessage.error("密码错误")
    return
  }
  ElMessage.success("上传中")
  if (uploading) return

  const pid = Math.random().toString(36).slice(-8)
  const data = {
    pid: pid,
    htmlVal: post.value.htmlVal,
    loc: post.value.loc,
    rate: post.value.rate,
    brief: post.value.brief,
    longitude: Number(post.value.longitude),
    latitude: Number(post.value.latitude),
    title: post.value.title,
    name: post.value.name,
    opentime: post.value.opentime,
    fee: post.value.fee,
    viewtype: post.value.viewtype
  }
  for (let key in data) {
    if (data[key as keyof typeof data] === "") {
      ElMessage.error(key + "为空")
      uploading = false

      return
    }
  }
  console.log('data', data)
  request.post("add_post", data).then(res => {
    if (res.data.code == -1) {
      // console.log('res.data.msg', res.data)
      ElMessage.error("提交失败:" + res.data.message)
      uploading = false
    } else {
      for (let img of editorRef.value.getElemsByType('image')) {
        request.post("add_pic", {
          picId: Math.random().toString(36).slice(-8),
          pid: pid,
          base64: "",
          name: "",
          size: 0,
          url: img.src || "",


        }).catch(err => {
          ElMessage.error("图片上传问题" + err)
          uploading = false
          console.error('err', err)

        })
      }
      ElMessage.success("提交成功")
      uploading = false

    }
  }).catch(err => {
    console.log(err)
    ElMessage.error(err)
    uploading = false

  })

}
const look = () => {
  router.push({
    path: "/previewpost"
  })
}
const clear = () => {
  ElMessageBox.confirm(
    '确定要清除吗?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      post.value = {
        name: "",
        loc: "",
        title: "",
        longitude: "",
        latitude: "",
        brief: "",
        rate: 3,
        htmlVal: "",
        fee: "",
        opentime: "",
        viewtype: "",
        imgs: []
      }
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })

}
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}




</script>

<style lang="scss" scoped>
.container {
  min-height: 1600px;
  width: 800px;
  margin: 0 auto;
  padding: 60px 0;

  .info {
    padding: 20px 0;


    >div {
      margin: 5px 0;

      label {
        font-size: 12px;
      }
    }
  }
}
</style>