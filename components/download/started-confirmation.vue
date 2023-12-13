<script lang="ts" setup>
import type { Options as confettiOptions } from "canvas-confetti";

const localePath = useLocalePath();

const showDownloadStartedBanner = ref(false);

const confettiCount = 250;
const confettiDefaults = {
  origin: { x: 0.5, y: 0.8 },
  colors: ["#24C1FF", "#39FFF2", "#FF51FF"],
};

async function downloadStarted() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  // Show download started window
  showDownloadStartedBanner.value = true;

  // Confetti it
  const confetti = (await import("canvas-confetti")).default;
  function fire(particleRatio: number, opts: confettiOptions) {
    confetti(
      Object.assign({}, confettiDefaults, opts, {
        particleCount: Math.floor(confettiCount * particleRatio),
      }),
    );
  }
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

onMounted(() =>
  eventBus.on(UserInteractionEvents.DOWNLOAD_ITEM, downloadStarted),
);

onUnmounted(() =>
  eventBus.off(UserInteractionEvents.DOWNLOAD_ITEM, downloadStarted),
);
</script>

<template>
  <transition
    name="banner-download-started"
    class="ease-in-out-custom duration-[1000ms]"
    enter-from-class="opacity-0"
    enter-active-class="opacity-1"
    leave-from-class="opacity-1"
    leave-active-class="opacity-0"
  >
    <h2
      v-show="showDownloadStartedBanner"
      class="pb-8 lg:pb-10 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-white"
    >
      <MarkdownRenderer
        t-key="downloads.started.message"
        :t-interpolation="{ documentation: localePath('docs') }"
      />
    </h2>
  </transition>
</template>
