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
import { downloadFile, EventType, DownloadEvent } from "@/utils/downloadFile";

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

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 1,
});

function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  if (bytes === 0) {
    return "0 B";
  }

  const base = 1024;
  const logBytes = Math.log(bytes) / Math.log(base);
  const unitIndex = Math.floor(logBytes);
  const n = bytes / Math.pow(base, unitIndex);

  return numberFormatter.format(n) + " " + units[unitIndex];
}

function formatTime(seconds: number) {
  const h = (seconds / 3600) | 0;
  const m = ((seconds % 3600) / 60) | 0;
  const s = seconds % 60 | 0;

  return `${h}:${numberFormatter.format(m)}:${numberFormatter.format(s)}`;
}

const frameId = ref(0);
function onDownloadProgress(event: DownloadEvent) {
  if (frameId.value === 0) {
    frameId.value = requestAnimationFrame(() => {
      frameId.value = 0;
      if (event.type === EventType.DownloadProgress) {
        downloadedSize.value = event.downloadedSize as number;
        totalSize.value = event.totalSize as number;
        percentage.value = event.percentage as number;
        speed.value = event.speed as number;
        remainingTime.value = event.remainingTime as number;
      } else if (event.type === EventType.HashVerification) {
        downloading.value = false;
        hashing.value = true;
      }
    });
  }
}

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
      onDownloadProgress,
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
onBeforeUnmount(() => {
  abortDownload();
});

defineExpose({ startDownload });
</script>
