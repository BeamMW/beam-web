<template>
  <div>
    <LayoutLink
      :to="processPath(article._path)"
      :class="`rtl:pr-2.5 ltr:pl-2.5 text-md opacity-60 hover:opacity-90 transition-opacity ${
        routeName == article._path
          ? `rtl:border-r-2 ltr:border-l-2 border-beam-blue text-beam-blue font-bold !opacity-90`
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
          :id="`link-${link.id}`"
          class="text-base text-white/60 hover:text-white/90 mt-2 transition-colors"
          :href="`${processPath(article._path)}#${link.id}`"
          @click.stop.prevent="smoothScrollToHash(link.id)"
          >{{ link.text }}</a
        >
        <ul v-if="link.children" class="ml-3">
          <li
            v-for="(childLink, childIndex) in link.children"
            :key="childIndex"
          >
            <a
              :id="`link-${childLink.id}`"
              class="text-sm text-white/60 hover:text-white/90 transition-colors"
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

<style lang="postcss">
aside a.navigation-selected {
  @apply text-beam-blue hover:text-beam-blue;
}
</style>
