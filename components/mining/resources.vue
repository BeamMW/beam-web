<script lang="ts" setup>
import { ExternalLinks, ExternalLinksTitle } from "~/app.config";
</script>
<template>
  <LayoutWrapper :center="true">
    <LayoutTitle
      :title="$t('downloads.resources.title')"
      gradient-color="specialGradientGreen"
    />
    <div class="grid lg:grid-cols-2 items-center gap-6 md:gap-10 text-white">
      <ResourcesLink
        :title="$t('mining.resources.calculator')"
        image="mining/resources/mining"
        :link="ExternalLinks.MINING_CALCULATOR"
        link-text="WhatToMine"
        class="link-resources"
      />
      <ResourcesLink
        :title="$t('mining.resources.support')"
        image="mining/resources/help"
        :link="ExternalLinks.MINING_SUPPORT"
        :link-text="ExternalLinksTitle.TELEGRAM"
        class="link-resources"
      />
    </div>
  </LayoutWrapper>
</template>

<style scoped>
.link-resources {
  @apply bg-[#012a08]/50 hover:bg-[#012a08] focus:bg-[#012a08] focus:ring-offset-[#012a08] focus:ring-beam-green-dark text-beam-green-dark;
}
</style>
