<template>
  <BlogPost :route-name="routeName" />
</template>

<script lang="ts" setup>
const route = useRoute();

// Strip any i18n locale prefix (/de/blog/... -> /blog/...) and trailing slash so
// the content query always targets the canonical English post path. Blog posts
// aren't translated; a localized URL renders the same content with translated
// chrome (same as docs). Without normalizing, a locale-prefixed path produced a
// broken query path (/blog//de/blog/...) and threw a 404 — so the route failed
// to prerender (404 on reload) and failed on SPA navigation from a localized
// blog index. normalizePath keys prerender and client identically, matching the
// docs page.
const routeName = computed(() => normalizePath(route.path));

definePageMeta({
  layout: "default",
});
</script>
