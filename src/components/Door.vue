<template>
  <Transition name="slide-fade-left">
    <div class="left" v-if="!useSession.istoleft"></div>
  </Transition>
  <Transition name="slide-fade-right">
    <div v-if="!useSession.istoright" class="right"></div>
  </Transition>
  <div class="opendoor" v-show="!useSession.istoleft">
    <button @click="openDoor">
      <h1>点击开门</h1>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useSessionStroe } from '@/store';

const useSession = useSessionStroe();
const openDoor = () => {
  useSession.istoleft = true;
  useSession.istoright = true;
};
</script>

<style lang="scss" scoped>
.left,
.right {
  position: fixed;
  width: 50vw;
  background-color: #000;
  height: 100vh;
  z-index: 2000;
}

.left {
  left: 0;
}

.right {
  right: 0;
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

    h1 {
      color: #fff;
    }
  }
}
</style>