// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@nuxtjs/device"],
  i18n: {
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
        name: "English",
        file: "en.json",
      },
      {
        code: "fr",
        name: "Français",
        file: "fr.json",
      },
      {
        code: "zh",
        name: "中文（繁體）",
        file: "zh.json",
      },
      {
        code: "jp",
        name: "日本語",
        file: "jp.json",
      },
    ],
  },
});
