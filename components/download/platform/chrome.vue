<script lang="ts" setup>
import { PlatformDetails, SupportedPlatforms } from "@/app.config";

defineProps({
  highlight: {
    type: Boolean,
    required: false,
  },
});

const {
  links: { store },
} = PlatformDetails[SupportedPlatforms.CHROME];
</script>
<template>
  <DownloadPlatformGet
    v-if="store"
    :highlight="highlight"
    title="Chrome"
    icon="chrome"
    flag="Beta"
    :link="store"
  >
    <p>Chrome, Brave, Edge</p>
  </DownloadPlatformGet>
</template>
