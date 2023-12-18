<template>
  <NuxtLayout>
    <ErrorComponent :error="error" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
});
</script>
