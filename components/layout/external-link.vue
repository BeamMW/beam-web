<template>
  <span
    class="inline-flex items-center hover:opacity-70 transition-opacity text-inherit gap-1"
  >
    <span>
      <slot></slot>
    </span>
    <Icon
      name="layout/external"
      class="inline-block h-[1.32rem] w-[1.32rem]"
      v-if="linkType(to) == LinkTypes.EXTERNAL"
    ></Icon>
  </span>
</template>
<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>
