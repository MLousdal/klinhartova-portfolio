<script setup lang="ts">
const props = defineProps({
  title: String,
  description: String,
});

</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full h-full text-white text-gray-800 bg-gray-100 "
    :style="{ padding: '30px 45px' }"
  >
    <div
      class="absolute bottom-0 left-0 flex h-1 bg-orange-500"
      :style="{ width: '1200px' }"
    />
    <div class="flex flex-col items-center justify-center pb-10">
      <h1
        :style="{
          fontSize: '65px',
          lineHeight: '85px',
          margin: '20px 0 0 0',
          padding: '0',
        }"
      >
        {{ title }}
      </h1>
      <p
        :style="{ fontSize: '29px', lineHeight: '45px' }"
        class="mx-10 mt-5 text-gray-700"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
