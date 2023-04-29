<template>
  <div>
    <LayoutLink
      :to="processPath(article._path)"
      :class="`rtl:pr-2.5 ltr:pl-2.5 text-md opacity-60 hover:opacity-90 transition-opacity ${
        routeName == article._path
          ? 'rtl:border-r-2 ltr:border-l-2 border-beam-blue text-beam-blue font-bold !opacity-90'
          : ''
      } `"
    >
      {{ article.title }}
    </LayoutLink>
    <template v-if="routeName == article._path && hasTocLinks">
      <ul
        v-for="(link, index) in article.body.toc.links"
        :key="index"
        class="list-none ml-5"
      >
        <DocsTocLink
          v-if="link.text != article.title"
          :link="link"
          :article-path="processPath(article._path)"
        />
      </ul>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
});

const hasTocLinks =
  props.article.body && props.article.body.toc && props.article.body.toc.links;

function processPath(path: string) {
  return path.replace("/readme", "");
}
</script>

<style lang="postcss">
aside a.navigation-selected {
  @apply text-beam-blue hover:text-beam-blue;
}
</style>
