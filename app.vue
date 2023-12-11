<script lang="ts" setup>
import { linkElements } from "@/utils/linkElements";
import { UserInteractionEvents, eventBus } from "~/utils/emitter";
import { scrollToComponent } from "~/utils/scrollToComponent";
import { SupportedPlatforms, ExternalLinks } from "@/app.config";

const platformDetails = await usePlatformDetails();
const localePath = useLocalePath();

const windowLocked = useState("windowLocked", () => false);
const windowBlurred = useState("windowBlurred", () => false);
const fileVersion = 3;

const baseURL = useRuntimeConfig().public.baseURL;
const router = useRouter();

defineRobotMeta();

const scrollToIdOnPage = async (
  pageName: string,
  componentId: string,
  eventToWait: UserInteractionEvents,
) => {
  const targetComponent = document.getElementById(componentId);
  if (!targetComponent) {
    const pageLoadedAndMounted = () => {
      eventBus.off(eventToWait, pageLoadedAndMounted);
      const targetComponent = document.getElementById(componentId);
      scrollToComponent(targetComponent);
    };
    eventBus.on(eventToWait, pageLoadedAndMounted);
    await router.push(localePath(pageName));
  } else {
    scrollToComponent(targetComponent);
  }
};

// Scroll to "Where to buy" called but unable to scroll, redirect to homepage
const whereToBuyScroll = async () =>
  await scrollToIdOnPage(
    "/",
    "targetComponentBuy",
    UserInteractionEvents.BUY_WHERE_COMPONENT_READY,
  );
const roadmapScroll = async () =>
  await scrollToIdOnPage(
    "/",
    "targetComponentRoadmap",
    UserInteractionEvents.ROADMAP_COMPONENT_READY,
  );

onMounted(() => {
  eventBus.on(UserInteractionEvents.SCROLL_TO_WHERE_TO_BUY, whereToBuyScroll);
  eventBus.on(UserInteractionEvents.SCROLL_TO_ROADMAP, roadmapScroll);
});

onUnmounted(() => {
  eventBus.off(UserInteractionEvents.SCROLL_TO_WHERE_TO_BUY, whereToBuyScroll);
  eventBus.off(UserInteractionEvents.SCROLL_TO_ROADMAP, roadmapScroll);
});
</script>

<template>
  <main
    :class="{
      locked: windowLocked,
      blurred: windowBlurred,
    }"
  >
    <Head>
      <Link
        v-for="linkElement in linkElements"
        :key="linkElement.href"
        :rel="linkElement.rel"
        :href="linkElement.href"
        :as="linkElement.as"
        :type="linkElement.type"
        :crossorigin="linkElement.crossorigin ? 'anonymous' : undefined"
      />
      <Link
        rel="apple-touch-icon"
        sizes="180x180"
        :href="`/apple-touch-icon.png?v=${fileVersion}`"
      />
      <Link
        rel="icon"
        type="image/png"
        sizes="32x32"
        :href="`/favicon-32x32.png?v=${fileVersion}`"
      />
      <Link
        rel="icon"
        type="image/png"
        sizes="16x16"
        :href="`/favicon-16x16.png?v=${fileVersion}`"
      />
      <Link rel="manifest" :href="`/site.webmanifest?v=${fileVersion}`" />
      <Link rel="mask-icon" :href="`/safari-pinned-tab.svg?v=${fileVersion}`" />
      <Link rel="shortcut icon" :href="`/favicon.ico?v=${fileVersion}`" />
      <Meta
        content="width=device-width, initial-scale=1, maximum-scale=5"
        name="viewport"
      />
      <Meta
        name="twitter:site"
        :content="extractTwitterUsername(ExternalLinks.TWITTER) as string"
      />
      <Meta
        v-if="
          platformDetails[SupportedPlatforms.IOS] &&
          platformDetails[SupportedPlatforms.IOS].links &&
          platformDetails[SupportedPlatforms.IOS].links.store
        "
        name="apple-itunes-app"
        :content="`app-id=${extractAppStoreAppId(
          platformDetails[SupportedPlatforms.IOS].links.store as string,
        )}`"
      />
      <Meta
        name="twitter:image:src"
        :content="`${baseURL}/card.png?v=${fileVersion}`"
      />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta property="og:type" content="object" />
      <Meta
        property="og:image"
        :content="`${baseURL}/card.png?v=${fileVersion}`"
      />
      <Meta property="og:image:type" content="image/png" />
      <Meta property="og:image:width" content="1200" />
      <Meta property="og:image:height" content="630" />
      <Meta property="og:url" :content="baseURL" />
    </Head>
    <NuxtLayout>
      <NuxtLoadingIndicator
        color="repeating-linear-gradient(to right,var(--beam-green-dark) 0%,var(--beam-pink) 100%)"
        class="will-change-auto"
      />
      <LanguageHandler>
        <div>
          <NuxtPage :transition="false" />
        </div>
      </LanguageHandler>
    </NuxtLayout>
  </main>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-leave-to,
.page-enter-from {
  opacity: 0;
}
.page-leave-to {
  @apply origin-center scale-[1.02];
}
.page-enter-from {
  @apply origin-center scale-[.98];
}

@font-face {
  font-family: "ProximaNova";
  src:
    url("/fonts/ProximaNova-Regular.woff2") format("woff2"),
    url("/fonts/ProximaNova-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "ProximaNova-Italic";
  src:
    url("/fonts/ProximaNova-RegularIt.woff2") format("woff2"),
    url("/fonts/ProximaNova-RegularIt.woff") format("woff");
  font-weight: normal;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "ProximaNova-Bold";
  src:
    url("/fonts/ProximaNova-Bold.woff2") format("woff2"),
    url("/fonts/ProximaNova-Bold.woff") format("woff");
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

:root {
  --beam-blue: #25c1ff;
  --beam-blue-dark: #0b76ff;
  --beam-purple: #9d6eff;
  --beam-purple-dark: #ab37e6;
  --beam-pink: #fe52ff;
  --beam-green: #39fff2;
  --beam-green-dark: #00e2c2;

  @apply min-h-screen
      min-w-full
      overflow-x-hidden
      font-medium
      not-italic
      text-[#fff]
      antialiased;

  ::selection {
    @apply bg-[#39FFF2] text-[#042548];
  }
}

.custom-swipe-arrow {
  @apply absolute z-10 cursor-pointer md:from-[#041D3C] h-full w-7 md:w-10 flex items-center transition-opacity;

  &.swiper-button-disabled {
    @apply opacity-0 pointer-events-none;
  }

  &.next-button {
    @apply right-0 md:bg-gradient-to-l justify-end transition-opacity;
  }

  &.prev-button {
    @apply left-0 md:bg-gradient-to-r justify-start transition-opacity;
  }
}
</style>

<style scoped>
main {
  transition:
    opacity 225ms ease-in-out,
    filter 225ms ease-in-out;

  &.locked,
  &.blurred {
    @apply pointer-events-none select-none;
  }
  &.locked {
    @apply overflow-hidden h-screen touch-none overscroll-none;
    -webkit-overflow-scrolling: none;
  }
  &.blurred {
    @apply blur-sm opacity-50;
  }
}
</style>
