<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <h2
    class="text-center max-w-5xl mx-auto px-4 md:px-0 pb-8 lg:pb-10 text-xl md:text-2xl uppercase font-bold tracking-[.25em]"
  >
    {{ title }}
  </h2>
</template>
