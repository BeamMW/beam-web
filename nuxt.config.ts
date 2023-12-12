// https://nuxt.com/docs/api/configuration/nuxt-config
import { join, sep } from "path";
import { globSync } from "glob";
import { pathExists, copy } from "fs-extra";
import type { LocaleObject, Directions } from "vue-i18n-routing";

// List of supported languages
const locales: LocaleObject[] = [
  {
    code: "en",
    iso: "en-US",
    name: "English",
    file: "en.json",
  },
  {
    code: "fr",
    name: "Français",
    iso: "fr-FR",
    file: "fr.json",
  },
  {
    code: "de",
    name: "Deutsch",
    iso: "de-DE",
    file: "de.json",
  },
  {
    code: "ru",
    name: "Русский",
    iso: "ru-RU",
    file: "ru.json",
  },
  {
    code: "he",
    name: "עִברִית",
    iso: "he-IL",
    file: "he.json",
    dir: "rtl" as Directions,
  },
  {
    code: "ar",
    name: "العربية الفصحى",
    iso: "ar-001",
    file: "ar.json",
    dir: "rtl" as Directions,
  },
  {
    code: "es",
    name: "Español",
    iso: "es-ES",
    file: "es.json",
  },
  /*
  {
    code: "pt",
    name: "Português",
    iso: "pt-PT",
    file: "pt.json",
  },
  */
  {
    code: "zh",
    name: "中文（繁體）",
    iso: "zh-CN",
    file: "zh.json",
  },
  {
    code: "jp",
    name: "日本語",
    iso: "ja-JP",
    file: "jp.json",
  },
].sort((a, b) => a.code.localeCompare(b.code));

const publicWebUrl = process.env.PUBLIC_WEB_URL || "https://beam.mw";

// https://github.com/nuxt/content/issues/1551#issuecomment-1470246543
// Added README to index replacement (as understood by the slug)
const docsRoutes = globSync("./content/**/*.md").map((path) =>
  path
    .slice(7, -3)
    .replace(/^\d+\./, "")
    .replace(/\\/g, "/")
    .replace("/README", "/index"),
);

const copyDocsAssetsToPublic = async () => {
  const docsPath = join(process.cwd(), "content", "docs");
  const publicAssetsPath = join(process.cwd(), "public", "assets", "docs");

  // Find all .gitbook/assets folders within the subdirectories of 'content/docs'
  const gitbookAssetsFolders = globSync("**/.gitbook/assets", {
    cwd: docsPath,
  });

  // Iterate over the .gitbook/assets folders and copy their contents
  for (const gitbookAssetsFolder of gitbookAssetsFolders) {
    const source = join(docsPath, gitbookAssetsFolder);
    // Get the parent directory name without the '.gitbook/assets' part
    const destinationFolder = gitbookAssetsFolder.replace(
      `${sep}.gitbook${sep}assets`,
      "",
    );
    const destination = join(publicAssetsPath, destinationFolder);

    // Check if the destination folder exists
    const folderExists = await pathExists(destination);

    // If the destination folder doesn't exist, copy the contents of the .gitbook/assets folder to the destination folder
    if (!folderExists) {
      await copy(source, destination);
      // eslint-disable-next-line no-console
      console.log(`Contents of ${source} copied to ${destination}.`);
    }
  }
};

export default defineNuxtConfig({
  ssr: true,
  app: {
    pageTransition: false,
    layoutTransition: false,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/device",
    "nuxt-simple-sitemap",
    "nuxt-simple-robots",
    "@nuxtjs/fontaine",
    "@nuxt/content",
    "nuxt-multi-cache",
  ],
  multiCache: {
    component: {
      // If true the cache is enabled.
      // If false the cache is disabled, but the component is still added to
      // the build.
      enabled: true,
    },
  },
  nitro: {
    prerender: {
      routes: ["/sitemap.xml", ...docsRoutes],
      // crawlLinks: true,
      failOnError: false,
    },
  },
  hooks: {
    "build:before": async () => {
      await copyDocsAssetsToPublic();
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: publicWebUrl,
      baseURL: publicWebUrl,
    },
  },
  content: {
    documentDriven: false,
  },
  sitemap: {
    discoverImages: false,
    siteUrl: publicWebUrl,
  },
  fontMetrics: {
    fonts: [
      { family: "ProximaNova", src: "/fonts/ProximaNova-Regular.woff2" },
      {
        family: "ProximaNova-Italic",
        src: "/fonts/ProximaNova-RegularIt.woff2",
      },
      { family: "ProximaNova-Bold", src: "/fonts/ProximaNova-Bold.woff2" },
    ],
  },
  i18n: {
    baseUrl: publicWebUrl,
    skipSettingLocaleOnNavigate: false,
    defaultLocale: "en",
    lazy: true,
    langDir: "locales",
    vueI18n: "./i18n.config.ts",
    customRoutes: "config", // Disable custom route with page components
    strategy: "prefix_and_default",
    pages: {
      downloads: {
        en: "/downloads",
        fr: "/telechargements",
        zh: "/下载",
        jp: "/ダウンロード",
      },
      "privacy-policy": {
        en: "/privacy-policy",
        fr: "/politique-de-confidentialite",
        zh: "/隐私政策",
        jp: "/プライバシーポリシー",
      },
      mining: {
        en: "/mining",
        fr: "/minage",
        zh: "/挖矿",
        jp: "/マイニング",
      },
    },
    locales,
  },
});
