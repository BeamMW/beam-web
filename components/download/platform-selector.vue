<script lang="ts" setup>
import { SupportedPlatforms } from "@/app.config";

const { selected } = useSelectedPlatform();
</script>

<template>
  <div class="max-w-[64rem] px-4 sm:px-6 lg:px-8 mx-auto w-fit pt-6 lg:pt-8">
    <DownloadPlatformAndroid v-if="selected.android" :highlight="true" />
    <DownloadPlatformIos v-else-if="selected.ios" :highlight="true" />
    <DownloadPlatformDesktop
      v-else-if="selected.macos"
      title="macOS"
      :platform="SupportedPlatforms.MACOS"
      :highlight="true"
    />
    <DownloadPlatformDesktop
      v-else-if="selected.windows"
      title="Windows"
      :platform="SupportedPlatforms.WINDOWS"
      :highlight="true"
    />
    <DownloadPlatformDesktop
      v-else-if="selected.linux"
      title="Linux"
      :platform="SupportedPlatforms.LINUX"
      :highlight="true"
    />
    <DownloadPlatformChrome v-else-if="selected.chrome" :highlight="true" />
  </div>

  <DownloadDivider />

  <LayoutWrapper :center="true">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
      <DownloadPlatformAndroid v-if="!selected.android" />
      <DownloadPlatformIos v-if="!selected.ios" />
      <DownloadPlatformDesktop
        v-if="!selected.macos"
        title="macOS"
        :platform="SupportedPlatforms.MACOS"
      />
      <DownloadPlatformDesktop
        v-if="!selected.windows"
        title="Windows"
        :platform="SupportedPlatforms.WINDOWS"
      />
      <DownloadPlatformDesktop
        v-if="!selected.linux"
        title="Linux"
        :platform="SupportedPlatforms.LINUX"
      />
      <DownloadPlatformChrome v-if="!selected.chrome" />
    </div>
  </LayoutWrapper>
</template>
