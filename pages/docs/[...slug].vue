<template>
  <div class="main-container">
    <aside class="container-sticky">
      <ContentList v-slot="{ list }">
        <template v-for="articleHead in list" :key="articleHead._path">
          <li
            v-if="
              isSameCategory(articleHead._path) && isIndex(articleHead._path)
            "
            class="list-none mb-5"
          >
            <DocsNavigationItem
              :article="articleHead"
              :route-name="routeName"
            />
          </li>
        </template>
        <template v-for="article in list" :key="article._path">
          <li
            v-if="
              !isPageBlacklisted(article._path) &&
              isSameCategory(article._path) &&
              !isIndex(article._path)
            "
            class="list-none"
          >
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
const route = useRoute();

// Transform index to "readme"
async function handleIndex(path: string): Promise<string> {
  const readme = joinPath(path, "readme");
  const isIndex = await pageExist(readme);
  return isIndex ? readme : path;
}

function extractCategory(path: string): string | null {
  const regex = /^\/(?:\w{2}\/)?docs\/([^/]+)/;
  const match = path.match(regex);

  if (match && match[1]) {
    return `/docs/${match[1]}`;
  }

  return null;
}

const isPageBlacklisted = (path: string) => {
  if (path.endsWith("/summary")) {
    return true;
  }
  // empty
  if (path.endsWith("/confidential-assets")) {
    return true;
  }
  return false;
};

const isSameCategory = (path: string) => {
  const currentPathCategory = extractCategory(route.fullPath);
  const targetPathCategory = extractCategory(path);
  if (!currentPathCategory || !targetPathCategory) {
    return false;
  }
  return currentPathCategory === targetPathCategory;
};

const isIndex = (path: string) => {
  const currentPathCategory = extractCategory(route.fullPath);
  if (currentPathCategory) {
    const index = joinPath(currentPathCategory, "readme");
    return index === path;
  }
  return false;
};

// Check if a content page exist
const pageExist = async (path: string) => {
  if (isPageBlacklisted(path)) {
    return false;
  }
  const contentQuery = queryContent(path);
  const query = await contentQuery.find();
  return query.length > 0;
};

// Build current route name
const routeName = await handleIndex(
  `/docs/${
    typeof route.params.slug === "string"
      ? route.params.slug
      : route.params.slug.join("/")
  }`
);

// Return 404 if the page does not exist
if (!(await pageExist(routeName))) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}
</script>

<style lang="postcss" scoped>
.main-container {
  @apply max-w-screen-xl mx-auto py-10 lg:py-12 px-3 md:px-4 overflow-x-visible overflow-y-visible grid;
  grid-template-columns: 30% 70%;
  grid-gap: 1rem;
}

.container-sticky {
  @apply sticky top-[100px] self-start;
}
</style>
