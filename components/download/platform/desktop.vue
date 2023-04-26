<script lang="ts" setup>
import { SupportedPlatforms } from "@/app.config";
const platformDetails = await usePlatformDetails();

const { t } = useI18n();

const props = defineProps({
  platform: {
    type: String as () => SupportedPlatforms,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  highlight: {
    type: Boolean,
    required: false,
  },
});

const {
  version,
  date,
  links: { wallet, cli, node },
  checksums: { wallet: walletChecksum, cli: cliChecksum, node: nodeChecksum },
} = platformDetails[props.platform] ?? {};
</script>
<template>
  <DownloadPlatformGet
    v-if="
      version &&
      date &&
      wallet &&
      cli &&
      node &&
      walletChecksum &&
      cliChecksum &&
      nodeChecksum &&
      platform &&
      title
    "
    :highlight="highlight"
    :title="title"
    :icon="platform"
    :link="wallet"
  >
    <p>{{ $t(`downloads.supportedversions.${platform}`) }}</p>
    <span class="border-b border-white/70 hover:border-white">
      <DownloadAlternativeLink :title="t('downloads.type.node')" :link="node" />
    </span>
    <span>&nbsp;&middot;&nbsp;</span>
    <DownloadDetailLink
      :title="t(`downloads.detailswindow.titles.${platform}`)"
    >
      <DownloadDetailDesktopModal
        :version="version"
        :date="date"
        :link-wallet-file="wallet"
        :link-wallet-cli-file="cli"
        :link-node-file="node"
        :checksum-wallet="walletChecksum"
        :checksum-wallet-cli="cliChecksum"
        :checksum-node="nodeChecksum"
      />
    </DownloadDetailLink>
  </DownloadPlatformGet>
</template>
