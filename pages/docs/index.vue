<script lang="ts" setup>
import type { ParsedContent } from "@nuxt/content/dist/runtime/types/index";
import { ExternalLinks, docTypes } from "@/app.config";

const localePath = useLocalePath();
const { t } = useI18n();

const title = computed(() => t("head.title.documentation"));
const description = computed(() => t("head.descriptions.docs"));

const nuxtApp = useNuxtApp();

const { data: pages } = await useAsyncData<ParsedContent[]>(
  "docs-all-pages",
  async () => {
    const results = await queryContent<ParsedContent>("/docs")
      .where({ title: { $exists: true } })
      .find();
    const seen = new Set<string>();
    return results.filter((p) => {
      if (!p._path || seen.has(p._path)) return false;
      seen.add(p._path);
      return true;
    });
  },
  {
    getCachedData: (key) =>
      nuxtApp.isHydrating ? nuxtApp.payload.data[key] : undefined,
  },
);

const searchQuery = ref("");
const debouncedSearch = ref("");
let searchTimer: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (value) => {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    debouncedSearch.value = value;
  }, 200);
});
onBeforeUnmount(() => {
  if (searchTimer) clearTimeout(searchTimer);
});

const selectedCategory = ref("");

const categoryFor = (
  path: string | undefined,
): (typeof docTypes)[number] | undefined => {
  if (!path) return undefined;
  return docTypes.find((doc) => path.startsWith(`/docs${doc.path}/`));
};

const isFiltering = computed(
  () =>
    debouncedSearch.value.trim().length > 0 || selectedCategory.value !== "",
);

const filteredPages = computed(() => {
  if (!pages.value) return [];
  const q = debouncedSearch.value.trim().toLowerCase();
  return pages.value.filter((p) => {
    if (!p._path || isPageBlacklisted(p._path) || isIndex(p._path)) {
      return false;
    }
    const category = categoryFor(p._path);
    if (!category) return false;
    if (selectedCategory.value && category.path !== selectedCategory.value) {
      return false;
    }
    if (!q) return true;
    return (
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  });
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});

definePageMeta({
  layout: "default",
});
</script>
<template>
  <div
    class="bg-page-radial-gradient-purple background-radial-defaults pt-28 md:pt-[8.5rem]"
  >
    <LayoutWrapper :center="true" class="py-10 lg:py-12">
      <div class="px-4 mx-auto max-w-screen-xl text-center z-[12] heroText">
        <LayoutTitle
          :title="t('head.title.documentation')"
          :reserve-space="true"
          gradient-color="specialGradientPurple"
          :large="true"
          :small-padding="true"
        />

        <h2
          class="mb-8 md:mb-12 text-lg font-normal sm:px-16 xl:px-48 text-purple-100"
        >
          {{ $t("docs.warning") }}
        </h2>
      </div>

      <ClientOnly>
        <div class="flex flex-col sm:flex-row gap-3 mb-8 mt-2">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('docs.search.placeholder')"
            class="flex-1 px-4 py-2.5 rounded-xl bg-purple-900/20 border border-purple-100/10 text-white placeholder-purple-100/40 focus:outline-none focus:ring-2 focus:ring-beam-blue"
          />
          <select
            v-model="selectedCategory"
            class="sm:w-64 px-4 py-2.5 rounded-xl bg-purple-900/20 border border-purple-100/10 text-white focus:outline-none focus:ring-2 focus:ring-beam-blue appearance-none cursor-pointer"
          >
            <option value="">{{ $t("docs.search.allCategories") }}</option>
            <option v-for="doc in docTypes" :key="doc.path" :value="doc.path">
              {{ t(doc.title) }}
            </option>
          </select>
        </div>
      </ClientOnly>

      <div
        v-if="!isFiltering"
        class="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-6 md:gap-10 text-purple-100"
      >
        <ResourcesLink
          v-for="(doc, index) in docTypes"
          :key="index"
          :title="t(doc.title)"
          :image="doc.image"
          :link="localePath(`/docs${doc.path}`)"
          :link-text="t('docs.explore')"
          class="bg-[#360061]/50 hover:bg-[#360061] focus:bg-[#360061] focus:ring-offset-[#360061] focus:ring-beam-purple text-purple-100/80"
        />
      </div>

      <div v-else class="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="page in filteredPages"
          :key="page._path"
          :to="localePath(page._path ?? '/docs')"
          class="group block h-full bg-[#360061]/50 hover:bg-[#360061] rounded-xl p-5 transition-all duration-300 border border-purple-100/10 hover:border-purple-100/20"
        >
          <div class="text-xs uppercase tracking-wide text-purple-100/50 mb-2">
            {{ t(categoryFor(page._path)?.title ?? "") }}
          </div>
          <h3
            class="text-lg font-bold text-white mb-2 group-hover:text-beam-blue transition-colors line-clamp-2"
          >
            {{ page.title }}
          </h3>
          <p
            v-if="page.description"
            class="text-purple-100/70 text-sm line-clamp-3"
          >
            {{ page.description }}
          </p>
        </NuxtLink>
      </div>

      <p
        v-if="isFiltering && filteredPages.length === 0"
        class="text-center text-purple-100/60 py-12"
      >
        {{ $t("docs.noResults") }}
      </p>

      <div class="flex justify-center">
        <LayoutLink
          :to="ExternalLinks.DOCS_SOURCES"
          class="opacity-70 text-beam-blue md:text-lg pt-8 md:pt-10 hover:opacity-100 flex items-center text-base underline gap-1 transition-opacity"
        >
          {{ $t("docs.edit") }}
          <Icon
            name="layout/external"
            class="inline-block h-[1.32rem] w-[1.32rem]"
          />
        </LayoutLink>
      </div>
    </LayoutWrapper>
  </div>
</template>
