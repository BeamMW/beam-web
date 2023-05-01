<script lang="ts" setup>
const { t, localeProperties } = useI18n();

defineProps({
  version: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  linkPlayStore: {
    type: String,
    required: true,
  },
  linkApkFile: {
    type: String,
    required: true,
  },
  checksumApk: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <section>
    <div>
      <h6 class="text-base font-bold">
        {{ $t("downloads.detailswindow.latestversion") }}
      </h6>
      <p>
        {{ version }} ({{
          convertUNIXTimestampToLocaleDate(date, localeProperties.iso)
        }}) &middot;
        <span class="text-beam-blue font-bold">
          <DownloadAlternativeLink
            :link="linkPlayStore"
            :title="t('downloads.type.playstore')"
            :disable-arrow="true"
          />
        </span>
        &middot;
        <span class="text-beam-blue font-bold">
          <DownloadAlternativeLink
            :link="linkApkFile"
            :title="t('downloads.type.apk')"
          />
        </span>
      </p>
    </div>
    <div v-if="checksumApk" class="pt-3">
      <h6 class="font-bold">
        {{ $t("downloads.detailswindow.checksums.apk") }}
      </h6>
      <LayoutCopyToClipboard :text="checksumApk">
        {{ checksumApk }}
      </LayoutCopyToClipboard>
    </div>
    <div class="pt-3">
      <DownloadChangelogLink :version="version" />
    </div>
  </section>
</template>
