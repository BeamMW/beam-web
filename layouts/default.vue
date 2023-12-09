<template>
  <div>
    <Html
      :lang="head.htmlAttrs && head.htmlAttrs.lang"
      :dir="head.htmlAttrs && head.htmlAttrs.dir"
      :class="themeColors.body"
    >
      <Head>
        <Meta name="theme-color" :content="themeColors.body" />
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
          <HeaderInteractiveBar
            :gradient-color="themeColors.gradientColorRgb"
          />
          <HeaderComponent :class="themeColors.header" />
          <slot />
          <FooterComponent :class="themeColors.footer" />
        </main>
      </Body>
    </Html>
  </div>
</template>

<script lang="ts" setup>
import type { RouteRecordName } from "vue-router";

function getTheme(routeName: RouteRecordName): ThemeSettings {
  let header: string, footer: string, body: string;
  switch (getRouteName(routeName)) {
    case "mining":
      header = "bg-[rgba(3,50,34,.6)]";
      footer = "bg-page-radial-gradient-dark-green";
      body = BACKGROUND_COLORS.GREEN;
      break;
    case "docs":
    case "docs-slug":
      header = "bg-[rgba(54,0,97,.6)]";
      footer = "bg-page-radial-gradient-purple";
      body = BACKGROUND_COLORS.PURPLE;
      break;
    default:
      header = "bg-[rgba(4,37,72,.6)]";
      footer = "bg-page-radial-gradient";
      body = BACKGROUND_COLORS.BLUE;
  }
  const gradientColorRgb = hexToRgb(body) as GradientColorRbg;
  return { header, footer, body, gradientColorRgb };
}

enum THEME_COLORS {
  BLUE = "blue",
  PURPLE = "purple",
  GREEN = "green",
}

enum BACKGROUND_COLORS {
  BLUE = "bg-beam-bg-blue", // #041D3C
  PURPLE = "bg-beam-bg-purple", // #1C002E
  GREEN = "bg-beam-bg-green", // #00150B
}

type GradientColorRbg = [number, number, number];
interface ThemeSettings {
  header: string;
  footer: string;
  body: string;
  gradientColorRgb: GradientColorRbg;
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
  { immediate: true },
);

useTitleTemplate();

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>
