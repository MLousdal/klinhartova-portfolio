<template>
  <article
    class="relative grid h-[100vh] place-items-center bg-cover bg-fixed bg-left bg-no-repeat before:absolute before:inset-0 before:bg-noise before:bg-fixed"
    :style="`box-shadow: inset 0 0 0 1000px ${color}CC; background-image: url('${background}')`"
  >
    <div class="relative z-10 flex flex-col items-end gap-4 mx-4 group max-w-prose">
      <h2
        v-if="link"
        class="flex items-center gap-2 text-xl text-black underline-offset-2 before:block before:w-8 before:border-b-2 before:border-black group-hover:underline group-hover:before:w-0 before:transition-all before:motion-reduce:transition-none"
      >
        {{ page }}
      </h2>
      <picture class="relative overflow-hidden rounded-md aspect-4/3"><img
        :src="image"
        alt=""
        class="object-cover transition duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none"
      >
      </picture>
      <a
        v-if="link"
        :href="link"
        class="absolute inset-0"
        :title="page"
      ><span class="invisible">{{ page }}</span></a>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "black",
  },
  page: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  background: {
    type: String,
    default: "",
  },
});
</script>
