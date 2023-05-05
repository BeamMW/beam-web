<script setup lang="ts">
const { t } = useI18n();

const environmentGetter = await useEnvironmentGetter();

const title = computed(() => t("head.title.downloads"));
const description = computed(() => t("head.descriptions.downloads"));

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});
</script>

<template>
  <section class="bg-[#041D3C]">
    <section class="pt-10 lg:pt-12 bg-page-radial-gradient">
      <LayoutTitle
        :title="`${$t('downloads.downloadWallet')}${
          environmentGetter.isDappnet ? ` (Dappnet)` : ''
        }`"
      />
      <div class="min-h-[530px]">
        <ClientOnly>
          <DownloadPlatformSelector />
        </ClientOnly>
      </div>
    </section>

    <div class="py-10 lg:py-12">
      <GetStarted :is-next-step="true" />
      <div class="pt-8 lg:pt-10">
        <DownloadResources />
      </div>
    </div>
  </section>
</template>
