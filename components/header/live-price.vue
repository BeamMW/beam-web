<template>
  <transition
    name="price"
    enter-from-class="opacity-0"
    enter-active-class="transition-opacity duration-500 ease-out"
    leave-from-class="opacity-100"
    leave-active-class="transition-opacity duration-500 ease-out opacity-0"
  >
    <span v-show="data && data.usd" class="flex gap-1">
      <span
        class="text-beam-green-dark pointer-events-none select-none flex gap-1"
        >1
        <Icon
          class="w-6 h-6 inline-block"
          name="get-started/beam-currency"
          :as-image="false"
          loading="lazy"
        />
        = </span
      ><span :class="`price transition-colors duration-1000 ${flickerClass}`">{{
        data && localizePrice(data.usd, localeProperties.iso)
      }}</span>
    </span>
  </transition>
</template>
<script setup lang="ts">
import { CACHE_MAX_AGE } from "@/composables/useFetchPrice";
const { localeProperties } = useI18n();

const { data, refresh } = await useLazyAsyncData("price", () =>
  useFetchPrice(),
);

let intervalId: NodeJS.Timer | undefined;
const prevPrice = ref(0);
const flickerClass = ref("");

watch(data, () => {
  if (data.value) {
    if (data.value.usd !== prevPrice.value) {
      flickerClass.value = data.value.usd > prevPrice.value ? "green" : "red";
      setTimeout(() => {
        if (flickerClass.value) {
          flickerClass.value = "";
        }
      }, 1000);
      prevPrice.value = data.value.usd;
    }
  }
});

onMounted(() => {
  intervalId = setInterval(() => refresh(), CACHE_MAX_AGE * 1000 + 10);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
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
