<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { computed } from 'vue'
const props = defineProps(
  getSliceComponentProps<Content.HeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const skills = computed(() => {
  if(!props.slice.items && !props.slice.items.length) return null;
  const itemsWithSkills = props.slice.items.filter(item => item.skills && item.skills.length);
  return itemsWithSkills.map(item => item.skills);
});

const contacts = computed(() => {
  if(!props.slice.items && !props.slice.items.length) return null;
  const itemsWithContacts = props.slice.items.filter(item => item.contact);
  return itemsWithContacts.map(item => {
    return {
      link: item.contact,
      label: item.contact_label
    };
  });
});

const documents = computed(() => {
  if(!props.slice.items && !props.slice.items.length) return null;
  const itemsWithDocuments = props.slice.items.filter(item => item.document);
  return itemsWithDocuments.map(item => {
    return {
      link: item.document,
      label: item.document_label
    };
  });
});

const loopingStrings = computed(() => {
  if(!props.slice.items && !props.slice.items.length) return null;
  const itemsWithLoopingStrings = props.slice.items.filter(item => item.looping_subtitle);
  return itemsWithLoopingStrings.map(item => item.looping_subtitle[0]);
});
</script>

<template>
  <section
    v-if="slice.variation === 'default'"
    class="hero"
  >
    <FancyHeading
      :word1="slice.primary.firstname"
      :word2="slice.primary.lastname"
      center
    />
    <header v-if="slice.primary.headline">
      <PrismicRichText
        :field="slice.primary.headline"
      />
    </header>
    <footer class="flex flex-col items-start gap-8 lg:flex-row">
      <article
        v-if="skills"
        class="inline-flex flex-col"
      >
        <h2 class="text-lg">
          skills
        </h2>
        <p
          class="leading-normal"
        >
          <ul class="columns-2">
            <li
              v-for="(skill, index) in skills"
              :key="index"
            >
              {{ skill }}
            </li>
          </ul>
        </p>
      </article>
      <article
        v-if="contacts"
        class="flex flex-col"
      >
        <h2 class="text-lg">
          contact me
        </h2>
        <p
          class="leading-normal"
        >
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
                  {{ contact.label ?? contact.link.url }}
                </PrismicLink>
              </li>
            </template>
          </ul>
        </p>
        <p class="leading-normal" />
      </article>
      <article 
        v-if="documents"
        class="flex flex-col"
      >
        <h2 class="text-lg">
          documents
        </h2>
        <p
          class="leading-normal"
        >
          <ul class="list-none">
            <template
              v-for="(document, index) in documents"
              :key="index"
            >
              <li
                v-if="document.link && document.link.url"
              >
                <PrismicLink :field="document.link">
                  {{ document.label ?? document.name }}
                </PrismicLink>
              </li>
            </template>
          </ul>
        </p>
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
      :field="slice.primary.cta"
      class="w-fit text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 hover:no-underline"
    >
      {{ slice.primary.cta_label ?? slice.primary.cta.url.replace('https://', '').replace('www.', '') }}
    </PrismicLink>
  </section>
  <section
    v-else-if="slice.variation === 'aboutHero'"
    class="gap-8 slice"
  >
    <div class="prose-lg">
      <PrismicRichText
        :field="slice.primary.content"
      />
      <LoopingText :strings="loopingStrings" />
    </div>
  </section>
</template>
