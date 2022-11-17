<template>
  <div>
    <el-result icon="error" title="页面错误！" sub-title="路径错误！">
      <template #extra>
        <el-button @click="router.back" type="primary">Back</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<style scoped>

</style>