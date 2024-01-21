<template>
  <h1
    :class="['text-4xl heading md:text-6xl xl:text-8xl', {'absolute -translate-x-1/2 -translate-y-1/2 lg:fixed left-1/2 lg:top-1/2 top-1/3': center}]"
    :style="`--offset:  max(0%, ${100 - offset}%)`"
  >
    <span
      v-if="word1"
      :data-text="word1"
    >{{ word1 }}</span>
    <span
      v-if="word2"
      class="word2"
      :data-text="word2"
    >{{ word2 }}</span>
  </h1>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
  center: Boolean,
  word1: String,
  word2: String
})

const offset = ref(0)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  const delta = Math.floor((window.scrollY / window.innerHeight) * 100)

  offset.value = Math.max(0, delta * 2)
}
</script>

<style lang="scss">
:root {
  --offset: 0%;
}

.heading {
  margin: 0;
  display: flex;
  line-height: 0.78;

  span {
    position: relative;
    display: inline-block;

    &::before,
    &::after {
      color: currentColor;
      content: attr(data-text);
      position: absolute;
      left: 0;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 0.5px currentColor;
      z-index: -1;
    }
    &::before {
      top: calc(var(--offset) * -1);
    }
    &:after {
      top: var(--offset);
    }
  }
  .word2 {
    color: #000;
  }
}
</style>
