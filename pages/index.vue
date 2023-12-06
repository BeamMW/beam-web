<script lang="ts" setup>
// As required by Press and Roadmap
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const { t } = useI18n();

const description = computed(() => t("head.descriptions.index"));

useSeoMeta({
  title: "",
  description,
  ogTitle: "",
  ogDescription: description,
});
</script>

<template>
  <section class="bg-[#041d3c] pb-10 lg:pb-12">
    <IndexHero />
    <div class="pb-10 lg:pb-12 gap-y-10 lg:gap-y-12 flex flex-col items-center">
      <Features />
      <GetStarted :is-next-step="false" />
    </div>
    <Buy />
    <Roadmap />
    <Press />
  </section>
</template>
