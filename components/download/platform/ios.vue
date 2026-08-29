<script lang="ts" setup>
import { SupportedPlatforms } from "@/app.config";
const platformDetails = await usePlatformDetails();

defineProps({
  highlight: {
    type: Boolean,
    required: false,
  },
});

const { isEuRegion } = useEuRegion();

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
    <p v-if="isEuRegion" class="text-blue-50/70 text-sm pt-2">
      {{ $t("downloads.iosEuNotice") }}
    </p>
  </DownloadPlatformGet>
</template>
