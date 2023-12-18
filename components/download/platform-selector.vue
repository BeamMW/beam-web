<script lang="ts" setup>
import { SupportedPlatforms } from "@/app.config";

const { selected } = await useSelectedPlatform();
const environmentGetter = await useEnvironmentGetter();
const platformDetails = await usePlatformDetails();
</script>

<template>
  <section>
    <template v-if="!environmentGetter.isDappnet">
      <div class="px-4 sm:px-6 lg:px-8 mx-auto w-fit">
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
    </template>
    <LayoutWrapper :center="true">
      <div
        :class="`grid grid-cols-2 md:grid-cols-3 ${
          environmentGetter.isDappnet ? 'lg:grid-cols-3 py-7' : 'lg:grid-cols-5'
        } gap-12`"
      >
        <DownloadPlatformAndroid
          v-if="
            platformDetails[SupportedPlatforms.ANDROID] && !selected.android
          "
        />
        <DownloadPlatformIos
          v-if="platformDetails[SupportedPlatforms.IOS] && !selected.ios"
        />
        <DownloadPlatformDesktop
          v-if="platformDetails[SupportedPlatforms.MACOS] && !selected.macos"
          title="macOS"
          :platform="SupportedPlatforms.MACOS"
        />
        <DownloadPlatformDesktop
          v-if="
            platformDetails[SupportedPlatforms.WINDOWS] && !selected.windows
          "
          title="Windows"
          :platform="SupportedPlatforms.WINDOWS"
        />
        <DownloadPlatformDesktop
          v-if="platformDetails[SupportedPlatforms.LINUX] && !selected.linux"
          title="Linux"
          :platform="SupportedPlatforms.LINUX"
        />
        <DownloadPlatformChrome
          v-if="platformDetails[SupportedPlatforms.CHROME] && !selected.chrome"
        />
      </div>
    </LayoutWrapper>
  </section>
</template>
