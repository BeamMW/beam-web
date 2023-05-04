<template>
  <LayoutAnimatedToast
    ref="toast"
    :title="'Download Progress'"
    @close="abortDownload"
  >
    <div
      class="divide-solid divide-white/10 divide-y flex flex-col gap-3 rtl:text-right ltr:text-left"
    >
      <div v-if="downloading">
        <p>Downloading: {{ percentage.toFixed(2) }}%</p>
        <p>
          Downloaded: {{ formatBytes(downloadedSize) }} /
          {{ formatBytes(totalSize) }}
        </p>
        <p>Speed: {{ formatBytes(speed) }}/s</p>
        <p>Remaining Time: {{ formatTime(remainingTime) }}</p>
      </div>
      <div v-if="hashing">
        <p>Verifying hash...</p>
      </div>
      <div v-else>
        <p>Finished!</p>
      </div>
    </div>
  </LayoutAnimatedToast>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { downloadFile, EventType } from "@/utils/downloadFile";

const downloading = ref(false);
const hashing = ref(false);
const downloadedSize = ref(0);
const totalSize = ref(0);
const percentage = ref(0);
const speed = ref(0);
const toast = ref();
const remainingTime = ref(0);
const abortController = ref<AbortController | null>(null);

const props = defineProps({
  fileUrl: {
    type: String,
    required: true,
  },
  expectedFileHash: {
    type: String,
    required: true,
  },
});

async function startDownload() {
  if (toast.value) {
    toast.value.show();
  }

  try {
    downloading.value = true;
    abortController.value = new AbortController();

    await downloadFile(
      props.fileUrl,
      props.expectedFileHash,
      (event) => {
        if (event.type === EventType.DownloadProgress) {
          downloadedSize.value = event.downloadedSize || 0;
          totalSize.value = event.totalSize || 0;
          percentage.value = event.percentage || 0;
          speed.value = event.speed || 0;
          remainingTime.value = event.remainingTime || 0;
        } else if (event.type === EventType.HashVerification) {
          downloading.value = false;
          hashing.value = true;
        }
      },
      abortController.value.signal
    );
  } catch (error) {
    console.error("Error downloading and verifying file:", error);
  } finally {
    downloading.value = false;
    hashing.value = false;
  }
}

function abortDownload() {
  console.log("Download aborted");
  if (abortController.value) {
    abortController.value.abort(); // Abort the download
  }
}

function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let l = 0;
  let n = bytes || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}

onBeforeUnmount(() => {
  abortDownload();
});

defineExpose({ startDownload });
</script>
