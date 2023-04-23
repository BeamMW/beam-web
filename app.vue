<script lang="ts" setup>
import { RouteRecordName } from "vue-router";
import { linkElements } from "@/utils/linkElements";

const windowLocked = useState("windowLocked", () => false);
const currentRoute = useState("currentRoute", () => "");

const fileVersion = 1;

const router = useRoute();
const getRouteName = (routeName?: RouteRecordName | null) =>
  typeof routeName === "string" ? routeName.split("___")[0] : "";
watch(
  router,
  (route) => {
    currentRoute.value = getRouteName(route.name);
  },
  { deep: true, immediate: true }
);

defineRobotMeta();
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
        content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        name="viewport"
      />
    </Head>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <LanguageHandler>
        <template
          #default="{ /*onBeforeEnter, */ onAfterEnter, languageChanged }"
        >
          <NuxtPage
            :transition="{
              name: languageChanged ? '' : 'page',
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

  /*
  * Prevent zoom / pinch on iOS that does not respect user-scale=no
  */
  touch-action: pan-x pan-y;
  @apply min-h-screen
      min-w-full
      font-medium
      not-italic
      text-[#fff]
      antialiased;

  ::selection {
    @apply bg-[#39FFF2] text-[#042548];
  }
}

body,
html {
  @apply transition-colors;
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
