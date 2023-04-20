<script lang="ts" setup>
const { t } = useI18n();
</script>
<template>
  <LayoutWrapper :center="true">
    <LayoutTitle :title="t('downloads.resources.title')" />
    <div
      class="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-6 md:gap-10"
    >
      <DownloadResourcesLink
        :title="t('downloads.resources.wallet')"
        image="desktop"
        link="https://beamx.gitbook.io/desktop-wallet-user-guide/"
        :link-text="t('downloads.resources.documentation')"
      />
      <DownloadResourcesLink
        :title="t('downloads.resources.commandlinenode')"
        image="console"
        link="https://beamx.gitbook.io/beam-node-user-guide/"
        :link-text="t('downloads.resources.documentation')"
      />
      <DownloadResourcesLink
        :title="t('downloads.resources.commandlinewallet')"
        image="console"
        link="https://beamx.gitbook.io/cli-guide/"
        :link-text="t('downloads.resources.documentation')"
      />
      <DownloadResourcesLink
        :title="t('downloads.resources.changelog')"
        image="changelog"
        link="#"
      />
    </div>
  </LayoutWrapper>
</template>
