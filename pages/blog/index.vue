<script lang="ts" setup>
import type { ParsedContent } from "@nuxt/content/dist/runtime/types/index";

const { t, te } = useI18n();

const title = computed(() => t("head.title.blog"));
const description = computed(() => t("head.descriptions.blog"));

const nuxtApp = useNuxtApp();

const { data: posts } = await useAsyncData<ParsedContent[]>(
  "blog-all-posts",
  () =>
    queryContent<ParsedContent>("/blog")
      .where({ date: { $exists: true } })
      .sort({ date: -1 })
      .find(),
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

const categories = computed(() => {
  if (!posts.value) return [];
  const cats = new Set(
    posts.value.map((p) => p.category).filter(Boolean) as string[],
  );
  return Array.from(cats).sort();
});

const categoryLabel = (slug: string) => {
  const key = `blog.categories.${slug}`;
  return te(key) ? t(key) : slug;
};

const filteredPosts = computed(() => {
  if (!posts.value) return [];
  const q = debouncedSearch.value.trim().toLowerCase();
  return posts.value.filter((p) => {
    const matchesSearch =
      !q ||
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q);
    const matchesCategory =
      !selectedCategory.value || p.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
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
          :title="t('head.title.blog')"
          :reserve-space="true"
          gradient-color="specialGradientPurple"
          :large="true"
          :small-padding="true"
        />
        <h2
          class="mb-4 md:mb-6 text-lg font-normal sm:px-16 xl:px-48 text-purple-100"
        >
          {{ $t("blog.subtitle") }}
        </h2>
      </div>

      <ClientOnly>
        <div class="flex flex-col sm:flex-row gap-3 mb-8 mt-2">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('blog.search.placeholder')"
            class="flex-1 px-4 py-2.5 rounded-xl bg-purple-900/20 border border-purple-100/10 text-white placeholder-purple-100/40 focus:outline-none focus:ring-2 focus:ring-beam-blue"
          />
          <select
            v-model="selectedCategory"
            class="sm:w-48 px-4 py-2.5 rounded-xl bg-purple-900/20 border border-purple-100/10 text-white focus:outline-none focus:ring-2 focus:ring-beam-blue appearance-none cursor-pointer"
          >
            <option value="">{{ $t("blog.search.allCategories") }}</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ categoryLabel(cat) }}
            </option>
          </select>
        </div>
      </ClientOnly>

      <div class="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div v-for="post in filteredPosts" :key="post._path" class="mb-8">
          <BlogPostCard :post="post" />
        </div>
      </div>
      <p
        v-if="posts && filteredPosts.length === 0"
        class="text-center text-purple-100/60 py-12"
      >
        {{ $t("blog.noResults") }}
      </p>
    </LayoutWrapper>
  </div>
</template>
