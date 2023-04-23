<template>
  <section class="dropdown-container">
    <div class="grid-container p-4 h-full overflow-y-scroll pb-[25vh] md:!pb-4">
      <div v-for="(menu, index) in menus" :key="index" class="grid-item">
        <h6
          class="pt-3 pb-3 md:pb-0 md:pt-0 md:px-0 font-bold text-xs sm:text-base uppercase text-gray-200"
        >
          {{ menu.title }}
        </h6>
        <ul class="flex flex-col pt-2">
          <li v-for="(link, indexL) in menu.links" :key="indexL">
            <NuxtLink
              :to="link.href"
              :class="`mb-2 inline-block capitalize transition text-white/70 hover:text-white ${link.class ? link.class : ''}`"
              :target="getLinkTarget(link.href)"
              >{{ link.text }}</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ExternalLinks } from "@/app.config";

const { t } = useI18n();
const localePath = useLocalePath();

const menus = computed(() => [
  {
    title: t("footer.join.title"),
    links: [
      {
        text: t("footer.join.downloadWallet"),
        href: localePath("downloads"),
        class: 'block md:hidden'
      },
      {
        text: t("footer.developers.documentation"),
        href: localePath("docs"),
        class: 'block md:hidden'
      },
      {
        text: t("footer.join.beamOutreachClub"),
        href: "https://beamoutreach.club",
      },
      { text: t("footer.join.beamForum"), href: ExternalLinks.FORUM },
      { text: t("footer.join.beamBlog"), href: ExternalLinks.MEDIUM },
      { text: "Roadmap", href: "#" },
      { text: "Newsletter", href: ExternalLinks.SUBSTACK },
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
        href: "https://qm.qq.com/cgi-bin/qm/qr?k=qrfLNFTLxvThCgcF0fqPc2YFtDzMiUcm&authKey=8hGDPVzLLlTvX4SCBAeYc8TlaumsgvpTIdSUs3%2FU0K8U5piBp3znAYD%2Bd9n6vfEC",
      },
    ],
  },
  {
    title: t("footer.miners.title"),
    links: [
      { text: t("footer.miners.startMining"), href: localePath("mining") },
      { text: t("footer.miners.support"), href: "https://t.me/BeamMiners" },
    ],
  },
  {
    title: t("footer.developers.title"),
    links: [
      {
        text: t("footer.developers.blockchainExplorer"),
        href: "https://explorer.beam.mw/",
      },
      { text: t("footer.developers.sourceCode"), href: ExternalLinks.GITHUB },
      {
        text: t("footer.developers.dAppnetWallet"),
        href: `https://dappnet.beam.mw${localePath("downloads")}`,
      },
      {
        text: t("footer.developers.support"),
        href: "https://t.me/beamdevsupport",
      },
    ],
  },
]);
</script>
<style lang="postcss" scoped>
.grid-container {
  -webkit-overflow-scrolling: touch;
}

.grid-item {
  @apply p-1;
}

@media (min-width: 768px) {
  .grid-container {
    @apply grid grid-cols-3;
    grid-auto-rows: min-content;
    grid-gap: 1rem; /* Adjust the gap between items as needed */
  }

  .grid-container > div:nth-child(1) {
    @apply col-start-1 col-span-1 row-start-1 row-span-2;
  }

  .grid-container > div:nth-child(2) {
    @apply col-start-2 col-span-1 row-start-1;
  }

  .grid-container > div:nth-child(3) {
    @apply col-start-2 col-span-1 row-start-2;
  }

  .grid-container > div:nth-child(4) {
    @apply col-start-3 col-span-1 row-start-1 row-span-2;
  }
}
</style>
