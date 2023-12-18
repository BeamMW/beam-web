<script lang="ts" setup>
defineProps({
  center: {
    type: Boolean,
    required: false,
  },
});
</script>
<template>
  <div :class="`max-w-7xl px-4 sm:px-0${center ? ' mx-auto' : ''}`">
    <slot />
  </div>
</template>
