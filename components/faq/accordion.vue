<template>
  <div class="accordion-group flex flex-col gap-4">
    <div v-for="(item, index) in items" :key="index">
      <button
        :class="buttonClasses(index)"
        class="hs-accordion-toggle select-none group inline-flex items-center justify-between w-full md:text-lg font-semibold text-left transition"
        @click="toggle(index)"
      >
        {{ $t(item.title) }}
        <div :class="arrowClasses(index)" class="transition">
          <Icon class="block w-3 h-3 text-inherit" name="layout/arrow-right" />
        </div>
      </button>
      <div
        ref="accordionContents"
        class="hs-accordion-content w-full overflow-hidden transition-[height] will-change-transform duration-300 text-white/80"
        :style="{ maxHeight: getMaxHeight(index) }"
      >
        <p class="pt-2">
          <MarkdownRenderer :t-key="item.content" />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

interface AccordionItem {
  title: string;
  content: string;
}

defineProps({
  items: {
    type: Array as () => AccordionItem[],
    required: true,
  },
});

const activeIndex = ref(-1);
const accordionContents = ref<HTMLElement[]>([]);

const toggle = (index: number) => {
  if (activeIndex.value === index) {
    activeIndex.value = -1;
  } else {
    activeIndex.value = index;
  }
};

const getMaxHeight = (index: number) => {
  if (activeIndex.value === index) {
    return `${accordionContents.value[index].scrollHeight}px`;
  }
  return "0";
};

const buttonClasses = (index: number) => ({
  "!text-beam-blue": activeIndex.value === index,
  "text-white/80": activeIndex.value !== index,
  "hover:text-white": activeIndex.value !== index,
});

const arrowClasses = (index: number) => ({
  "!rotate-90": activeIndex.value === index,
  "!text-beam-blue": activeIndex.value === index,
  "!opacity-100": activeIndex.value === index,
  "opacity-60": activeIndex.value !== index,
});

watch(
  activeIndex,
  () => {
    accordionContents.value.forEach((el, index) => {
      el.style.maxHeight = getMaxHeight(index);
    });
  },
  { immediate: true }
);
</script>

<style scoped>
.hs-accordion-content {
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  max-height: 0;
}
</style>
