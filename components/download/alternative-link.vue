<script lang="ts" setup>
defineProps({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  disableArrow: {
    type: Boolean,
    required: false,
  },
});
</script>
<template>
  <NuxtLink
    :to="link"
    target="_blank"
    class="hover:text-white transition-colors"
  >
    <span class="inline-flex items-center"
      >{{ title }}&nbsp;
      <Icon
        v-if="!disableArrow"
        class="h-3 w-3 select-none pointer-events-none"
        name="download/get-arrow-inline"
      />
    </span>
  </NuxtLink>
</template>
