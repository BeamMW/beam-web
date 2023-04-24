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

function removeGitbook(path: string): string {
  const regex = /(?:\.\.\/|)\.gitbook\/assets\//g;
  const replaceString = `/assets/docs/${route.params.slug[0]}/`;
  return path.replace(regex, replaceString);
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
  if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
    return withBase(removeGitbook(props.src), useRuntimeConfig().app.baseURL);
  }
  return removeGitbook(props.src);
});
</script>
