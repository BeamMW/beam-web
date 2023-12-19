<template>
  <LanguageHandler>
    <Html
      :lang="head && head.htmlAttrs && head.htmlAttrs.lang"
      :dir="head && head.htmlAttrs && head.htmlAttrs.dir"
      :class="themeColors && themeColors.body"
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
        <Meta
          content="width=device-width, initial-scale=1, maximum-scale=5"
          name="viewport"
        />
        <Meta name="twitter:site" :content="XUsername" />
        <Meta name="twitter:creator" :content="XUsername" />
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
        <Meta name="theme-color" :content="themeColors.hex" />
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body :class="themeColors.body">
        <NuxtLoadingIndicator
          color="repeating-linear-gradient(to right,var(--beam-green-dark) 0%,var(--beam-pink) 100%)"
          class="will-change-auto"
        />
        <DownloadDownloaderManager />
        <main
          :class="{
            locked: windowLocked,
            blurred: windowBlurred,
          }"
        >
          <HeaderComponent
            :nav-class="themeColors.header"
            :gradient-color="themeColors.gradientColorRgb"
          />
          <slot />
        </main>
        <FooterComponent :class="themeColors.footer" />
      </Body>
    </Html>
  </LanguageHandler>
</template>

<script lang="ts" setup>
import type { RouteRecordName } from "vue-router";
import { linkElements } from "@/utils/linkElements";
import { SupportedPlatforms, ExternalLinks } from "@/app.config";
import {
  EnvironmentType,
  getDownloadsFor,
} from "~/composables/usePlatformDetails";

enum THEME_COLORS {
  BLUE = "#041D3C",
  PURPLE = "#260043",
  GREEN = "#022216",
  BLUE_INDEX = "#032645",
}

enum BACKGROUND_COLORS {
  BLUE = "bg-beam-bg-blue",
  PURPLE = "bg-beam-bg-purple",
  GREEN = "bg-beam-bg-green",
}

enum HEADER_COLORS {
  BLUE = "bg-[rgba(4,37,72,.6)]",
  PURPLE = "bg-[rgba(54,0,97,.6)]",
  GREEN = "bg-[rgba(3,50,34,.6)]",
}

enum FOOTER_COLORS {
  BLUE = "bg-page-radial-gradient",
  PURPLE = "bg-page-radial-gradient-purple",
  GREEN = "bg-page-radial-gradient-dark-green",
}

type GradientColorRbg = [number, number, number];
interface ThemeSettings {
  header: string;
  footer: string;
  body: string;
  hex: string;
  gradientColorRgb: GradientColorRbg;
}

const gradientColorsRgb: Record<string, GradientColorRbg> = {
  BLUE: hexToRgb(THEME_COLORS.BLUE) as GradientColorRbg,
  GREEN: hexToRgb(THEME_COLORS.GREEN) as GradientColorRbg,
  PURPLE: hexToRgb(THEME_COLORS.PURPLE) as GradientColorRbg,
  BLUE_INDEX: hexToRgb(THEME_COLORS.BLUE_INDEX) as GradientColorRbg,
};

function getTheme(routeName: RouteRecordName): ThemeSettings {
  const formatRouteName = getRouteName(routeName);
  let header = HEADER_COLORS.BLUE;
  let footer = FOOTER_COLORS.BLUE;
  let body = BACKGROUND_COLORS.BLUE;
  let hex = THEME_COLORS.BLUE;
  let gradientColorRgb = gradientColorsRgb.BLUE;

  switch (formatRouteName) {
    case "mining":
      header = HEADER_COLORS.GREEN;
      footer = FOOTER_COLORS.GREEN;
      body = BACKGROUND_COLORS.GREEN;
      hex = THEME_COLORS.GREEN;
      gradientColorRgb = gradientColorsRgb.GREEN;
      break;
    case "docs":
    case "docs-slug":
      header = HEADER_COLORS.PURPLE;
      footer = FOOTER_COLORS.PURPLE;
      body = BACKGROUND_COLORS.PURPLE;
      hex = THEME_COLORS.PURPLE;
      gradientColorRgb = gradientColorsRgb.PURPLE;
      break;
    case "index":
      gradientColorRgb = gradientColorsRgb.BLUE_INDEX;
      break;
  }
  return { header, footer, body, hex, gradientColorRgb };
}

const windowLocked = useState("windowLocked", () => false);
const windowBlurred = useState("windowBlurred", () => false);

const platformDetails = await getDownloadsFor(EnvironmentType.MAINNET);
const XUsername = extractXUsername(ExternalLinks.X) as string;

const route = useRoute();
const themeColors = ref<ThemeSettings>(
  getTheme(route.name ? route.name : "index"),
);

watch(
  () => route.fullPath,
  (_routeName) => {
    themeColors.value = getTheme(route.name as string);
  },
);

useTitleTemplate();

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>

<style scoped>
main {
  @apply transition-transform duration-[225ms] origin-[50%_300px];
  &.locked,
  &.blurred {
    @apply pointer-events-none select-none;
  }
  &.locked {
    @apply overflow-hidden h-screen touch-none overscroll-none;
    -webkit-overflow-scrolling: none;
  }
  &.blurred {
    @apply blur-sm opacity-40 scale-90;
  }
}
</style>
