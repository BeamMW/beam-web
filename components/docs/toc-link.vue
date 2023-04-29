<template>
  <li>
    <a
      :id="`link-${link.id}`"
      class="text-base text-white/60 hover:text-white/90 mt-2 transition-colors"
      :href="`${localePath(articlePath)}#${link.id}`"
      @click.stop.prevent="smoothScrollToHash(link.id)"
    >
      {{ link.text }}
    </a>
    <ul v-if="link.children" class="ml-3">
      <li v-for="(childLink, childIndex) in link.children" :key="childIndex">
        <a
          :id="`link-${childLink.id}`"
          class="text-sm text-white/60 hover:text-white/90 transition-colors"
          :href="`${localePath(articlePath)}#${childLink.id}`"
          @click.stop.prevent="smoothScrollToHash(childLink.id)"
        >
          {{ childLink.text }}
        </a>
      </li>
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { scrollToComponent } from "~/utils/scrollToComponent";
const localePath = useLocalePath();

defineProps({
  link: {
    type: Object,
    required: true,
  },
  articlePath: {
    type: String,
    required: true,
  },
});

const smoothScrollToHash = (hash: string) => {
  const targetElement = document.querySelector(`#${hash}`);
  if (targetElement) {
    scrollToComponent(targetElement as HTMLElement);
  }
};
</script>
