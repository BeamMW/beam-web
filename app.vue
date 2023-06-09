<script lang="ts" setup>
import { linkElements } from "@/utils/linkElements";
import { UserInteractionEvents, eventBus } from "~/utils/emitter";
import { scrollToComponent } from "~/utils/scrollToComponent";
import { SupportedPlatforms, ExternalLinks } from "@/app.config";

const platformDetails = await usePlatformDetails();
const localePath = useLocalePath();

const windowLocked = useState("windowLocked", () => false);
const windowBlurred = useState("windowBlurred", () => false);
const currentRoute = useState("currentRoute", () => "");
const fileVersion = 3;

const baseURL = useRuntimeConfig().public.baseURL;
const route = useRoute();
const router = useRouter();

watch(
  route,
  (route) => {
    currentRoute.value = getRouteName(route.name);
  },
  { deep: true, immediate: true }
);

defineRobotMeta();

// Scroll to "Where to buy" called but unable to scroll, redirect to homepage
const whereToBuyScroll = async () => {
  const targetComponentBuy = document.getElementById("targetComponentBuy");
  if (!targetComponentBuy) {
    await router.push(localePath("index"));
    // ToDo: find a more reliable way than a settimeout
    setTimeout(() => {
      const homepageBuyComponent =
        document.getElementById("targetComponentBuy");
      scrollToComponent(homepageBuyComponent);
    }, 600);
  } else {
    scrollToComponent(targetComponentBuy);
  }
};

onMounted(() =>
  eventBus.on(UserInteractionEvents.SCROLL_TO_WHERE_TO_BUY, whereToBuyScroll)
);

onUnmounted(() =>
  eventBus.off(UserInteractionEvents.SCROLL_TO_WHERE_TO_BUY, whereToBuyScroll)
);
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
        :content="(extractTwitterUsername(ExternalLinks.TWITTER) as string)"
      />
      <Meta
        v-if="
          platformDetails[SupportedPlatforms.IOS] &&
          platformDetails[SupportedPlatforms.IOS].links &&
          platformDetails[SupportedPlatforms.IOS].links.store
        "
        name="apple-itunes-app"
        :content="`app-id=${
          extractAppStoreAppId(platformDetails[SupportedPlatforms.IOS].links.store as string)
        }`"
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
        <template
          #default="{ /*onBeforeEnter, */ onAfterEnter, languageChanged }"
        >
          <NuxtPage
            :transition="{
              name:
                languageChanged || currentRoute == 'docs-slug' ? '' : 'page',
              mode: 'out-in',
              //onBeforeEnter,
              onAfterEnter,
            }"
          />
        </template>
      </LanguageHandler>
    </NuxtLayout>
  </main>
</template>

<style lang="postcss">
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
  src: url("/fonts/ProximaNova-Regular.woff2") format("woff2"),
    url("/fonts/ProximaNova-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "ProximaNova-Italic";
  src: url("/fonts/ProximaNova-RegularIt.woff2") format("woff2"),
    url("/fonts/ProximaNova-RegularIt.woff") format("woff");
  font-weight: normal;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "ProximaNova-Bold";
  src: url("/fonts/ProximaNova-Bold.woff2") format("woff2"),
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
</style>

<style lang="postcss" scoped>
main {
  transition: opacity 225ms ease-in-out, filter 225ms ease-in-out;

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
