<script lang="ts" setup>
const { t } = useI18n();

const title = computed(() => t("mining.title"));
const description = computed(() => t("head.description"));

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});

useHead({
  bodyAttrs: {
    class: "!bg-[#00150B]",
  },
});
</script>
<template>
  <div class="bg-page-radial-gradient-dark-green">
    <div
      class="flex max-w-2xl px-4 sm:px-6 lg:px-8 mx-auto flex-col items-center justify-center space-y-6 pt-16 text-center"
    >
      <div class="w-full flex flex-col md:flex-row justify-evenly items-center">
        <Icon
          name="mining/intro"
          :as-image="true"
          loading="lazy"
          class="w-64 h-64 mb-2 select-none pointer-events-none"
          alt="Beam Girl"
        />
        <h1 class="text-left text-2xl uppercase font-bold tracking-[.25em]">
          {{ $t("mining.title") }}
        </h1>
      </div>

      <h2 class="text-xl text-white/90 pt-6">
        <MarkdownRenderer tKey="mining.introduction" />
      </h2>

      <p class="my-5 text-lg text-white/90">
        {{ $t("mining.details") }}
      </p>

      <div>
        <LayoutButton
          button-link="https://beamx.gitbook.io/beam-mining/"
          :big="true"
          accent-color="beam-green-dark"
        >
          <Icon
            name="get-started/beam-currency"
            :as-image="true"
            loading="lazy"
            class="h-7 w-auto"
          />
          {{ $t("mining.button") }}
        </LayoutButton>
      </div>
    </div>

    <LayoutWrapper :center="true" class="pt-10 lg:pt-12">
      <LayoutTitle title="Mining softwares" />
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="col-span-1">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div class="col-span-1 bg-green-500 p-4">
              Inner Grid 1 - Column 1
            </div>
            <div class="col-span-1 bg-green-500 p-4">
              Inner Grid 1 - Column 2
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div class="col-span-1 bg-blue-500 p-4">
              Inner Grid 2 - Column 1
            </div>
            <div class="col-span-1 bg-blue-500 p-4">
              Inner Grid 2 - Column 2
            </div>
          </div>
        </div>
      </div>

      <Icon
        name="mining/amd"
        :as-image="true"
        loading="lazy"
        class="h-7 w-auto"
      />
    </LayoutWrapper>

    <MiningResources class="py-10 lg:py-12" />
  </div>
</template>
