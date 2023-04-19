<template>
  <section class="bg-[#041d3c] pb-10 lg:pb-12">
    <Hero />
    <div class="py-10 lg:py-12 gap-y-10 lg:gap-y-12 flex flex-col items-center">
      <Features />
      <GetStarted :is-next-step="false" />
    </div>
    <Buy />
    <Press />
  </section>
</template>
<script type="ts" setup>
const { t } = useI18n();

const title = computed(() => t("head.title.index"));
const description = computed(() => t("head.description"));

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});
</script>
