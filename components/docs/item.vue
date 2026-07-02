<template>
  <div
    ref="scrollSpyContainer"
    class="bg-page-radial-gradient-purple background-radial-defaults flex flex-col-reverse max-w-screen-xl mx-auto pb-10 pt-40 md:pt-44 overflow-x-visible overflow-y-visible md:grid gap-5 md:gap-12 md:grid-cols-12"
  >
    <article class="docs-content">
      <CustomContentRenderer v-if="doc" :value="doc" />
      <h1 v-else>404 Not Found</h1>

      <nav
        v-if="previousPage || nextPage"
        class="not-prose mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <LayoutLink
          v-if="previousPage"
          :to="pagerPath(previousPage.path)"
          class="group flex flex-col gap-1 rounded-xl border border-purple-100/10 bg-[#360061]/40 hover:bg-[#360061] p-4 transition-colors sm:col-start-1"
        >
          <span
            class="flex items-center gap-1.5 text-xs uppercase tracking-wide text-purple-100/50"
          >
            <Icon
              name="layout/arrow-right"
              class="w-3 h-3 rotate-180 rtl:rotate-0"
            />
            {{ $t("docs.pager.previous") }}
          </span>
          <span
            class="font-bold text-purple-100 group-hover:text-beam-blue transition-colors line-clamp-1"
          >
            {{ previousPage.title }}
          </span>
        </LayoutLink>

        <LayoutLink
          v-if="nextPage"
          :to="pagerPath(nextPage.path)"
          class="group flex flex-col gap-1 rounded-xl border border-purple-100/10 bg-[#360061]/40 hover:bg-[#360061] p-4 transition-colors text-right sm:col-start-2 rtl:text-left"
        >
          <span
            class="flex items-center justify-end gap-1.5 text-xs uppercase tracking-wide text-purple-100/50"
          >
            {{ $t("docs.pager.next") }}
            <Icon name="layout/arrow-right" class="w-3 h-3 rtl:rotate-180" />
          </span>
          <span
            class="font-bold text-purple-100 group-hover:text-beam-blue transition-colors line-clamp-1"
          >
            {{ nextPage.title }}
          </span>
        </LayoutLink>
      </nav>
    </article>

    <aside
      class="md:col-span-5 lg:col-span-3 md:ltr:pr-4 xl:ltr:pr-0 md:rtl:pl-4 xl:rtl:pl-0"
    >
      <LayoutLink
        class="stick capitalize group font-bold hidden md:block mcontainer py-4 mb-4 text-purple-100/50 hover:text-purple-100/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#360061] h-auto focus:ring-beam-purple hover:!bg-[#360061]"
        :to="localePath('/docs')"
        ><div class="justify-center items-center gap-2 flex">
          <Icon
            class="ltr:rotate-180 block w-3 h-3 text-purple-100 group-hover:opacity-100 opacity-60 transition-opacity"
            name="layout/arrow-right"
          />
          {{ $t("docs.back") }}
        </div>
      </LayoutLink>
      <section class="stick">
        <LayoutDropdown
          :always-show="true"
          :lock="false"
          custom-class="inline-block md:block"
        >
          <template #dropdown-button>
            <button
              :title="t('docs.pagecontent')"
              type="button"
              class="inline-flex border-b !mx-4 rounded-full border-white px-6 border-opacity-10 md:hidden py-3 font-bold justify-center items-center gap-2 uppercase group-focus:outline-none group-focus:ring-2 group-focus:ring-offset-2 bg-[#290048] hover:bg-[#360061] focus:bg-[#360061] focus:ring-offset-[#360061] focus:ring-beam-purple text-purple-100/50 hover:text-purple-100/90 transition h-auto"
            >
              {{ $t("docs.pagecontent") }}
              <Icon
                class="rotate-90 block w-3 h-3 text-purple-100 group-hover:opacity-100 opacity-60 transition-opacity"
                name="layout/arrow-right"
              />
            </button>
          </template>
          <template #dropdown-content>
            <div
              class="py-4 md:h-[82vh] md:overflow-y-scroll md:overflow-x-hidden md:pb-16 mcontainer"
            >
              <section class="py-4 md:pt-0 rounded-xl">
                <h6 class="ltr:pl-2 rtl:pr-2">
                  {{
                    filteredList.length > 0
                      ? $t("docs.summary")
                      : $t("docs.content")
                  }}
                </h6>
                <li v-if="index" class="list-none mb-4 rtl:pl-5 ltr:pr-5">
                  <DocsNavigationItem
                    :article="index"
                    :route-name="routeName"
                  />
                </li>
                <h6
                  v-if="filteredList.length > 0"
                  class="pt-4 border-t border-white/20 ltr:pl-2 rtl:pr-2"
                >
                  {{ $t("docs.content") }}
                </h6>
                <div
                  v-for="article in filteredList"
                  :key="article.path"
                  class="rtl:pl-5 ltr:pr-5"
                >
                  <li class="list-none">
                    <DocsNavigationItem
                      :article="article"
                      :route-name="routeName"
                    />
                  </li>
                </div>
              </section>
            </div>
          </template>
        </LayoutDropdown>
      </section>
    </aside>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const props = defineProps({
  routeName: {
    type: String,
    required: true,
  },
  currentCategory: {
    type: String,
    required: true,
  },
});

const currentPageExist = await pageExist(props.routeName);
if (!currentPageExist) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

const { data: doc } = await useAsyncData(`docs-${props.routeName}`, () =>
  queryCollection("docs").path(props.routeName).first(),
);

// Previous / next page navigation (issue #358). Content v3 returns the
// surrounding pages in the collection's natural (file) order as [prev, next].
const { data: surround } = await useAsyncData(
  `docs-surround-${props.routeName}`,
  () =>
    queryCollectionItemSurroundings("docs", props.routeName, {
      fields: ["title", "path", "description"],
    }),
);
// Keep the pager within the current category only — a surrounding page that
// belongs to another docs section (e.g. changelog → cli) is treated as a
// boundary (no button) rather than followed.
const inCurrentCategory = <T extends { path?: string }>(
  page: T | null | undefined,
): T | null =>
  page?.path?.startsWith(`${props.currentCategory}/`) ? page : null;
const previousPage = computed(() => inCurrentCategory(surround.value?.[0]));
const nextPage = computed(() => inCurrentCategory(surround.value?.[1]));

// A category README is served at `/docs/<category>/readme`; link to the clean
// category path instead.
const pagerPath = (path: string) => localePath(path.replace(/\/readme$/, ""));

// All pages within the current category (prefix match on the path).
const categoryQuery = queryCollection("docs").where(
  "path",
  "LIKE",
  `${props.currentCategory}%`,
);
const everythingQuery =
  props.currentCategory === "/docs/changelog"
    ? categoryQuery.order("title", "DESC")
    : categoryQuery;

const everything = ref(await everythingQuery.all());
const index = ref(
  await queryCollection("docs").path(`${props.currentCategory}/readme`).first(),
);

const scrollSpy = useScrollSpy();
const scrollSpyContainer = ref<HTMLElement | null>(null);
scrollSpy({
  target: scrollSpyContainer,
  activeClass: "navigation-selected",
  offset: 200,
});

const filteredList = computed(() => {
  const seen = new Set<string>();
  // Cast to a shallow shape: the full collection item type is deeply recursive
  // (body AST) and trips TS's "excessively deep" instantiation limit here.
  const articles = everything.value as Array<{ path?: string }>;
  return articles.filter((article) => {
    if (!article.path) {
      return false;
    }
    const isSameCategoryArticle = isSameCategory(article.path, route);
    const isIndexArticle = isIndex(article.path);
    if (
      isPageBlacklisted(article.path) ||
      !isSameCategoryArticle ||
      isIndexArticle ||
      seen.has(article.path)
    ) {
      return false;
    }
    seen.add(article.path);
    return true;
  });
});
</script>

<style>
article.docs-content {
  @apply px-4 md:col-span-7 lg:col-span-9 prose max-w-none lg:prose-lg prose-invert prose-img:rounded-xl prose-a:!no-underline prose-a:text-beam-pink prose-h3:text-xl prose-h2:text-xl prose-h2:font-bold prose-img:shadow-xl;

  h1 {
    @apply text-3xl font-bold;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: moveGradient 5s linear infinite;

    background-image: radial-gradient(
      129.03% 100% at 120.97% 81.45%,
      #dfdcff 27.08%,
      #a69eff 100%
    );
  }
}
</style>
<style scoped>
h6 {
  @apply font-bold text-xs sm:text-base uppercase text-gray-200 mb-2 ltr:pl-4 rtl:pl-4;
}

aside .mcontainer {
  @apply border rounded-xl border-black border-opacity-30 transition shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset] bg-[#290048];
}
aside .stick {
  @apply md:sticky md:h-auto md:top-24 md:self-start;
}
</style>
