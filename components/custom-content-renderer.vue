<template>
    <ContentRenderer :value="normalizedContent" v-bind="$attrs" />
</template>
  
<script lang="ts" setup>
import { computed, defineProps } from 'vue'

const props = defineProps<{
value: {
    type: Object
    required: true
}
}>()

// https://github.com/nuxt/content/issues/2000
function customStringToHtml(input: string): string {
  //const contentRefPattern = /{% content-ref url="(.+?)" %}/g;
  //const endContentRefPattern = /{% endcontent-ref %}/g;
  const hintPattern = /{% hint style="(.+?)" %}/g;
  const endHintPattern = /{% endhint %}/g;

  return input
    //.replace(contentRefPattern, '<a href="$1">')
    //.replace(endContentRefPattern, '</a>')
    .replace(hintPattern, '')
    .replace(endHintPattern, '');
}

function processObject(obj: any): any {
  if (typeof obj === 'string') {
    const stringWithoutCarriageReturns = obj.replace(/\r\n/g, '\n');
    return customStringToHtml(stringWithoutCarriageReturns);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => processObject(item));
  }

  if (typeof obj === 'object') {
    const newObj: { [key: string]: any } = {};

    for (const key in obj) {
      newObj[key] = processObject(obj[key]);
    }

    return newObj;
  }

  return obj;
}

const normalizedContent = computed(() => {
    const contentCopy = { ...props.value }
    return processObject(contentCopy)
})
</script>