<template>
  <div>
    <LayoutLink
      :to="processPath(article._path)"
      :class="`rtl:pr-2.5 ltr:pl-2.5 text-md opacity-60 hover:opacity-90 transition-opacity ${
        routeName == article._path
          ? `rtl:border-r ltr:border-l border-beam-pink font-bold !opacity-90`
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
        <a
          v-if="link.text != article.title"
          class="text-base opacity-60 hover:opacity-90 mt-2"
          :href="`${processPath(article._path)}#${link.id}`"
          @click.stop.prevent="smoothScrollToHash(link.id)"
          >{{ link.text }}</a
        >
        <ul v-if="link.children" class="ml-3 text-sm">
          <li
            v-for="(childLink, childIndex) in link.children"
            :key="childIndex"
          >
            <a
              class="opacity-60 hover:opacity-90"
              :href="`${processPath(article._path)}#${childLink.id}`"
              @click.stop.prevent="smoothScrollToHash(childLink.id)"
              >{{ childLink.text }}</a
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

const smoothScrollToHash = (hash: string) => {
  // Find the corresponding element on the page
  const targetElement = document.querySelector(`#${hash}`);

  // If the element exists, smoothly scroll to it
  if (targetElement) {
    scrollToComponent(targetElement as HTMLElement);
  }
};

function processPath(path: string) {
  return path.replace("/readme", "");
}
</script>
