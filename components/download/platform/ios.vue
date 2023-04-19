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
} = PlatformDetails[SupportedPlatforms.IOS];
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
