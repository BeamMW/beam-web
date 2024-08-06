<template>
  <ContentRenderer :value="normalizedContent" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import type { ParsedContent } from "@nuxt/content/dist/runtime/types/index";

const props = defineProps<{
  value: ParsedContent;
}>();

// https://github.com/nuxt/content/issues/2000
function customStringToHtml(input: string): string {
  const urlEmbed = /{% embed url="/g;
  const urlEmbedEnd = /" %}/g;
  const hintPattern = /{% hint style="(.+?)" %}/g;
  const endHintPattern = /{% endhint %}/g;

  return input
    .replace(urlEmbed, "")
    .replace(urlEmbedEnd, "")
    .replace(hintPattern, "")
    .replace(endHintPattern, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function processObject(obj: unknown): any {
  if (typeof obj === "string") {
    const stringWithoutCarriageReturns = obj.replace(/\r\n/g, "\n");
    return customStringToHtml(stringWithoutCarriageReturns);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => processObject(item));
  }

  if (typeof obj === "object") {
    const newObj: Record<string, unknown> = {};

    for (const key in obj as Record<string, unknown>) {
      newObj[key] = processObject((obj as Record<string, unknown>)[key]);
    }

    return newObj;
  }

  return obj;
}

const normalizedContent = computed(() => {
  const contentCopy = { ...props.value };
  return processObject(contentCopy);
});
</script>
