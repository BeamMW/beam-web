<script lang="ts" setup>
const { t, localeProperties } = useI18n();

defineProps({
  version: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
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
  linkApkUniversalFile: {
    type: String,
    required: false,
    default: "",
  },
  checksumApkUniversal: {
    type: String,
    required: false,
    default: "",
  },
  releaseNotesLink: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
<template>
  <section>
    <div>
      <h6 class="text-base font-bold text-white">
        {{ $t("downloads.detailswindow.latestversion") }}
      </h6>
      <p>
        {{ version }} ({{
          convertUNIXTimestampToLocaleDate(date, localeProperties.language)
        }}) &middot;
        <span class="text-beam-blue font-bold">
          <DownloadAlternativeLink
            :link="linkApkFile"
            :checksum="checksumApk"
            :title="t('downloads.type.apk')"
          />
        </span>
        <template v-if="linkApkUniversalFile">
          &middot;
          <span class="text-beam-blue font-bold">
            <DownloadAlternativeLink
              :link="linkApkUniversalFile"
              :checksum="checksumApkUniversal"
              :title="t('downloads.type.apkUniversal')"
            />
          </span>
        </template>
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
    <div v-if="checksumApkUniversal" class="pt-3">
      <h6 class="font-bold">
        {{ $t("downloads.detailswindow.checksums.apkUniversal") }}
      </h6>
      <LayoutCopyToClipboard :text="checksumApkUniversal">
        {{ checksumApkUniversal }}
      </LayoutCopyToClipboard>
    </div>
    <div class="pt-3">
      <DownloadChangelogLink
        :version="version"
        :release-notes-link="releaseNotesLink"
      />
    </div>
  </section>
</template>
