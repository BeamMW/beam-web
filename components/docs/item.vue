<template>
  <div
    ref="scrollSpyContainer"
    class="bg-page-radial-gradient-purple flex flex-col-reverse max-w-screen-xl mx-auto pb-10 md:!py-10 lg:!py-12 overflow-x-visible overflow-y-visible md:grid gap-5 md:gap-12 md:grid-cols-12"
  >
    <article
      class="px-3 md:px-4 md:col-span-7 lg:col-span-9 prose max-w-none lg:prose-lg prose-invert prose-img:rounded-xl prose-a:!no-underline prose-a:text-beam-blue prose-h1:uppercase prose-h2:text-2xl prose-h3:text-base prose-h1:text-2xl prose-h1:tracking-[.25em] prose-h1:font-bold prose-h2:text-xl prose-img:shadow-xl"
    >
      <ContentDoc :path="routeName">
        <template #default="{ doc }"
          ><CustomContentRenderer :value="doc"
        /></template>
        <template #not-found><h1>404 Not Found</h1></template>
      </ContentDoc>
    </article>

    <aside class="md:col-span-5 lg:col-span-3 md:px-4">
      <LayoutLink
        class="stick capitalize group font-bold hidden md:block mcontainer py-4 mb-4 text-white/50 hover:text-white/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#360061] h-auto focus:ring-beam-purple hover:!bg-[#360061]"
        :to="localePath('/docs')"
        ><div class="justify-center items-center gap-2 flex">
          <Icon
            class="ltr:rotate-180 block w-3 h-3 text-white group-hover:opacity-100 opacity-60 transition-opacity"
            name="layout/arrow-right"
          />
          {{ $t("docs.back") }}
        </div>
      </LayoutLink>
      <section class="stick mcontainer">
        <LayoutDropdown :always-show="true" :lock="false">
          <template #dropdown-button>
            <button
              :title="t('docs.pagecontent')"
              type="button"
              class="border-b border-white border-opacity-10 md:hidden py-4 font-bold w-full justify-center items-center gap-2 uppercase flex md:mb-4 group-focus:outline-none group-focus:ring-2 group-focus:ring-offset-2 bg-[#290048] hover:bg-[#360061] focus:bg-[#360061] focus:ring-offset-[#360061] focus:ring-beam-purple text-white/50 hover:text-white/90 transition h-auto"
            >
              {{ $t("docs.pagecontent") }}
              <Icon
                class="rotate-90 block w-3 h-3 text-white group-hover:opacity-100 opacity-60 transition-opacity"
                name="layout/arrow-right"
              />
            </button>
          </template>
          <template #dropdown-content>
            <div
              class="py-4 md:h-[82vh] md:overflow-y-scroll md:overflow-x-hidden md:pb-20"
            >
              <section class="py-4 md:pt-0 rounded-xl">
                <h6>
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
                  class="pt-4 border-t border-white/20"
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
import { useRoute } from "vue-router";
import type {
  ParsedContent,
  QueryBuilder,
} from "@nuxt/content/dist/runtime/types/index";

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const scrollSpy = useScrollSpy();

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

if (!(await pageExist(props.routeName))) {
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
<style scoped>
h6 {
  @apply font-bold text-xs sm:text-base uppercase text-gray-200 mb-2 ltr:pl-4 rtl:pl-4;
}
aside .mcontainer {
  @apply transition-colors border rounded-xl border-black border-opacity-30 transition shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset] bg-[#290048];
}
aside .stick {
  @apply md:sticky md:h-auto md:top-[100px] md:self-start;
}
</style>
