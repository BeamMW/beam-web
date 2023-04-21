<script setup lang="ts">
import { EnvironmentType, currentEnvironment } from "~/app.config";

const { t } = useI18n();

const title = computed(() => t("head.title.downloads"));
const description = computed(
  () =>
    "Download the Beam wallet for various devices, acquire BEAM, explore private DeFi transactions, and access FAQs and resources."
);

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
          currentEnvironment !== EnvironmentType.MAINNET
            ? ` (${currentEnvironment})`
            : ''
        }`"
      />
      <ClientOnly>
        <DownloadPlatformSelector />
      </ClientOnly>
    </section>

    <div class="py-10 lg:py-12">
      <GetStarted :is-next-step="true" />
      <div class="pt-8 lg:pt-10">
        <DownloadResources />
      </div>
    </div>
  </section>
</template>
