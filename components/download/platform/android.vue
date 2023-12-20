<script lang="ts" setup>
import { SupportedPlatforms } from "@/app.config";
const platformDetails = await usePlatformDetails();

defineProps({
  highlight: {
    type: Boolean,
    required: false,
  },
});

const {
  links: { wallet, store },
  checksums: { wallet: checksumWallet },
  version,
  date,
} = platformDetails[SupportedPlatforms.ANDROID];
</script>

<template>
  <DownloadPlatformGet
    v-if="store"
    :highlight="highlight"
    title="Android"
    icon="android"
    :link="store"
  >
    <p>{{ $t("downloads.supportedversions.android") }}</p>
    <span class="border-b border-white/70 hover:border-white">
      <DownloadAlternativeLink
        v-if="wallet"
        :title="$t('downloads.type.apk')"
        :link="wallet"
        :checksum="checksumWallet"
      />
    </span>
    <span>&nbsp;&middot;&nbsp;</span>
    <DownloadDetailLink
      v-if="version && date && wallet && checksumWallet"
      :title="$t('downloads.detailswindow.titles.android')"
    >
      <DownloadDetailAndroidModal
        :version="version"
        :date="date"
        :link-play-store="store"
        :link-apk-file="wallet"
        :checksum-apk="checksumWallet"
      />
    </DownloadDetailLink>
  </DownloadPlatformGet>
</template>
