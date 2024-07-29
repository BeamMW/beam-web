<template>
  <div
    ref="scrollSpyContainer"
    class="bg-page-radial-gradient-purple background-radial-defaults flex flex-col-reverse max-w-screen-xl mx-auto pb-10 pt-40 md:pt-44 overflow-x-visible overflow-y-visible md:grid gap-5 md:gap-12 md:grid-cols-12"
  >
    <article class="docs-content">
      <ContentDoc :path="routeName">
        <template #default="{ doc }"
          ><CustomContentRenderer :value="doc"
        /></template>
        <template #not-found><h1>404 Not Found</h1></template>
      </ContentDoc>
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
                <li class="list-none mb-4 rtl:pl-5 ltr:pr-5">
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
                  :key="article._path"
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
import type {
  ParsedContent,
  QueryBuilder,
} from "@nuxt/content";

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

let everythingQuery: QueryBuilder<ParsedContent>;

switch (props.currentCategory) {
  case "/docs/changelog":
    everythingQuery = queryContent(props.currentCategory).sort({
      title: -1,
    });
    break;
  default:
    everythingQuery = queryContent(props.currentCategory);
    break;
}

const everything = ref(await everythingQuery.find());
const index = ref(
  await queryContent(`${props.currentCategory}/readme`).findOne(),
);

const scrollSpy = useScrollSpy();
const scrollSpyContainer = ref<HTMLElement | null>(null);
scrollSpy({
  target: scrollSpyContainer,
  activeClass: "navigation-selected",
  offset: 200,
});

const filteredList = computed(() => {
  return everything.value.filter((article: any) => {
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
