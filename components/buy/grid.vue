<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="grid md:grid-cols-5 w-full md:max-w-7xl gap-4 md:gap-8">
    <div class="md:col-span-1">
      <div class="text-left text-lg font-bold">
        <span class="h-[2.375rem]">{{ title }}</span>
      </div>
    </div>
    <div class="md:col-span-4">
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
