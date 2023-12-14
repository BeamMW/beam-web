<template>
  <section :ref="main" class="heroContainer">
    <div class="heroContent pt-16 md:pt-20">
      <div class="heroGrid">
        <div
          class="py-10 px-4 mx-auto max-w-screen-xl text-center z-[12] heroText"
        >
          <h1
            class="mb-3 text-4xl tracking-tight !leading-tight md:text-5xl lg:text-6xl capitalize font-bold select-none specialGradient specialGradientBlue"
          >
            {{ $t("hero.title") }}
          </h1>
          <h2
            class="mb-4 md:mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-white"
          >
            {{ $t("hero.subtitle") }}
          </h2>

          <div
            class="grid md:grid-cols-2 gap-5 md:gap-6 w-fit lg:w-6/12 mx-auto mb-6"
          >
            <LayoutButton
              class="whitespace-nowrap"
              accent-color="beam-green"
              as="button"
              @click="
                eventBus.emit(UserInteractionEvents.SCROLL_TO_GET_STARTED, {})
              "
            >
              <Icon class="w-6 h-6" name="hero/rocket" />
              {{ $t("getstarted.title") }}
            </LayoutButton>

            <LayoutButton
              class="whitespace-nowrap"
              :button-link="localePath('downloads')"
              :prefetch="true"
              accent-color="beam-blue"
            >
              <Icon class="w-6 h-6" name="layout/flat-beam-animated" />
              {{ $t("hero.downloadWallet") }}
            </LayoutButton>
          </div>

          <div class="flex flex-row justify-center gap-4">
            <LayoutLink
              v-if="
                platformDetails[SupportedPlatforms.IOS] &&
                platformDetails[SupportedPlatforms.IOS].links &&
                platformDetails[SupportedPlatforms.IOS].links.store
              "
              :to="platformDetails[SupportedPlatforms.IOS].links.store"
              class="select-none hover:opacity-80 transition"
              :title="t('hero.geton.appstore')"
            >
              <Icon
                name="download/appstore"
                class="h-11 w-[132px]"
                :as-image="true"
                loading="lazy"
                :alt="t('hero.geton.appstore')"
              />
            </LayoutLink>
            <LayoutLink
              v-if="
                platformDetails[SupportedPlatforms.ANDROID] &&
                platformDetails[SupportedPlatforms.ANDROID].links &&
                platformDetails[SupportedPlatforms.ANDROID].links.store
              "
              :to="platformDetails[SupportedPlatforms.ANDROID].links.store"
              class="select-none hover:opacity-80 transition"
              :title="t('hero.geton.playstore')"
            >
              <Icon
                name="download/googleplay"
                class="h-11 w-[148.09px]"
                :as-image="true"
                loading="lazy"
                :alt="t('hero.geton.playstore')"
              />
            </LayoutLink>
            <LayoutLink
              v-if="
                platformDetails[SupportedPlatforms.CHROME] &&
                platformDetails[SupportedPlatforms.CHROME].links &&
                platformDetails[SupportedPlatforms.CHROME].links.store
              "
              :to="platformDetails[SupportedPlatforms.CHROME].links.store"
              class="hidden md:block select-none hover:opacity-80 transition"
              :title="t('hero.geton.chromestore')"
            >
              <Icon
                name="download/googlechrome"
                class="h-11 w-[148.26px]"
                :as-image="true"
                loading="lazy"
                :alt="t('hero.geton.chromestore')"
              />
            </LayoutLink>
          </div>
        </div>
      </div>
    </div>
    <div class="heroGradient"></div>
    <div class="heroImages">
      <ClientOnly>
        <div
          class="relative hidden lg:block w-[829px] h-[948px] top-[50px] -left-[30px]"
        >
          <LayoutPicture
            src="/assets/hero/desktop.png"
            alt="Beam Desktop"
            class="w-[829px] h-[948px]"
            :webp="true"
          />
        </div>

        <div class="relative w-[319px] h-[869px] top-[90px] md:left-[30px]">
          <LayoutPicture
            src="/assets/hero/mobile.png"
            alt="Beam iOS"
            class="w-[319px] h-[869px]"
            :webp="true"
          />
        </div>
      </ClientOnly>
    </div>
    <div class="heroBackground"></div>
  </section>
</template>

<script lang="ts" setup>
import type { VNodeRef } from "vue";
import { SupportedPlatforms } from "@/app.config";
import { UserInteractionEvents } from "~/utils/emitter";
const { t } = useI18n();

const platformDetails = await usePlatformDetails();
const localePath = useLocalePath();

const main: VNodeRef = ref();
const ctx: VNodeRef = ref();
const observer = ref<IntersectionObserver | undefined>();

const initAnimation = async () => {
  const { gsap } = await import("gsap");

  const hero = document.querySelector(".heroContainer") as HTMLElement;
  const images = document.querySelector(".heroImages");
  const background = document.querySelector(".heroBackground");

  let progress = 0;

  ctx.value = gsap.context((self) => {
    if (self) {
      const tl = gsap.timeline({
        paused: true,
      });
      tl.fromTo(images, { yPercent: 0 }, { yPercent: -50, duration: 1 });
      tl.fromTo(background, { yPercent: 0 }, { yPercent: 50, duration: 1 });

      observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.ticker.add(updateProgress);
          } else {
            gsap.ticker.remove(updateProgress);
          }
        });
      });

      function updateProgress() {
        progress = getProgress(hero);
        tl.progress(progress);
      }

      // Calculate progress value based on scroll position
      function getProgress(el: HTMLElement) {
        const scrollTop = window.scrollY;
        const height = el.offsetHeight;
        const offsetTop = el.offsetTop;
        const scrollHeight = document.body.scrollHeight - window.innerHeight;
        return (scrollTop - offsetTop) / (scrollHeight + height);
      }

      observer.value.observe(hero);
    }
  }, main.value);
};

onMounted(async () => {
  await initAnimation();
});

onBeforeUnmount(async () => {
  observer.value?.disconnect();
  await ctx.value.kill();
});
</script>

<style scoped>
.heroContainer {
  @apply relative h-[150vh] md:h-screen overflow-hidden grid grid-cols-1 grid-rows-1 gap-x-0 gap-y-0;
  grid-template: 1fr / 1fr;
  place-items: center;
}

.heroBackground,
.heroGradient,
.heroImages {
  @apply w-full h-[150vh] md:h-screen;
  grid-column: 1 / 1;
  grid-row: 1 / 1;
}

.heroBackground {
  @apply z-[1] bg-no-repeat bg-cover bg-[url('/assets/hero/bg.png')];
}

.heroGradient,
.heroImages {
  @apply pointer-events-none select-none !w-[100vw];
}

.heroGradient {
  @apply z-[3] bg-no-repeat bg-cover bg-gradient-to-b from-[transparent] via-[transparent] to-[#041d3c];
}

.heroImages {
  @apply max-w-full pt-[50vh] md:pt-[45vh] z-[2] will-change-transform flex justify-evenly mx-auto md:max-w-7xl rtl:!flex-row-reverse;
}

.heroContent {
  @apply z-[10] w-full h-auto absolute top-0;
  grid-column: 1 / 1;
  grid-row: 1 / 1;

  .heroGrid {
    @apply grid grid-cols-1 grid-rows-1 gap-x-0 gap-y-0;
    grid-template: 1fr / 1fr;

    .heroText {
      grid-column: 1 / 1;
      grid-row: 1 / 1;
      @apply w-full;
    }
  }
}
</style>
