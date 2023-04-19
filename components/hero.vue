<template>
  <section
    :ref="main"
    class="heroContainer block bg-[length:100%_auto] bg-top bg-no-repeat bg-[#042548] w-full"
  >
    <div>
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
              class="w-[18px] h-[18px] select-none pointer-events-none"
              name="hero/rocket"
            />
            {{ $t("getstarted.title") }}
          </LayoutButton>

          <LayoutButton
            :button-link="localePath('downloads')"
            accent-color="beam-blue"
          >
            <Icon
              class="inline-block w-6 h-8 select-none pointer-events-none align-middle"
              name="layout/flat-beam-animated"
              :as-image="true"
              :lazy="true"
            />
            {{ $t("hero.downloadWallet") }}
          </LayoutButton>
        </div>

        <div class="flex flex-row justify-center space-x-4">
          <NuxtLink
            :to="PlatformDetails[SupportedPlatforms.IOS].links.store"
            class="select-none hover:opacity-80 transition"
            target="_blank"
          >
            <Icon
              name="download/appstore"
              class="h-11 w-auto select-none pointer-events-none"
              :as-image="true"
              :lazy="true"
            />
          </NuxtLink>
          <NuxtLink
            :to="PlatformDetails[SupportedPlatforms.ANDROID].links.store"
            class="select-none hover:opacity-80 transition"
            target="_blank"
          >
            <Icon
              name="download/googleplay"
              class="h-11 w-auto select-none pointer-events-none"
              :as-image="true"
              :lazy="true"
            />
          </NuxtLink>
          <NuxtLink
            :to="PlatformDetails[SupportedPlatforms.CHROME].links.store"
            class="hidden md:block select-none hover:opacity-80 transition"
          >
            <Icon
              name="download/googlechrome"
              class="h-11 w-auto select-none pointer-events-none"
              :as-image="true"
              :lazy="true"
            />
          </NuxtLink>
        </div>
      </div>
      <div
        class="heroImages flex justify-evenly w-full pb-12 mx-auto mb-12 md:px-12 lg:px-16 max-w-7xl pointer-events-none"
      >
        <ClientOnly>
          <div
            class="relative hidden lg:block w-[937px] h-[1025px] min-w-[937px]"
          >
            <LayoutPicture
              src="/hero/desktop.png"
              :alt="'Beam for Desktop'"
              class="absolute select-none pointer-events-none"
              :webp="true"
            />
          </div>

          <div class="relative w-[389px] h-[966px] min-w-[389px] -right-[30px]">
            <LayoutPicture
              src="/hero/mobile.png"
              alt="Beam for iOS"
              class="absolute select-none pointer-events-none"
              :webp="true"
            />
          </div>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { VNodeRef, nextTick } from "vue";
import { PlatformDetails, SupportedPlatforms } from "@/app.config";

import { UserInteractionEvents } from "~/utils/emitter";

const localePath = useLocalePath();

const { $gsap: gsap } = useNuxtApp();

const main: VNodeRef = ref();
const ctx: VNodeRef = ref();

const initAnimation = () => {
  ctx.value = gsap.context((self) => {
    if (self) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".heroContainer",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          easing: "ease",
          invalidateOnRefresh: true,
        })
        .fromTo(
          ".heroContainer",
          {
            backgroundPositionY: "0px",
          },
          {
            backgroundPositionY: "200px",
            duration: 1,
          },
          "<"
        )
        .fromTo(
          ".heroImages",
          {
            y: 0,
          },
          {
            y: -400,
            duration: 1,
          },
          "<"
        );
    }
  }, main.value);
};

onMountedAndTransitionDone(() => {
  nextTick(() => {
    initAnimation();
  });
});

onBeforeUnmount(async () => {
  await ctx.value.kill(); // Ensure the GSAP timeline is killed when the component unmounts
});
</script>

<style lang="postcss" scoped>
section {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  @apply bg-gradient-to-b h-screen overflow-hidden from-[#041d3c] to-[#003D64] border-b border-black/40;
}
</style>

<style lang="postcss" scoped>
.heroContainer {
  will-change: background-position-y;
  background-image: url("/hero/bg.png");
}

.heroImages {
  @apply will-change-transform;
}

.dropdown-menu {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
