<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const { data: home } = useAsyncData("index", () =>
  prismic.client.getByUID("page", "home")
);
const { data: pages } = useAsyncData("articles", () =>
  prismic.client.getAllByType("article", {
    orderings: {
      field: "my.article.order",
    },
  })
);

useSeoMeta({
  title: home.value?.data.meta_title ?? prismic.asText(home.value?.data.title),
  ogTitle:
    home.value?.data.meta_title ?? prismic.asText(home.value?.data.title),
  description: home.value?.data.meta_description,
  ogDescription: home.value?.data.meta_description,
  ogImage: home.value?.data.og_image.url,
  twitterCard: "summary_large_image",
  ogType: "website",
});
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
