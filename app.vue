<script lang="ts" setup>
import { linkElements } from "@/utils/linkElements";
import { UserInteractionEvents, eventBus } from "~/utils/emitter";
import { scrollToComponent } from "~/utils/scrollToComponent";

const windowLocked = useState("windowLocked", () => false);
const currentRoute = useState("currentRoute", () => "");
const localePath = useLocalePath();

const fileVersion = 1;

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

const redirectToIndex = async () => {
  await router.push(localePath("index"));
};

// Scroll to "Where to buy" called but unable to scroll, redirect to homepage
const whereToBuyScroll = async () => {
  const targetComponentBuy = document.getElementById("targetComponentBuy");
  if (!targetComponentBuy) {
    await redirectToIndex();
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
  <main :class="windowLocked ? 'locked' : ''">
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
}
main.locked {
  @apply pointer-events-none select-none overflow-hidden h-screen blur-sm opacity-50 touch-none overscroll-none;
  -webkit-overflow-scrolling: none;
}
</style>
