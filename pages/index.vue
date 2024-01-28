<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const { data: home } = useAsyncData('index', () =>
  prismic.client.getByUID('page', 'home')
)
const { data: pages } = useAsyncData('articles', () =>
  prismic.client.getAllByType("article")
)

useSeoMeta({
  title: home.value?.data.meta_title ?? prismic.asText(home.value?.data.title),
  ogTitle: home.value?.data.meta_title ?? prismic.asText(home.value?.data.title),
  description: home.value?.data.meta_description,
  ogDescription: home.value?.data.meta_description,
  twitterCard: 'summary_large_image',
  ogType: 'website',
})

// defineOgImageComponent({
//     component: 'Custom',
//     title: home.value?.data.meta_title ?? prismic.asText(home.value?.data.title),
//     description: home.value?.data.meta_description,
//   });

defineOgImageScreenshot({
  // wait 2 seconds
  delay: 2000
})
</script>


<template>
  <div class="flex flex-col justify-end lg:flex-row">
    <SliceZone
      wrapper="main"
      :slices="home?.data.slices ?? []"
      :components="components"
      class="lg:w-1/2"
    />
    <div class="lg:w-1/2">
      <PageSection
        v-for="page in pages"
        :key="page.data.title"
        :color="page.data.color"
        :page="page.data.title"
        :link="page.url"
        :image="page.data.primary_image.url"
        :background="page.data.background_image.url"
        class="lg:first:h-[150vh] lg:first:pt-[50vh]"
      />
    </div>
  </div>
</template>
