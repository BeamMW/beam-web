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
  links: { wallet, store, walletUniversal, changelog },
  checksums: {
    wallet: checksumWallet,
    walletUniversal: checksumWalletUniversal,
  },
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
    <span v-if="walletUniversal">&nbsp;&middot;&nbsp;</span>
    <span
      v-if="walletUniversal"
      class="border-b border-white/70 hover:border-white"
    >
      <DownloadAlternativeLink
        :title="$t('downloads.type.apkUniversal')"
        :link="walletUniversal"
        :checksum="checksumWalletUniversal"
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
        :link-apk-file="wallet"
        :checksum-apk="checksumWallet"
        :link-apk-universal-file="walletUniversal"
        :checksum-apk-universal="checksumWalletUniversal"
        :release-notes-link="changelog"
      />
    </DownloadDetailLink>
  </DownloadPlatformGet>
</template>
