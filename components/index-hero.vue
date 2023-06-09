<template>
  <section :ref="main" class="heroContainer">
    <div class="heroContent">
      <div class="heroGrid">
        <div class="heroText">
          <h1
            class="mb-4 text-4xl tracking-tight leading-none md:text-5xl lg:text-6xl capitalize font-bold select-none"
          >
            {{ $t("hero.title") }}
          </h1>
          <p
            class="mb-5 md:mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-white opacity-90"
          >
            {{ $t("hero.subtitle") }}
          </p>

          <div
            class="grid md:grid-cols-2 gap-5 md:gap-6 w-fit lg:w-6/12 mx-auto mb-6"
          >
            <LayoutButton
              class="whitespace-nowrap"
              accent-color="beam-pink"
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
        <div class="gradientBlur">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
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
import { VNodeRef } from "vue";
import { SupportedPlatforms } from "@/app.config";
import { UserInteractionEvents } from "~/utils/emitter";
const { t } = useI18n();

const platformDetails = await usePlatformDetails();
const localePath = useLocalePath();

const main: VNodeRef = ref();
const ctx: VNodeRef = ref();

const initAnimation = async () => {
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  ctx.value = gsap.context((self) => {
    if (self) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".heroContainer",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
        easing: "ease",
        invalidateOnRefresh: true,
      });
      tl.fromTo(
        ".heroImages",
        {
          yPercent: 0,
          duration: 0.1,
        },
        {
          yPercent: -50,
        },
        "<"
      );
      tl.fromTo(
        ".heroBackground",
        {
          yPercent: 0,
        },
        {
          yPercent: 25,
          duration: 0.5,
        },
        "<"
      );
    }
  }, main.value);
};

onMountedAndTransitionDone(async () => {
  await initAnimation();
});

onBeforeUnmount(async () => {
  await ctx.value.kill();
});
</script>

<style lang="postcss" scoped>
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
  @apply max-w-full pt-[52vh] md:pt-[45vh] z-[2] will-change-transform flex justify-evenly mx-auto max-w-7xl rtl:!flex-row-reverse;
}

.heroContent {
  @apply z-[10] w-full h-auto absolute top-0;
  grid-column: 1 / 1;
  grid-row: 1 / 1;

  .heroGrid {
    @apply grid grid-cols-1 grid-rows-1 gap-x-0 gap-y-0;
    grid-template: 1fr / 1fr;

    .heroText,
    .gradientBlur {
      grid-column: 1 / 1;
      grid-row: 1 / 1;
      @apply w-full;
    }

    .heroText {
      @apply py-10 px-4 mx-auto max-w-screen-xl text-center md:py-16 z-[12];
    }

    .gradientBlur {
      /* only blur heroImages on mobile since this function is smooth only on small areas in safari and firefox, chrome is ok */
      @apply block lg:hidden z-[11] h-[130%];
      inset: auto 0 0 0;
      pointer-events: none;
    }
    .gradientBlur > div,
    .gradientBlur::before,
    .gradientBlur::after {
      @apply z-[11] h-[130%];
      position: absolute;
      inset: 0;
    }
    .gradientBlur::before {
      content: "";
      z-index: 1;
      backdrop-filter: blur(0.5px);
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 12.5%,
        rgba(0, 0, 0, 1) 25%,
        rgba(0, 0, 0, 0) 37.5%
      );
    }
    .gradientBlur > div:nth-of-type(1) {
      z-index: 2;
      backdrop-filter: blur(1px);
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 12.5%,
        rgba(0, 0, 0, 1) 25%,
        rgba(0, 0, 0, 1) 37.5%,
        rgba(0, 0, 0, 0) 50%
      );
    }
    .gradientBlur > div:nth-of-type(2) {
      z-index: 3;
      backdrop-filter: blur(2px);
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 25%,
        rgba(0, 0, 0, 1) 37.5%,
        rgba(0, 0, 0, 1) 50%,
        rgba(0, 0, 0, 0) 62.5%
      );
    }
    .gradientBlur > div:nth-of-type(3) {
      z-index: 4;
      backdrop-filter: blur(4px);
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 37.5%,
        rgba(0, 0, 0, 1) 50%,
        rgba(0, 0, 0, 1) 62.5%,
        rgba(0, 0, 0, 0) 75%
      );
    }
    .gradientBlur > div:nth-of-type(4) {
      z-index: 5;
      backdrop-filter: blur(8px);
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 1) 62.5%,
        rgba(0, 0, 0, 1) 75%,
        rgba(0, 0, 0, 0) 87.5%
      );
    }
    .gradientBlur > div:nth-of-type(5) {
      z-index: 6;
      backdrop-filter: blur(16px);
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 62.5%,
        rgba(0, 0, 0, 1) 75%,
        rgba(0, 0, 0, 1) 87.5%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    .gradientBlur > div:nth-of-type(6) {
      z-index: 7;
      backdrop-filter: blur(32px);
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 75%,
        rgba(0, 0, 0, 1) 87.5%,
        rgba(0, 0, 0, 1) 100%
      );
    }
    .gradientBlur::after {
      content: "";
      z-index: 8;
      backdrop-filter: blur(64px);
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 87.5%,
        rgba(0, 0, 0, 1) 100%
      );
    }
  }
}
</style>
