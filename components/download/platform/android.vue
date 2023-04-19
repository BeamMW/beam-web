<script lang="ts" setup>
import { PlatformDetails, SupportedPlatforms } from "@/app.config";

const { t } = useI18n();
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
} = PlatformDetails[SupportedPlatforms.ANDROID];
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
        :title="t('downloads.type.apk')"
        :link="wallet"
      />
    </span>
    <LayoutMiddotSeparator />
    <DownloadDetailLink
      v-if="version && date && wallet && checksumWallet"
      :title="t('downloads.detailswindow.titles.android')"
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
