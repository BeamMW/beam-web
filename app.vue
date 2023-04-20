<script lang="ts" setup>
useTitleTemplate();
const fileVersion = 1;
</script>

<template>
  <main>
    <Head>
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
      <Meta name="msapplication-TileColor" content="#042548" />
      <Meta name="theme-color" content="#042548" />
    </Head>
    <div>
      <NuxtLayout>
        <NuxtLoadingIndicator />
        <LanguageHandler>
          <template #default="{ onBeforeEnter, onAfterEnter, languageChanged }">
            <NuxtPage
              :transition="{
                name: languageChanged ? '' : 'page',
                mode: 'out-in',
                onBeforeEnter,
                onAfterEnter,
              }"
            />
          </template>
        </LanguageHandler>
      </NuxtLayout>
    </div>
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

/** Custom default dropdown container */
.dropdown-container {
  @apply will-change-transform z-50 text-white relative list-none bg-[rgba(4,37,72,1)] border-black border rounded-lg divide-y divide-gray-100 border-opacity-30 shadow-[0_10px_15px_-3px_rgba(0,0,0,.1),0_4px_6px_-4px_rgba(0,0,0,.1),0px_0px_0px_1px_rgba(255,255,255,.05)_inset];
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
  font-family: "ProximaNova";
  src: url("/fonts/ProximaNova-RegularIt.woff2") format("woff2"),
    url("/fonts/ProximaNova-RegularIt.woff") format("woff");
  font-weight: normal;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "ProximaNova";
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
      bg-[#042548]
      font-medium
      not-italic
      text-[#fff]
      antialiased;

  ::selection {
    @apply bg-[#39FFF2] text-[#042548];
  }
}
</style>
