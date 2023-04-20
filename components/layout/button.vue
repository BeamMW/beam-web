<script lang="ts" setup>
const props = defineProps({
  buttonLink: {
    type: String,
    required: false,
    default: "/",
  },
  accentColor: {
    type: String,
    required: true,
  },
  big: {
    type: Boolean,
    required: false,
    default: false,
  },
  as: {
    type: String,
    required: false,
    default: "link",
  },
});

const classToSet = computed(
  () =>
    `${
      props.big ? "big " : "small"
    } select-none flex gap-2 justify-center items-center hover:bg-${
      props.accentColor
    } border-2 border-${props.accentColor} text-${
      props.accentColor
    } hover:text-black/70 font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-${
      props.accentColor
    } focus:ring-offset-2 transition focus:ring-offset-[#042248] capitalize`
);
</script>

<template>
  <NuxtLink
    v-if="as == 'link'"
    :class="classToSet"
    :to="buttonLink"
    :target="
      buttonLink.startsWith('/') || buttonLink.startsWith('#')
        ? '_self'
        : '_blank'
    "
    v-bind="$attrs"
  >
    <slot></slot>
  </NuxtLink>
  <button v-else-if="props.as == 'button'" type="button" :class="classToSet">
    <slot></slot>
  </button>
</template>

<style scoped lang="postcss">
.small {
  @apply text-base py-3 px-4;
}
.big {
  @apply text-lg py-3 px-4;
}
</style>
