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

  // Add the current path to the processed path
  const finalPath = joinPath(currentPath, pathWithoutMd);

  return finalPath;
}
</script>

<template>
  <NuxtLink :href="processPath(href)" :target="target">
    <slot />
  </NuxtLink>
</template>
