// https://nuxt.com/docs/api/configuration/nuxt-config
import { join, sep } from "path";
import { globSync } from "glob";
import { copy } from "fs-extra";

const publicWebUrl = process.env.PUBLIC_WEB_URL || "https://beam.mw";

// https://github.com/nuxt/content/issues/1551#issuecomment-1470246543
// Added README to index replacement (as understood by the slug)
const docsRoutes = globSync("./content/**/*.md").map((path) =>
  path
    .slice(7, -3)
    .replace(/\d+\./g, "")
    .replace(/\\/g, "/")
    .replace("/README", "/index")
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
      ""
    );
    const destination = join(publicAssetsPath, destinationFolder);

    // Copy the contents of the .gitbook/assets folder to the destination folder
    await copy(source, destination);
    console.log(`Contents of ${source} copied to ${destination}.`);
  }
};

export default defineNuxtConfig({
  ssr: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/device",
    "nuxt-simple-sitemap",
    "nuxt-simple-robots",
    "@nuxtjs/fontaine",
    "@nuxt/content",
  ],
  nitro: {
    prerender: {
      routes: ["/sitemap.xml", "/rss.xml", ...docsRoutes],
    },
  },
  hooks: {
    "build:before": async () => {
      await copyDocsAssetsToPublic();
    },
  },
  runtimeConfig: {
    public: {
      // Can be set with environment variables
      siteUrl: publicWebUrl,
    },
  },
  content: {
    documentDriven: false,
    /* sources: {
      desktop: {
        prefix: "/docs/desktop", // All contents inside this source will be prefixed with `/fa`
        driver: "fs",
        // ...driverOptions
        base: path.resolve(__dirname, "docs", "desktop"), // Path for source directory
      },
    }, */
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
    strategy: "prefix",
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
    locales: [
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
    ],
  },
});
