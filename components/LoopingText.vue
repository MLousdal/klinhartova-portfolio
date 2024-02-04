<template>
  <ClientOnly>
    <p v-if="strings && strings.length">
      <TransitionGroup
        tag="ul"
        name="fade"
        mode="out-in"
        class="relative m-0 list-none"
      >
        <template
          v-for="(string, index) in strings"
          :key="index"
        >
          <li
            v-show="index == currentIndex"
            class="absolute inset-0 m-0"
          >
            {{ string.text }}
          </li>
        </template>
      </TransitionGroup>
    </p>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  strings: {
    type: Array,
    default: []
  }
})

const currentIndex = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.strings.length
  }, 3000)

  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>