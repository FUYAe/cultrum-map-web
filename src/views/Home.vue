<template>
  <div class="home-container">
    <Door />
    <Sider />

    <router-view @click="store.handleControl(false)" v-slot="{ Component }">
      <transition name="MainFade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import Door from "@/components/Door.vue";
import Sider from "@/components/Sider.vue"
const store = useStore();

</script>

<style lang="scss" scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f9f5ee;
}
</style>
