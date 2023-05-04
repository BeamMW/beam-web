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

import { EventType } from "@/utils/downloadFile";

const fileUrl =
  "https://builds.beam.mw/mainnet/2023.04.14/Release/mac/Beam-Wallet-7.3.14027.5732.dmg";
const expectedFileHash =
  "96740fec95d6dfb50dc9c5d75861bca9eb54707e37bfe6477bd4a24433612ba8";

downloadFile(fileUrl, expectedFileHash, (event) => {
  if (event.type === EventType.DownloadProgress) {
    console.log("Download progress:", event);
  } else if (event.type === EventType.HashVerification) {
    console.log("Hash verification started");
  }
}).catch((error) => {
  console.error("Error downloading and verifying file:", error);
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
