<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  links: {
    type: Array as PropType<
      Array<{
        text: string;
        href: string;
        onClick?: () => void;
        highlight?: string;
      }>
    >,
    required: true,
  },
});

const handleClick = (onClick: () => void, e: MouseEvent) => {
  if (onClick) {
    e.preventDefault();
    onClick();
  }
};
</script>

<template>
  <div>
    <h4>{{ title }}</h4>
    <div class="mt-3 grid space-y-3 text-sm">
      <p v-for="(link, index) in links" :key="index">
        <LayoutLink
          :to="link.href"
          class="inline capitalize transition text-white/70 hover:text-white"
          :target="getLinkTarget(link.href)"
          @click="
            typeof link.onClick == 'function' &&
              handleClick(link.onClick, $event)
          "
          >{{ link.text }}</LayoutLink
        >
        <span
          v-if="link.highlight"
          class="inline font-bold text-white text-xs bg-[#AB37E6] rounded-full py-1.5 px-2 ml-2 whitespace-nowrap"
          >{{ link.highlight }}</span
        >
      </p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
h4 {
  @apply font-bold uppercase tracking-wider text-white/70;
}
</style>
