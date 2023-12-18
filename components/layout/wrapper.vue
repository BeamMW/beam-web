<script lang="ts" setup>
defineProps({
  center: {
    type: Boolean,
    required: false,
    default: true,
  },
});
</script>
<template>
  <div :class="`max-w-7xl px-4 xl:px-0${center ? ' mx-auto' : ''}`">
    <slot />
  </div>
</template>
