<template>
  <DocsItem :route-name="routeName" :current-category="currentCategory" />
</template>

<script lang="ts" setup>
const route = useRoute();

// optimize page generation by caching content for each request
// NOT compatible with multi-language (would need to also pass the lang to DocsItem but will require significant amount of RAM)

// use route.fullPath instead of route.params.slug
const routeName = await handleIndex(normalizePath(route.fullPath));
const currentCategory = extractCategory(route.fullPath) as string;
</script>
