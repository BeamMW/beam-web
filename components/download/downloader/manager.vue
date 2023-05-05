<template>
  <div class="fixed right-4 bottom-4 z-[500] flex flex-col gap-3">
    <template v-for="component in components" :key="component.id">
      <transition
        enter-active-class="animate-toast-scale-in"
        leave-active-class="animate-toast-scale-out"
        @afterLeave="() => afterLeave(component.id)"
      >
        <div
          v-show="component.visible"
          class="w-full lg:w-[500px] will-change-transform mx-auto border-black border rounded-2xl p-4 bg-[#042248]/60 backdrop-blur-md border-opacity-30 shadow-[0_10px_15px_-3px_rgba(0,0,0,.1),0_4px_6px_-4px_rgba(0,0,0,.1),0px_0px_0px_1px_rgba(255,255,255,.05)_inset]"
          @click.stop
        >
          <div class="absolute right-4">
            <button
              type="button"
              class="transition bg-transparent text-beam-green-dark hover:opacity-60 rounded-full text-sm rtl:mr-auto ltr:ml-auto inline-flex items-center"
              @click="() => removeComponent(component.id)"
            >
              <Icon class="w-5 h-5 block" name="layout/close" />
              <span class="sr-only">Close download</span>
            </button>
          </div>
          <div
            class="space-y-6 leading-relaxed text-white/60 text-sm text-left"
          >
            <DownloadDownloaderItem
              :file-url="component.fileUrl"
              :expected-file-hash="component.expectedFileHash"
              @close="() => removeComponent(component.id)"
              @download-finished="
                () => updateComponentStatus(component.id, true, false)
              "
              @download-error="
                () => updateComponentStatus(component.id, false, true)
              "
            />
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from "uuid";
import { eventBus, UserInteractionEvents, CustomEvents } from "~/utils/emitter";

interface DownloadItemInterface {
  id: string;
  fileUrl: string;
  expectedFileHash: string;
  finished: boolean;
  error: boolean;
  visible: boolean;
}

const components = ref<DownloadItemInterface[]>([]);

const updateComponentStatus = (
  id: string,
  finished: boolean,
  error: boolean
) => {
  const component = components.value.find((component) => component.id === id);
  if (component) {
    component.finished = finished;
    component.error = error;
  }
};

const downloadItem = (
  event: CustomEvents[UserInteractionEvents.DOWNLOAD_ITEM]
) => {
  const { expectedFileHash, fileUrl } = event;

  // Ensure there isn't already the same fileUrl currently downloading / downloaded
  const isFileAlreadyDownloading = components.value.some(
    (item) => item.fileUrl === fileUrl
  );

  if (isFileAlreadyDownloading) {
    console.warn("File is already downloading or downloaded:", fileUrl);
    return;
  }

  // Enforce a limit of 3 max downloads at the same time
  const maxDownloads = 3;
  if (components.value.length >= maxDownloads) {
    // Remove finished or errored items
    components.value = components.value.filter(
      (component) => !component.finished && !component.error
    );

    // Check if there's still room for a new download after removing finished or errored items
    if (components.value.length >= maxDownloads) {
      console.warn("Reached the maximum limit of 3 downloads at the same time");
      return;
    }
  }

  components.value.push({
    id: uuidv4(),
    fileUrl,
    expectedFileHash,
    finished: false,
    error: false,
    visible: false,
  });

  requestAnimationFrame(() => {
    const component = components.value.find((item) => item.fileUrl === fileUrl);
    if (component) {
      component.visible = true;
    }
  });
};

onMounted(() => eventBus.on(UserInteractionEvents.DOWNLOAD_ITEM, downloadItem));

const removeComponent = (id: string) => {
  const component = components.value.find((item) => item.id === id);
  if (component) {
    component.visible = false;
  }
};

const afterLeave = (id: string) => {
  components.value = components.value.filter(
    (component) => component.id !== id
  );
};
</script>
