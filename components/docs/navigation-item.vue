<template>
  <div>
    <LayoutLink
      :to="processPath(article._path)"
      :class="`pl-3 text-lg opacity-60 hover:opacity-90 transition-opacity ${
        routeName == article._path
          ? `border-l border-white font-bold !opacity-90`
          : ''
      } `"
      >{{ article.title }}</LayoutLink
    >
    <template
      v-if="
        routeName == article._path &&
        article.body &&
        article.body.toc &&
        article.body.toc.links
      "
    >
      <ul
        v-for="(link, index) in article.body.toc.links"
        :key="index"
        class="list-none ml-5"
      >
        <LayoutLink
          v-if="link.text != article.title"
          class="text-base opacity-60 hover:opacity-90 mt-2"
          :to="processPath(article._path) + '#' + link.id"
          >{{ link.text }}</LayoutLink
        >
        <ul v-if="link.children" class="ml-3 mt-1 text-sm">
          <li
            v-for="(childLink, childIndex) in link.children"
            :key="childIndex"
          >
            <LayoutLink
              class="opacity-60 hover:opacity-90"
              :to="processPath(article._path) + '#' + childLink.id"
              >{{ childLink.text }}</LayoutLink
            >
          </li>
        </ul>
      </ul>
    </template>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
});

function processPath(path: string) {
  return path.replace("/readme", "");
}
</script>
