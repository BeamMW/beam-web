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
} = platformDetails[SupportedPlatforms.IOS];
</script>
<template>
  <DownloadPlatformGet
    v-if="store"
    :highlight="highlight"
    title="iOS"
    icon="macos"
    :link="store"
  >
    <p>{{ $t("downloads.supportedversions.ios") }}</p>
  </DownloadPlatformGet>
</template>
