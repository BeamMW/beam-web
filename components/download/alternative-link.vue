<script lang="ts" setup>
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  checksum: {
    type: String,
    required: false,
  },
  disableArrow: {
    type: Boolean,
    required: false,
  },
});

const downloaderRef = ref();
const startDownload = (event: Event) => {
  if (downloaderRef.value && props.checksum) {
    event.preventDefault();
    downloaderRef.value.startDownload();
  }
};
</script>
<template>
  <DownloadDownloader
    v-if="link && checksum"
    :file-url="link"
    :expected-file-hash="checksum"
    ref="downloaderRef"
  ></DownloadDownloader>
  <LayoutLink
    @click="startDownload"
    :to="link"
    class="hover:text-white transition-colors"
  >
    <span class="inline-flex items-center"
      >{{ title }}&nbsp;
      <Icon
        v-if="!disableArrow"
        class="h-3 w-3"
        name="download/get-arrow-inline"
      />
    </span>
  </LayoutLink>
</template>
