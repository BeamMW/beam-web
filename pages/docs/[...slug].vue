<template>
  <div ref="scrollSpyContainer" class="main-container">
    <aside class="container-sticky">
      <ContentList>
        <li class="list-none mb-4 pb-4 border-b border-white/20">
          <DocsNavigationItem :article="index" :route-name="routeName" />
        </li>
        <template v-for="article in filteredList" :key="article._path">
          <li>
            <DocsNavigationItem :article="article" :route-name="routeName" />
          </li>
        </template>
      </ContentList>
    </aside>

    <article
      class="prose prose-invert prose-img:rounded-xl prose-a:!no-underline prose-a:text-beam-blue prose-h1:uppercase prose-h2:text-2xl prose-h3:text-base prose-h1:text-2xl prose-h1:tracking-[.25em] prose-h1:font-bold prose-h2:text-xl prose-img:shadow-xl"
    >
      <ContentDoc v-slot="{ doc }" :path="routeName">
        <CustomContentRenderer :value="doc" />
      </ContentDoc>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { extractCategory, isIndex, handleIndex, pageExist } from "@/utils/docs";

const route = useRoute();
const scrollSpy = useScrollSpy();

const currentCategory = extractCategory(route.fullPath) as string;
const everything = ref(await queryContent(currentCategory).find());
const index = ref(await queryContent(`${currentCategory}/readme`).findOne());

const routeName = await handleIndex(
  `/docs/${
    typeof route.params.slug === "string"
      ? route.params.slug
      : route.params.slug.join("/")
  }`
);

if (!(await pageExist(routeName))) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

const scrollSpyContainer = ref<HTMLElement | null>(null);
scrollSpy({
  target: scrollSpyContainer,
  activeClass: "navigation-selected",
  offset: 200,
});

const filteredList = computed(() => {
  return everything.value.filter((article) => {
    if (!article._path) {
      return false;
    }
    const isSameCategoryArticle = isSameCategory(article._path, route);
    const isIndexArticle = isIndex(article._path);
    return (
      !isPageBlacklisted(article._path) &&
      isSameCategoryArticle &&
      !isIndexArticle
    );
  });
});
</script>
<style lang="postcss" scoped>
.main-container {
  @apply max-w-screen-xl mx-auto py-10 lg:py-12 px-3 md:px-4 overflow-x-visible overflow-y-visible grid gap-12;
  grid-template-columns: 25% 75%;
}
.container-sticky {
  @apply sticky top-[100px] self-start;
}
</style>
