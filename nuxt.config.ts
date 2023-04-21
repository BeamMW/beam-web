// https://nuxt.com/docs/api/configuration/nuxt-config
const publicWebUrl = process.env.PUBLIC_WEB_URL || "https://beam.mw";

export default defineNuxtConfig({
  ssr: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxtjs/device",
    "nuxt-simple-sitemap",
    "nuxt-simple-robots",
    "@nuxtjs/fontaine",
  ],
  runtimeConfig: {
    public: {
      // Can be set with environment variables
      siteUrl: publicWebUrl,
    },
  },
  sitemap: {
    discoverImages: false,
    siteUrl: publicWebUrl,
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
