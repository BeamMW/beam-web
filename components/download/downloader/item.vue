<template>
  <div class="flex flex-col rtl:text-right ltr:text-left">
    <div v-if="starting || downloading">
      <b class="text-lg font-bold text-white/90">{{
        starting ? "Starting..." : "Downloading..."
      }}</b>
      <div class="flex justify-between font-bold">
        <span class="text-base font-medium text-beam-green"
          >{{ percentage.toFixed(2) }}%</span
        >
        <span class="text-sm font-medium text-blue-700 dark:text-white">{{
          remainingTime !== 0 ? formatTime(remainingTime) : ""
        }}</span>
      </div>
      <div class="w-full rounded-full h-2.5 bg-gray-700/80">
        <div
          class="bg-beam-green h-2.5 rounded-full"
          :style="`width: ${percentage.toFixed(2)}%`"
        ></div>
      </div>
      <div class="flex justify-between mt-1.5">
        <p>
          {{ formatBytes(downloadedSize) }} /
          {{ formatBytes(totalSize) }}
        </p>
        <p>{{ formatBytes(speed) }}/s</p>
      </div>
    </div>
    <div v-else-if="hashing">
      <b class="text-lg font-bold text-white/90">File Integrity Check</b>
      <div class="flex flex-row my-1 gap-1 items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 animate-spin text-gray-600 fill-beam-green"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        <p class="text-white/90">Verifying checksum…</p>
      </div>
    </div>
    <div v-else-if="finished">
      <b class="text-lg font-bold text-white/90">File Downloaded</b>
      <div class="flex flex-row my-1 gap-3 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 16.6 16.4"
        >
          <g fill="none" fill-rule="evenodd" stroke="#05E2C2">
            <path
              stroke-width="1.3"
              d="m8.3 14.5-2.1 1-1.2-2-2.3-.2v-2.4L.9 9.5l1.4-2-.8-2.2 2.2-1 .6-2.2 2.3.4L8.3.9 10 2.5l2.3-.4.6 2.3 2 .9-.6 2.2 1.3 2-1.8 1.4v2.4l-2.3.3-1.2 2z"
            />
            <path stroke-linecap="round" d="m6 8.8 1.7 1.7L11 7" />
          </g>
        </svg>
        <p class="text-white/90">File authenticated and downloaded</p>
      </div>
    </div>
    <div v-else-if="error">
      <b class="text-lg font-bold text-white/90">Download Error</b>
      <p class="text-white/90">{{ error }}</p>
    </div>
    <div class="text-xs mt-1">
      <p>Filename: {{ extractFilenameFromUrl(fileUrl) }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  downloadFile,
  EventType,
  DownloadEvent,
  extractFilenameFromUrl,
} from "@/utils/downloadFile";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";

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

const emitters = defineEmits(["close", "download-finished", "download-error"]);

const closeComponent = () => {
  emitters("close");
};

const starting = ref(true);
const downloading = ref(false);
const hashing = ref(false);

const finished = ref(false);
const error = ref<typeof Error | undefined>();

const downloadedSize = ref(0);
const totalSize = ref(0);
const percentage = ref(0);
const speed = ref(0);
const toast = ref();
const remainingTime = ref(0);
const abortController = ref<AbortController | null>(null);

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

function formatTime(seconds: number): string {
  const now = new Date();
  const targetDate = new Date(now.getTime() + seconds * 1000);

  const formattedTime = formatDistanceToNowStrict(targetDate, {
    locale: enUS,
    addSuffix: true,
  });

  return formattedTime;
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
    starting.value = false;
    abortController.value = new AbortController();
    await downloadFile(
      props.fileUrl,
      props.expectedFileHash,
      onDownloadProgress,
      abortController.value.signal
    );
    finished.value = true;
    emitters("download-finished");
  } catch (internalError) {
    console.error("Error downloading and verifying file:", internalError);
    error.value = internalError as typeof Error;
    finished.value = false;
    emitters("download-error");
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
  closeComponent();
}

onMounted(() => {
  startDownload();
});
onBeforeUnmount(() => {
  abortDownload();
});

defineExpose({ startDownload });
</script>
