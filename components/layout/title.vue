<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  reserveSpace: {
    type: Boolean,
    required: false,
    default: true,
  },
  gradientColor: {
    type: String,
    required: false,
    default: "specialGradientBlue",
  },
  large: {
    type: Boolean,
    required: false,
    default: false,
  },
  smallPadding: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
<template>
  <h2
    :class="[
      'tracking-tight leading-none capitalize select-none text-center font-bold specialGradient px-4 md:px-0',
      reserveSpace ? 'max-w-5xl mx-auto' : '',
      gradientColor,
      large ? 'text-3xl lg:text-5xl' : 'text-3xl md:text-4xl',
      smallPadding ? 'pb-3 lg:pb-5' : 'pb-8 lg:pb-10',
    ]"
  >
    {{ title }}
  </h2>
</template>
