<script lang="ts" setup>
defineProps({
  center: {
    type: Boolean,
    required: false,
  },
});
</script>
<template>
  <div :class="`max-w-[85rem] px-4 sm:px-6 lg:px-8${center ? ' mx-auto' : ''}`">
    <slot />
  </div>
</template>
