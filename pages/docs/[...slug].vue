<template>
  <div
    ref="scrollSpyContainer"
    class="main-container bg-page-radial-gradient-purple"
  >
    <article
      class="col-span-9 prose max-w-none lg:prose-lg prose-invert prose-img:rounded-xl prose-a:!no-underline prose-a:text-beam-blue prose-h1:uppercase prose-h2:text-2xl prose-h3:text-base prose-h1:text-2xl prose-h1:tracking-[.25em] prose-h1:font-bold prose-h2:text-xl prose-img:shadow-xl"
    >
      <ContentDoc v-slot="{ doc }" :path="routeName">
        <CustomContentRenderer :value="doc" />
      </ContentDoc>
    </article>
    <aside class="container-sticky col-span-3">
      <LayoutLink
        class="capitalize group transition-colors"
        :to="localePath('/docs')"
        ><section
          class="font-bold justify-center items-center gap-4 flex text-white/50 group-hover:text-white/90 mb-4 group-focus:outline-none group-focus:ring-2 group-focus:ring-offset-2 bg-[#290048] group-hover:bg-[#360061] group-focus:bg-[#360061] group-focus:ring-offset-[#360061] group-focus:ring-beam-purple text-[#E9D4F2] h-auto"
        >
          <Icon
            class="rotate-180 block w-3 h-3 text-white group-hover:opacity-100 opacity-60 transition-opacity"
            name="layout/arrow-right"
          />
          Back to documentation
        </section></LayoutLink
      >
      <section class="rtl:pl-2 ltr:pr-2">
        <h6>Summary</h6>
        <li class="list-none mb-4 pb-4 border-b border-white/20">
          <DocsNavigationItem :article="index" :route-name="routeName" />
        </li>
        <h6>Content</h6>
        <div
          v-for="article in filteredList"
          :key="article._path"
          class="ltr:pr-4 rtl:pl-4"
        >
          <li class="list-none">
            <DocsNavigationItem :article="article" :route-name="routeName" />
          </li>
        </div>
      </section>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { extractCategory, isIndex, handleIndex, pageExist } from "@/utils/docs";

const localePath = useLocalePath();
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
  @apply max-w-screen-xl mx-auto py-10 lg:py-12 px-3 md:px-4 overflow-x-visible overflow-y-visible grid gap-12 grid-cols-12;
}
h6 {
  @apply font-bold text-xs sm:text-base uppercase text-gray-200 mb-2 ltr:ml-4 rtl:mr-4;
}
.container-sticky section {
  @apply sticky top-[100px] self-start py-4 border rounded-xl border-black border-opacity-30 transition shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset] bg-[#290048];
}
</style>
