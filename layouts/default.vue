<template>
  <div>
    <Html
      :lang="head.htmlAttrs && head.htmlAttrs.lang"
      :dir="head.htmlAttrs && head.htmlAttrs.dir"
      :class="themeColors.body"
    >
      <Head>
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
        <main>
          <DownloadDownloaderManager />
          <HeaderComponent
            :nav-class="themeColors.header"
            :gradient-color="themeColors.gradientColorRgb"
          />
          <slot />
          <FooterComponent :class="themeColors.footer" />
        </main>
      </Body>
    </Html>
  </div>
</template>

<script lang="ts" setup>
import type { RouteRecordName } from "vue-router";

enum THEME_COLORS {
  BLUE = "#03355D",
  PURPLE = "#34005D",
  GREEN = "#02311E",
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

function getTheme(routeName: RouteRecordName): ThemeSettings {
  const formatRouteName = getRouteName(routeName);
  let header: string,
    footer: string,
    body: string,
    hex: string,
    gradientColorRgb: GradientColorRbg;

  switch (formatRouteName) {
    case "mining":
      header = HEADER_COLORS.GREEN;
      footer = FOOTER_COLORS.GREEN;
      body = BACKGROUND_COLORS.GREEN;
      hex = THEME_COLORS.GREEN;
      gradientColorRgb = hexToRgb(THEME_COLORS.GREEN) as GradientColorRbg;
      break;
    case "docs":
    case "docs-slug":
      header = HEADER_COLORS.PURPLE;
      footer = FOOTER_COLORS.PURPLE;
      body = BACKGROUND_COLORS.PURPLE;
      hex = THEME_COLORS.PURPLE;
      gradientColorRgb = hexToRgb(THEME_COLORS.PURPLE) as GradientColorRbg;
      break;
    default:
      header = HEADER_COLORS.BLUE;
      footer = FOOTER_COLORS.BLUE;
      body = BACKGROUND_COLORS.BLUE;
      hex = THEME_COLORS.BLUE;
      gradientColorRgb = hexToRgb(THEME_COLORS.BLUE) as GradientColorRbg;
  }
  return { header, footer, body, hex, gradientColorRgb };
}

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
