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
  links: { store },
} = platformDetails[SupportedPlatforms.CHROME];
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
