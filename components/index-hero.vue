<template>
  <section :ref="main" class="heroContainer">
    <div class="heroContent">
      <div
        class="heroText py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16"
      >
        <h1
          class="mb-4 text-4xl tracking-tight leading-none md:text-5xl lg:text-6xl capitalize font-bold select-none"
        >
          {{ $t("hero.title") }}
        </h1>
        <p
          class="mb-5 md:mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-white opacity-90"
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
            v-if="platformDetails[SupportedPlatforms.IOS]"
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
            v-if="platformDetails[SupportedPlatforms.ANDROID]"
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
            v-if="platformDetails[SupportedPlatforms.CHROME]"
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
          end: "80% top",
          scrub: true,
          // scrub: 0.5, // Soften the link between the animation and the scrollbar
        },
        easing: "ease",
        invalidateOnRefresh: true,
      });

      // Apply the .heroImages animation for both mobile and desktop devices using yPercent
      tl.fromTo(
        ".heroImages",
        {
          yPercent: 0,
        },
        {
          yPercent: -50,
          duration: 1,
        },
        "<"
      );

      // Use ScrollTrigger.matchMedia to apply the .heroContainer animation only for desktop devices
      // const mm = gsap.matchMedia();

      // add a media query. When it matches, the associated function will run
      // mm.add("(min-width: 768px)", () => {
      tl.fromTo(
        ".heroBackground",
        {
          yPercent: 0,
        },
        {
          yPercent: 25,
          duration: 1,
        },
        "<"
      );
      // });
    }
  }, main.value);
};

onMountedAndTransitionDone(async () => {
  await initAnimation();
});

onBeforeUnmount(async () => {
  // Ensure the GSAP timeline is reverted and killed when the component unmounts
  // await ctx.value.revert();
  await ctx.value.kill();
});
</script>

<style lang="postcss" scoped>
.heroContainer {
  @apply relative h-screen overflow-hidden;
  @apply h-screen grid grid-cols-1 grid-rows-1 gap-x-0 gap-y-0;
  grid-template: 1fr / 1fr;
  place-items: center;
}

.heroBackground,
.heroContent,
.heroGradient,
.heroImages {
  @apply w-full h-screen;
  grid-column: 1 / 1;
  grid-row: 1 / 1;
}

.heroBackground,
.heroImages {
  @apply will-change-transform;
}

.heroBackground {
  @apply z-[1] bg-no-repeat bg-cover bg-[url('/assets/hero/bg.png')];
}

.heroGradient,
.heroImages {
  @apply pointer-events-none select-none;
}

.heroGradient {
  @apply z-[4] bg-no-repeat bg-cover bg-gradient-to-b from-[transparent] via-[transparent] to-[#041d3c];
}

.heroImages {
  @apply pt-[50vh] z-[3] will-change-transform flex justify-evenly mx-auto max-w-7xl rtl:!flex-row-reverse;
}

.heroContent {
  @apply z-[2];
}
</style>
