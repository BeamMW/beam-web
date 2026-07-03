<template>
  <DocsItem :route-name="routeName" :current-category="currentCategory" />
</template>

<script lang="ts" setup>
const route = useRoute();

// DocsItem is rendered directly (not wrapped in <RenderCacheable>). The cache
// wrapper rendered DocsItem in an isolated SSR pass, so its inner useAsyncData
// payloads were NOT serialized into the route's _payload.json — forcing every
// docs query to re-run client-side and boot the @nuxt/content SQLite-WASM
// engine on SPA navigation. Rendering DocsItem inline serializes those payloads
// (same as blog's <BlogPost>), so the client never queries and never loads WASM.

// `handleIndex` runs a content query (does a `<path>/readme` exist?), so it must
// be payload-cached via useAsyncData — otherwise it re-executes client-side on
// every docs navigation and boots the SQLite-WASM engine in the browser.
//
// The key MUST use the normalized path, not the raw route.fullPath: Nitro
// prerenders "/docs/desktop/" (trailing slash) while an in-app link is
// "/docs/desktop" (no slash). Keying on the raw path makes the two disagree, so
// the client misses the payload, re-runs handleIndex (and its query), and boots
// WASM. Normalizing first makes the prerender and client keys identical.
const normalizedPath = normalizePath(route.fullPath);
const { data: routeName } = await useAsyncData(
  `docs-routename-${normalizedPath}`,
  () => handleIndex(normalizedPath),
  { default: () => normalizedPath },
);
const currentCategory = extractCategory(route.fullPath) as string;

definePageMeta({
  layout: "default",
});
</script>
