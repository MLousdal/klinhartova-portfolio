<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const route = useRoute()
const { data: page } = useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID('article', route.params.uid as string)
)

useHead({
  title: page.value?.data.title
})
</script>


<template>
  <div class="flex flex-col justify-end lg:flex-row">
    <section
      class="hero h-[100vh] bg-cover bg-fixed bg-left bg-no-repeat before:absolute before:inset-0 before:bg-noise before:bg-fixed before:-z-10"
      :style="`box-shadow: inset 0 0 0 1000px ${page.data.color}CC; background-image: url('${page.data.background_image.url}')`"
    >
      <router-link
        to="/"
        class="flex items-center gap-2 text-xl text-black underline-offset-2 before:block before:w-8 before:border-b-2 before:border-primary-400 hover:underline hover:before:w-0 before:transition-all before:motion-reduce:transition-none"
      >
        back
      </router-link>
      <div class="relative overflow-hidden flex justify-center">
        <prismic-image
          :field="page.data.primary_image"
          class="object-cover aspect-4/3 max-w-prose rounded-md"
        />
      </div>
      <footer class="flex flex-col items-start gap-8 lg:flex-row">
        <article
          v-if="page.data.role"
          class="inline-flex flex-col"
        >
          <p class="h2 text-lg">
            role
          </p>
          <p
            class="leading-normal"
          >
            {{ page.data.role }}
          </p>
        </article>
        <article
          v-if="page.data.duration"
          class="inline-flex flex-col"
        >
          <p class="h2 text-lg">
            duration
          </p>
          <p
            class="leading-normal"
          >
            {{ page.data.duration }}
          </p>
        </article>
        <article
          v-if="page.data.tools"
          class="inline-flex flex-col"
        >
          <p class="h2 text-lg">
            tools
          </p>
          <p
            class="leading-normal"
          >
            {{ page.data.tools }}
          </p>
        </article>
        <article
          v-if="page.data.platform"
          class="inline-flex flex-col"
        >
          <p class="h2 text-lg">
            platform
          </p>
          <p
            class="leading-normal"
          >
            {{ page.data.platform }}
          </p>
        </article>
      </footer>
    </section>
    <SliceZone
      wrapper="main"
      :slices="page?.data.slices ?? []"
      :components="components"
      class="lg:w-1/2"
    />
  </div>
</template>
