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
  links: { wallet, cli, node, api },
  checksums: {
    wallet: walletChecksum,
    cli: cliChecksum,
    node: nodeChecksum,
    api: apiChecksum,
  },
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
    :checksum="walletChecksum"
  >
    <p>{{ $t(`downloads.supportedversions.${platform}`) }}</p>
    <span class="border-b border-white/70 hover:border-white">
      <DownloadAlternativeLink
        :title="t('downloads.type.node')"
        :link="node"
        :checksum="nodeChecksum"
      />
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
        :link-wallet-api-file="api"
        :checksum-wallet="walletChecksum"
        :checksum-wallet-cli="cliChecksum"
        :checksum-node="nodeChecksum"
        :checksum-wallet-api="apiChecksum"
      />
    </DownloadDetailLink>
  </DownloadPlatformGet>
</template>
