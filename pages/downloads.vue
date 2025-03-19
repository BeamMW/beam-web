<script setup lang="ts">
const { t } = useI18n();

const title = computed(() => t("head.title.downloads"));
const description = computed(() => t("head.descriptions.downloads"));

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});

definePageMeta({
  layout: "default",
});

const pageTitle = ref<string>(
  `${t("downloads.downloadWallet")}
  `,
);

function downloadStarted() {
  pageTitle.value = t("downloads.started.title");
}

onMounted(() =>
  eventBus.on(UserInteractionEvents.DOWNLOAD_ITEM, downloadStarted),
);

onUnmounted(() =>
  eventBus.off(UserInteractionEvents.DOWNLOAD_ITEM, downloadStarted),
);
</script>

<template>
  <section>
    <section
      class="bg-page-radial-gradient background-radial-defaults pt-40 md:pt-44"
    >
      <div class="px-4 mx-auto max-w-screen-xl text-center z-[12]">
        <LayoutTitle :title="pageTitle" />
        <DownloadStartedConfirmation />
      </div>

      <div class="min-h-[530px]">
        <ClientOnly>
          <DownloadPlatformSelector />
        </ClientOnly>
      </div>
    </section>

    <div class="py-10 lg:py-12">
      <GetStarted :is-next-step="true" />
      <div class="pt-8 lg:pt-10">
        <DownloadResources />
      </div>
    </div>
  </section>
</template>
