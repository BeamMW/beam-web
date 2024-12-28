<script lang="ts" setup>
// As required by Press and Roadmap
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const { t } = useI18n();

const description = computed(() => t("head.descriptions.index"));

useSeoMeta({
  description,
  ogDescription: description,
});

definePageMeta({
  layout: "default",
});
</script>

<template>
  <section class="pb-10 lg:pb-12">
    <IndexHero />
    <section
      class="pb-10 lg:pb-12 gap-y-10 lg:gap-y-12 flex flex-col items-center"
    >
      <Features />
      <GetStarted :is-next-step="false" />
    </section>
    <Buy />
    <Roadmap />
    <Hardfork />
    <Press />
  </section>
</template>
