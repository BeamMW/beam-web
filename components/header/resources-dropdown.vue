<template>
  <section class="custom-container px-4 pt-4">
    <ClientOnly>
      <div class="pb-4 font-bold md:hidden">
        <HeaderLivePrice />
      </div>
    </ClientOnly>
    <div v-for="(menu, index) in menus" :key="index" class="grid-item">
      <template v-if="menu.menus">
        <div v-for="(innermenu, indexInner) in menu.menus" :key="indexInner">
          <HeaderResourcesDropdownGridItem :menu="innermenu" />
        </div>
      </template>
      <template v-else>
        <HeaderResourcesDropdownGridItem :menu="menu" />
      </template>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ExternalLinks, ExternalLinksTitle, dappnetUrls } from "@/app.config";

const { t } = useI18n();
const localePath = useLocalePath();

const menus = computed(() => [
  {
    title: t("footer.join.title"),
    links: [
      {
        text: t("header.nav.home"),
        href: localePath("index"),
        class: "block md:hidden",
      },
      {
        text: t("footer.join.downloadWallet"),
        href: localePath("downloads"),
        class: "block md:hidden",
      },
      {
        text: t("head.title.documentation"),
        href: localePath("docs"),
        class: "block md:hidden",
      },
      { text: t("footer.join.beamForum"), href: ExternalLinks.FORUM },
      { text: ExternalLinksTitle.TWITTER, href: ExternalLinks.TWITTER },
      { text: t("footer.join.newsletter"), href: ExternalLinks.SUBSTACK },
      { text: t("footer.join.roadmap"), href: ExternalLinks.ROADMAP },
      { text: ExternalLinksTitle.YOUTUBE, href: ExternalLinks.YOUTUBE },
      { text: t("footer.join.beamBlog"), href: ExternalLinks.MEDIUM },
    ],
  },
  {
    title: t("footer.community.title"),
    links: [
      { text: t("footer.community.telegram"), href: ExternalLinks.TELEGRAM },
      { text: t("footer.community.discord"), href: ExternalLinks.DISCORD },
      { text: t("footer.community.reddit"), href: ExternalLinks.REDDIT },
      {
        text: t("footer.community.qq"),
        href: ExternalLinks.QQ,
      },
      { text: ExternalLinksTitle.COINGECKO, href: ExternalLinks.COINGECKO },
      { text: ExternalLinksTitle.CMC, href: ExternalLinks.CMC },
      { text: t("footer.miners.support"), href: ExternalLinks.GENERAL_SUPPORT },
    ],
  },
  {
    menus: [
      {
        title: t("footer.developers.title"),
        links: [
          {
            text: t("footer.developers.blockchainExplorer"),
            href: ExternalLinks.EXPLORER,
          },
          {
            text: t("footer.developers.sourceCode"),
            href: ExternalLinks.GITHUB,
          },
          {
            text: t("footer.developers.dAppnetWallet"),
            href: `${dappnetUrls[0]}${localePath("downloads")}`,
          },
          {
            text: t("footer.developers.support"),
            href: ExternalLinks.DEVELOPERS_SUPPORT,
          },
        ],
      },
      {
        title: t("footer.miners.title"),
        links: [
          { text: t("footer.miners.startMining"), href: localePath("mining") },
          {
            text: t("footer.miners.support"),
            href: ExternalLinks.MINING_SUPPORT,
          },
        ],
      },
    ],
  },
]);
</script>
<style lang="postcss" scoped>
.grid-item {
  @apply p-1;
}

@media (min-width: 768px) {
  .custom-container {
    @apply grid grid-cols-3;
    grid-auto-rows: min-content;
    grid-gap: 1rem; /* Adjust the gap between items as needed */
  }
}
</style>
