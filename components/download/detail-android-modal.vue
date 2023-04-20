<script lang="ts" setup>
const { t } = useI18n();

defineProps({
  version: {
    type: String,
    required: true,
  },
  date: {
    type: String,
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
        {{ version }} ({{ date }}) &middot;
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
  </section>
</template>
