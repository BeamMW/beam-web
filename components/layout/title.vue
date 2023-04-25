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
    class="text-center w-full pb-8 lg:pb-10 text-2xl uppercase font-bold tracking-[.25em]"
  >
    {{ title }}
  </h2>
</template>
