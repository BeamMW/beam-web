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
          class="mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-white"
        >
          {{ $t("hero.subtitle") }}
        </p>

        <div class="grid lg:grid-cols-2 gap-4 max-w-xl mx-auto mb-5">
          <LayoutButton
            accent-color="beam-pink"
            as="button"
            @click="
              eventBus.emit(UserInteractionEvents.SCROLL_TO_GET_STARTED, {})
            "
          >
            <Icon
              class="w-6 h-6 select-none pointer-events-none"
              name="hero/rocket"
            />
            {{ $t("getstarted.title") }}
          </LayoutButton>

          <LayoutButton
            :button-link="localePath('downloads')"
            accent-color="beam-blue"
          >
            <Icon
              class="w-6 h-6 select-none pointer-events-none"
              name="layout/flat-beam-animated"
            />
            {{ $t("hero.downloadWallet") }}
          </LayoutButton>
        </div>

        <div class="flex flex-row justify-center gap-4">
          <LayoutLink
            :to="PlatformDetails[SupportedPlatforms.IOS].links.store"
            class="select-none hover:opacity-80 transition"
            :title="t('hero.geton.appstore')"
          >
            <Icon
              name="download/appstore"
              class="h-11 w-[132px] select-none pointer-events-none"
              :as-image="true"
              loading="lazy"
            />
          </LayoutLink>
          <LayoutLink
            :to="PlatformDetails[SupportedPlatforms.ANDROID].links.store"
            class="select-none hover:opacity-80 transition"
            :title="t('hero.geton.playstore')"
          >
            <Icon
              name="download/googleplay"
              class="h-11 w-[148.09px] select-none pointer-events-none"
              :as-image="true"
              loading="lazy"
            />
          </LayoutLink>
          <LayoutLink
            :to="PlatformDetails[SupportedPlatforms.CHROME].links.store"
            class="hidden md:block select-none hover:opacity-80 transition"
            :title="t('hero.geton.chromestore')"
          >
            <Icon
              name="download/googlechrome"
              class="h-11 w-[148.26px] select-none pointer-events-none"
              :as-image="true"
              loading="lazy"
            />
          </LayoutLink>
        </div>
      </div>
      <div
        class="heroImages flex justify-evenly w-full pb-12 mx-auto mb-12 md:px-12 lg:px-16 max-w-7xl pointer-events-none rtl:!flex-row-reverse"
      >
        <ClientOnly>
          <div
            class="relative hidden lg:block w-[937px] h-[1025px] lg:-left-[75px] xl:-left-[50px]"
          >
            <LayoutPicture
              src="/assets/hero/desktop.png"
              alt="Beam Desktop"
              class="select-none pointer-events-none w-[937px] h-[1025px]"
              :webp="true"
            />
          </div>

          <div
            class="relative w-[319px] h-[869px] top-[90px] lg:-left-[80px] xl:-left-[0]"
          >
            <LayoutPicture
              src="/assets/hero/mobile.png"
              alt="Beam iOS"
              class="select-none pointer-events-none w-[319px] h-[869px]"
              :webp="true"
            />
          </div>
        </ClientOnly>
      </div>
    </div>
    <div class="heroBackground"></div>
  </section>
</template>

<script lang="ts" setup>
import { VNodeRef } from "vue";
import { PlatformDetails, SupportedPlatforms } from "@/app.config";
import { UserInteractionEvents } from "~/utils/emitter";
const { t } = useI18n();

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
          scrub: 0.5, // Soften the link between the animation and the scrollbar
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
      const mm = gsap.matchMedia();

      // add a media query. When it matches, the associated function will run
      mm.add("(min-width: 768px)", () => {
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
      });
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
  @apply bg-gradient-to-b h-screen overflow-hidden from-[#041d3c] to-[#003D64] border-b border-black/40 relative grid grid-rows-1 grid-cols-1;
  grid-template-areas: "content";
}

.heroBackground {
  @apply h-screen w-full bg-no-repeat bg-cover bg-[url('/assets/hero/bg.png')] will-change-transform;
  grid-area: content;
}

.heroContent {
  @apply z-10;
  grid-area: content;
}

.heroImages {
  @apply will-change-transform;
}
</style>
