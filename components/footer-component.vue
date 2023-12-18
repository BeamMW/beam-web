<template>
  <footer
    class="border-t border-black border-opacity-30 shadow-[0px_1px_0px_0px_rgba(255,255,255,.05)_inset] transition-colors background-radial-defaults"
    v-bind="$attrs"
  >
    <ClientOnly>
      <LayoutAnimatedModal ref="qqModal" :title="t('footer.community.qq')">
        <Icon
          name="footer/qq"
          class="rounded-md w-[256px] h-[256px]"
          :as-image="true"
          loading="lazy"
        />
        <p class="text-center text-lg font-bold">
          <LayoutCopyToClipboard :text="`${qqGroupId}`">
            {{ qqGroupId }}
          </LayoutCopyToClipboard>
        </p>
      </LayoutAnimatedModal>
    </ClientOnly>
    <div class="w-full py-9 md:py-12 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-6 mb-10 md:grid-cols-4 lg:grid-cols-5">
        <div class="col-span-full hidden lg:col-span-1 lg:block">
          <div class="flex gap-3">
            <Icon
              name="logo"
              alt="Beam logo"
              class="w-10 h-10"
              :as-image="true"
              loading="lazy"
            />
          </div>
          <p class="mt-3 text-xs text-white/80">{{ $t("footer.copyright") }}</p>
        </div>
        <section v-for="(menu, index) in menus" :key="index">
          <FooterColumn :title="menu.title" :links="menu.links" />
        </section>
      </div>
      <div class="pt-5 mt-5 border-t border-[rgba(255,255,255,.05)]">
        <div class="mb-3 lg:hidden">
          <div class="flex gap-3">
            <Icon
              name="logo"
              alt="Beam logo"
              class="w-10 h-10"
              :as-image="true"
              loading="lazy"
            />
          </div>
          <p class="mt-3 text-xs text-white/80">{{ $t("footer.copyright") }}</p>
        </div>
        <div
          class="flex gap-y-5 flex-col lg:flex-row lg:justify-between lg:items-center lg:gap-y-0"
        >
          <div class="flex items-center">
            <div class="space-x-4 text-sm">
              <LayoutLink
                class="capitalize transition-colors text-white/50 hover:text-white/90"
                :to="localePath('privacy-policy')"
              >
                {{ $t("privacy.title") }}
              </LayoutLink>
              <a
                class="capitalize inline-flex gap-x-2 transition-colors text-white/50 hover:text-white/90"
                :title="t('footer.contact')"
                :href="ExternalLinks.SUPPORT_EMAIL"
              >
                {{ $t("footer.contact") }}
              </a>
              <LayoutLink
                class="capitalize transition-colors text-white/50 hover:text-white/90"
                to="/assets/BEAM_Media_Kit_and_resources_v4.zip"
                target="_blank"
                >{{ $t("footer.mediakit") }}</LayoutLink
              >
            </div>
          </div>
          <div
            class="flex justify-between flex-wrap items-center gap-0.5 md:gap-3"
          >
            <div v-for="(icon, index) of socialIcons" :key="index">
              <LayoutLink
                v-bind="{ title: typedExternalLinksTitle[icon] }"
                class="inline-block text-gray-200 200 opacity-60 hover:opacity-90 transition select-none"
                :to="ExternalLinks[icon]"
              >
                <Icon
                  :name="`socials/${typedExternalLinksIcon[icon]}`"
                  :alt="typedExternalLinksTitle[icon]"
                  class="w-[18px] h-[18px]"
                  :as-image="true"
                  loading="lazy"
                />
              </LayoutLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import {
  ExternalLinks,
  ExternalLinksIcon,
  ExternalLinksTitle,
  dappnetUrls,
  qqGroupId,
} from "@/app.config";

// Make it async
const Icon = defineAsyncComponent(() => import("./icon.vue"));

const { t } = useI18n();
const localePath = useLocalePath();

const socialIcons = Object.keys(ExternalLinksIcon).filter(
  (value) => typeof value === "string",
) as (keyof typeof ExternalLinksIcon)[];

const qqModal = ref();

function openQQModal() {
  qqModal.value.show();
}

const menus = computed(() => [
  {
    title: t("footer.join.title"),
    links: [
      {
        text: t("footer.join.downloadWallet"),
        href: localePath("downloads"),
      },
      { text: t("footer.join.beamForum"), href: ExternalLinks.FORUM },
      { text: ExternalLinksTitle.X, href: ExternalLinks.X },
      {
        text: t("footer.join.roadmap"),
        href: "javascript://",
        onClick: () =>
          eventBus.emit(UserInteractionEvents.CLOSE_MENUS, {
            callback: () =>
              eventBus.emit(UserInteractionEvents.SCROLL_TO_ROADMAP, {}),
          }),
      },
      { text: t("footer.join.newsletter"), href: ExternalLinks.SUBSTACK },
      { text: ExternalLinksTitle.YOUTUBE, href: ExternalLinks.YOUTUBE },
      { text: t("footer.join.beamBlog"), href: ExternalLinks.MEDIUM },
      { text: "Beampedia", href: `${localePath("docs")}/beampedia` },
    ],
  },
  {
    title: t("footer.community.title"),
    links: [
      { text: t("footer.community.telegram"), href: ExternalLinks.TELEGRAM },
      { text: t("footer.community.discord"), href: ExternalLinks.DISCORD },
      { text: t("footer.community.reddit"), href: ExternalLinks.REDDIT },
      { text: ExternalLinksTitle.BEAMASSETS, href: ExternalLinks.BEAMASSETS },
      {
        text: t("footer.community.qq"),
        href: ExternalLinks.QQ,
        onClick: () => openQQModal(),
      },
      { text: ExternalLinksTitle.COINGECKO, href: ExternalLinks.COINGECKO },
      { text: ExternalLinksTitle.CMC, href: ExternalLinks.CMC },
      { text: t("footer.miners.support"), href: ExternalLinks.GENERAL_SUPPORT },
    ],
  },
  {
    title: t("footer.developers.title"),
    links: [
      {
        text: t("head.title.documentation"),
        href: localePath("docs"),
      },
      {
        text: t("footer.developers.blockchainExplorer"),
        href: ExternalLinks.EXPLORER,
      },
      { text: t("footer.developers.sourceCode"), href: ExternalLinks.GITHUB },
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
      { text: t("footer.miners.support"), href: ExternalLinks.MINING_SUPPORT },
    ],
  },
]);

// Change the type of icon in the loop for socialIcons
const typedExternalLinksIcon: Record<keyof typeof ExternalLinksIcon, string> =
  ExternalLinksIcon;

// Change the type of icon in the loop for ExternalLinksTitle
const typedExternalLinksTitle: Record<keyof typeof ExternalLinksTitle, string> =
  ExternalLinksTitle;
</script>
