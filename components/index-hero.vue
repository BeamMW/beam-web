<template>
  <section :ref="main" class="heroContainer">
    <div class="heroContent">
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
      <div
        class="relative hidden lg:block w-[829px] h-[948px] translate-y-[50px] -translate-x-[30px]"
      >
        <LayoutPicture
          src="/assets/hero/desktop"
          alt="Beam Desktop"
          class="w-[829px] h-[948px]"
          :webp="true"
        />
      </div>
      <div
        class="relative w-[319px] h-[869px] translate-y-[180px] lg:translate-y-[90px] md:translate-x-[30px]"
      >
        <LayoutPicture
          src="/assets/hero/mobile"
          alt="Beam iOS"
          class="w-[319px] h-[869px]"
          :webp="true"
        />
      </div>
    </div>
    <div class="heroBackground">
      <!-- Original size: 455 × 539 (size 0.5x) -->
      <div class="bgElement top-[60vh] w-[227.5px] h-[269.5px]">
        <LayoutPicture
          src="/assets/hero/bg/item-4"
          alt="Background Element 4"
          class="w-[227.5px] h-[269.5px]"
        />
      </div>

      <!-- Original size: 265 × 213 (size 0.75x) -->
      <div
        class="bgElement left-[65vw] lg:left-[85vw] top-[60vh] w-[198.75px] h-[159.75px]"
      >
        <LayoutPicture
          src="/assets/hero/bg/item-3"
          alt="Background Element 3"
          class="w-[198.75px] h-[159.75px]"
        />
      </div>

      <!-- Original size: 219 × 200 (size 0.5x) -->
      <div
        class="bgElement hidden xl:block left-[90vw] top-[20vh] w-[109.5px] h-[100px]"
      >
        <LayoutPicture
          src="/assets/hero/bg/item-2"
          alt="Background Element 2"
          class="w-[109.5px] h-[100px]"
        />
      </div>

      <!-- Original size: 219 × 200 (size 0.5x) -->
      <div class="bgElement left-[20px] top-[25vh] w-[109.5px] h-[100px]">
        <LayoutPicture
          src="/assets/hero/bg/item-2"
          alt="Background Element 2"
          class="w-[109.5px] h-[100px] rotate-180"
        />
      </div>

      <!-- Original size: 272 × 402 (size 0.5x)-->
      <div
        class="bgElement hidden md:block left-[15vw] top-[25vh] w-[136px] h-[201px]"
      >
        <LayoutPicture
          src="/assets/hero/bg/item-1"
          alt="Background Element 1"
          class="w-[136px] h-[201px] rotate-180"
        />
      </div>

      <!-- Original size: 272 × 402 (size 0.75x) -->
      <div class="bgElement left-[70vw] top-[10vh] w-[204px] h-[301.5px]">
        <LayoutPicture
          src="/assets/hero/bg/item-1"
          alt="Background Element 1"
          class="w-[204px] h-[301.5px]"
        />
      </div>
    </div>
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
  gsap.ticker.lagSmoothing(1000, 16);

  const hero = document.querySelector(".heroContainer") as HTMLElement;
  const images = document.querySelector(".heroImages");
  const content = document.querySelector(".heroContent");
  const bgElements = document.querySelectorAll(".bgElement");

  ctx.value = gsap.context((self) => {
    if (self) {
      const tlBounce = gsap.timeline({
        yoyo: true,
        repeat: -1,
        repeatDelay: 0,
      });
      gsap.utils.toArray(bgElements).forEach((element) => {
        const direction =
          Math.random() > 0.5
            ? gsap.utils.random(-25, -30)
            : gsap.utils.random(25, 30);
        tlBounce.to(
          element as HTMLElement,
          { yPercent: direction, duration: 8 },
          "<",
        );
      });

      const tl = gsap.timeline({
        paused: true,
      });
      tl.fromTo(
        images,
        { yPercent: 0 },
        { yPercent: -100, duration: 0.2 },
        "<",
      );
      tl.fromTo(
        content,
        { yPercent: 0, autoAlpha: 1 },
        { yPercent: -50, autoAlpha: 0, duration: 0.3 },
        "<",
      );

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
        tl.progress(getProgress(hero));
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
.bgElement {
  @apply absolute opacity-80;
}
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
  @apply relative w-full bg-gradient-to-b from-[#025b8f] to-transparent to-[500px];
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
  @apply w-full h-auto self-start pt-28 md:pt-[8.5rem] z-[19];
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
