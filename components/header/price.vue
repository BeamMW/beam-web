<template>
  <span v-show="data && data.usd" class="flex gap-1">
    <span
      class="text-beam-green-dark pointer-events-none select-none flex gap-1"
      >1
      <Icon
        class="w-6 h-6 inline-block"
        name="get-started/beam-currency"
        :as-image="true"
        loading="lazy"
      />
      = </span
    ><span :class="`price transition-colors duration-1000 ${flickerClass}`"
      >${{ data && data.usd }}</span
    >
  </span>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

const { data, refresh } = await useAsyncData("price", () =>
  $fetch("/api/price")
);

const refreshInterval = 10 * 1000; // seconds
let intervalId: NodeJS.Timer | undefined;

const prevPrice = ref(0);
const flickerClass = ref("");

watch(data, () => {
  if (data.value) {
    flickerClass.value = data.value.usd > prevPrice.value ? "green" : "red";
    setTimeout(() => {
      if (flickerClass.value) {
        flickerClass.value = "";
      }
    }, 1000);
    prevPrice.value = data.value.usd;
  }
});

onMounted(() => {
  intervalId = setInterval(() => {
    refresh();
  }, refreshInterval);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style lang="postcss" scoped>
span.price {
  @apply text-white;
  &.green {
    @apply text-green-500;
  }
  &.red {
    @apply text-red-400;
  }
}
</style>
