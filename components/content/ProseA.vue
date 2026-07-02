<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: undefined,
    required: false,
  },
});

function processPath(inputPath: string): string {
  // Check if the inputPath is a relative path
  const isRelativePath = !/^(?:[a-zA-Z][a-zA-Z0-9+.-]*:|\/)/.test(inputPath);

  if (!isRelativePath) {
    // If it's not a relative path, don't process it
    return inputPath;
  }

  // Remove ".md" extension if it exists
  const pathWithoutMd = inputPath.replace(/\.md(?=#|$)/, "");

  // Get the current path in the browser
  const route = useRoute();
  const currentPath = route.path;

  // GitBook "current directory" links that only carry an anchor — "./#foo",
  // ".#foo", "#foo", "./" — refer to the current page. Resolve them to the
  // current route plus the hash directly. Passing them through joinPath emits a
  // "/./" segment that normalizes to a trailing-slash URL (e.g. /docs/ecosystem/),
  // which isn't prerendered: it 404s on reload and, on SPA nav, re-runs a
  // client-side content query that boots the SQLite-WASM engine.
  const samePage = pathWithoutMd.match(/^\.?\/?(#.*)?$/);
  if (samePage) {
    return `${currentPath.replace(/\/$/, "")}${samePage[1] ?? ""}`;
  }

  // Drop a leading "./" so joinPath doesn't leave a "/./" in the result.
  return joinPath(currentPath, pathWithoutMd.replace(/^\.\//, ""));
}
</script>

<template>
  <LayoutLink :href="processPath(href)">
    <slot />
  </LayoutLink>
</template>
