<template>
  <div class="bg-page-radial-gradient overflow-visible">
    <div
      class="max-w-screen-xl mx-auto py-10 lg:py-12 px-3 md:px-4 overflow-x-visible overflow-y-visible"
    >
      <div class="grid grid-cols-10 gap-4 overflow-visible">
        <div class="col-span-3 sticky top-50 left-0">
          <ContentList v-slot="{ list }">
            <li v-for="article in list" :key="article._path" class="list-none">
              <template v-if="!isPageBlacklisted(article._path)">
                <NuxtLink
                  :to="processPath(article._path)"
                  :class="`pl-3 text-lg opacity-60 hover:opacity-90 transition-opacity ${
                    routeName == article._path
                      ? `border-l border-white font-bold !opacity-90`
                      : ''
                  } `"
                  >{{ article.title }}</NuxtLink
                >
                <template
                  v-if="
                    routeName == article._path &&
                    article.body &&
                    article.body.toc &&
                    article.body.toc.links
                  "
                >
                  <ul
                    v-for="(link, index) in article.body.toc.links"
                    :key="index"
                    class="list-none ml-5"
                  >
                    <NuxtLink
                      v-if="link.text != article.title"
                      class="text-base opacity-60 hover:opacity-90 mt-2"
                      :to="processPath(article._path) + '#' + link.id"
                      >{{ link.text }}</NuxtLink
                    >
                    <ul v-if="link.children" class="ml-3 mt-1 text-sm">
                      <li
                        v-for="(childLink, childIndex) in link.children"
                        :key="childIndex"
                      >
                        <NuxtLink
                          class="opacity-60 hover:opacity-90"
                          :to="processPath(article._path) + '#' + childLink.id"
                          >{{ childLink.text }}</NuxtLink
                        >
                      </li>
                    </ul>
                  </ul></template
                >
              </template>
            </li>
          </ContentList>
        </div>

        <div class="col-span-7">
          <article
            class="prose prose-invert prose-img:rounded-xl prose-a:!no-underline prose-a:text-beam-blue prose-h1:uppercase prose-h1:text-2xl prose-h1:tracking-[.25em] prose-h1:font-bold prose-h2:text-xl prose-img:shadow-xl"
          >
            <ContentDoc v-slot="{ doc }" :path="routeName">
              <CustomContentRenderer :value="doc" />
            </ContentDoc>
          </article>
        </div>
      </div>
    </div>
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

function processPath(path: string) {
  return path.replace("/readme", "");
}

// Return 404 if the page does not exist
if (!(await pageExist(routeName))) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

/* onMounted(() => {
  window.addEventListener("hashchange", function (e) {
    e.preventDefault();
    return false;
  });
}); */
</script>

<style lang="postcss" scoped>
.custom-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 10px; /* Adjust the value as needed */
}
</style>
