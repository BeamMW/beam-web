<template>
  <img
    :src="refinedSrc"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    class="h-auto w-auto select-none"
  />
</template>

<script setup lang="ts">
import { withBase } from "ufo";
import { useRuntimeConfig, computed } from "#imports";

const route = useRoute();

const gitbookRegex = /(?:\.\.\/|)\.gitbook\/assets\//g;

function removeGitbook(path: string): string {
  const replaceString = `/assets/docs/${route.params.slug[0]}/`;
  return path.replace(gitbookRegex, replaceString);
}

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});
const refinedSrc = computed(() => {
  if (linkType(props.src) !== LinkTypes.INTERNAL) {
    return props.src;
  }
  // Only gitbook-style paths need the baseURL prefix; already-absolute paths
  // (e.g. /images/...) are served directly from public/ and would otherwise
  // break in dev by pointing at the production domain.
  if (props.src.includes(".gitbook/assets/")) {
    return withBase(
      removeGitbook(props.src),
      useRuntimeConfig().public.baseURL,
    );
  }
  return props.src;
});
</script>
