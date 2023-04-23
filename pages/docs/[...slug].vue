<script lang="ts" setup>
const route = useRoute();

// Transform index to "readme"
async function handleIndex(path: string): Promise<string> {
  const readme = joinPath(path, "readme");
  const isIndex = await pageExist(readme);
  return isIndex ? readme : path;
}

// Check if a content page exist
const pageExist = async (path: string) => {
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

function replaceREADMEByIndex(path: string) {
  return path.replace("/readme", "")
}

// Return 404 if the page does not exist
if (!pageExist(routeName)) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}
</script>

<template>
  <div class="bg-page-radial-gradient">
    <div class="max-w-screen-xl mx-auto py-10 lg:py-12 px-3 md:px-4">
      <div class="grid grid-cols-10 gap-4">
        <div class="col-span-3 flex flex-col">
          <!--<ContentNavigation v-slot="{ navigation }">
             <ul>
            <li v-for="link of navigation" :key="link._path">
              <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
            </li>
          </ul>
        </ContentNavigation>-->

          <ContentList v-slot="{ list }">
            <div v-for="article in list" :key="article._path">
              <NuxtLink
                :to="replaceREADMEByIndex(article._path)"
                :class="`text-base pl-3 opacity-60 hover:opacity-90 transition-opacity ${
                  routeName == article._path
                    ? `border-l border-white font-bold !opacity-90`
                    : ''
                } `"
                >{{ article.title }}</NuxtLink
              >
            </div>
          </ContentList>
        </div>
        <div class="col-span-7">
          <article
            class="prose prose-invert prose-img:rounded-xl prose-a:!no-underline prose-a:text-beam-blue prose-h1:uppercase prose-h1:text-2xl prose-h1:tracking-[.25em] prose-h1:font-bold prose-h2:text-xl prose-img:shadow-xl"
          >
            <ContentDoc v-slot="{ doc }" :path="routeName">
              <ContentRenderer :value="doc" />
            </ContentDoc>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
