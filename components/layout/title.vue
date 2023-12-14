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
  <div :class="[reserveSpace ? 'max-w-5xl mx-auto flex justify-center' : '']">
    <h2
      :class="[
        'tracking-tight leading-none capitalize select-none font-bold specialGradient px-4 md:px-0 inline',
        gradientColor,
        large ? 'text-3xl lg:text-5xl' : 'text-3xl md:text-4xl',
        smallPadding ? 'mb-3 lg:mb-5' : 'mb-8 lg:mb-10',
      ]"
    >
      {{ title }}
    </h2>
  </div>
</template>
