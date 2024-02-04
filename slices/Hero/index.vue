<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { computed } from "vue";
const props = defineProps(
  getSliceComponentProps<Content.HeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

// Methods
function cleanUrl(url: string) {
  if (!url) return "";
  return url.replace("https://", "").replace("www.", "");
}

// Computed
const skills = computed(() => {
  if (!props.slice.items && !props.slice.items.length) return null;
  const itemsWithSkills = props.slice.items.filter(
    (item) => item.skills && item.skills.length
  );
  return itemsWithSkills.map((item) => item.skills);
});

const contacts = computed(() => {
  if (!props.slice.items && !props.slice.items.length) return null;
  const itemsWithContacts = props.slice.items.filter((item) => item.contact);
  return itemsWithContacts.map((item) => {
    return {
      link: item.contact,
      label: item.contact_label,
    };
  });
});

const documents = computed(() => {
  if (!props.slice.items && !props.slice.items.length) return null;
  const itemsWithDocuments = props.slice.items.filter((item) => item.document);
  return itemsWithDocuments.map((item) => {
    return {
      link: item.document,
      label: item.document_label,
    };
  });
});

const loopingStrings = computed(() => {
  if (!props.slice.items && !props.slice.items.length) return null;
  const itemsWithLoopingStrings = props.slice.items.filter(
    (item) => item.looping_subtitle
  );
  return itemsWithLoopingStrings.map((item) => item.looping_subtitle[0]);
});
</script>

<template>
  <section
    v-if="slice.variation === 'default'"
    class="items-center hero"
  >
    <header
      v-if="slice.primary.headline"
      class="w-full"
    >
      <PrismicRichText :field="slice.primary.headline" />
    </header>
    <FancyHeading
      :word1="slice.primary.firstname"
      :word2="slice.primary.lastname"
      center
    />
    <footer
      class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3 lg:gap-6 xl:gap-8"
    >
      <article
        v-if="skills"
        class="sm:col-span-2 2xl:col-span-1"
      >
        <h2 class="text-lg">
          skills
        </h2>
        <ul class="columns-2">
          <li
            v-for="(skill, index) in skills"
            :key="index"
          >
            {{ skill }}
          </li>
        </ul>
      </article>
      <article v-if="contacts">
        <h2 class="text-lg">
          contact me
        </h2>
        <ul class="list-none">
          <template
            v-for="(contact, index) in contacts"
            :key="index"
          >
            <li v-if="contact.link && contact.link.url">
              <PrismicLink
                :field="contact.link"
                target="_blank"
              >
                {{ contact.label ?? cleanUrl(contact.link.url) }}
              </PrismicLink>
            </li>
          </template>
        </ul>
        <p class="leading-normal" />
      </article>
      <article v-if="documents">
        <h2 class="text-lg">
          documents
        </h2>
        <ul class="list-none">
          <template
            v-for="(document, index) in documents"
            :key="index"
          >
            <li v-if="document.link && document.link.url">
              <PrismicLink :field="document.link">
                {{ document.label ?? document.name }}
              </PrismicLink>
            </li>
          </template>
        </ul>
      </article>
    </footer>
  </section>
  <section
    v-else-if="slice.variation === 'articleHero'"
    class="gap-8 slice"
  >
    <FancyHeading
      v-if="slice.primary.word1 || slice.primary.word2"
      :word1="slice.primary.word1"
      :word2="slice.primary.word2"
    />
    <p
      v-if="slice.primary.subtitle"
      class="h2"
    >
      {{ slice.primary.subtitle }}
    </p>
    <PrismicLink
      v-if="slice.primary.cta && slice.primary.cta.url"
      :field="slice.primary.cta"
      class="btn"
    >
      {{ slice.primary.cta_label ?? cleanUrl(slice.primary.cta.url) }}
    </PrismicLink>
  </section>
  <section
    v-else-if="slice.variation === 'aboutHero'"
    class="gap-8 slice"
  >
    <div class="prose-lg">
      <PrismicRichText :field="slice.primary.content" />
      <LoopingText :strings="loopingStrings" />
    </div>
  </section>
</template>
