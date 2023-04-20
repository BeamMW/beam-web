<template>
  <footer
    class="border-t border-black border-opacity-30 shadow-[0px_1px_0px_0px_rgba(255,255,255,.05)_inset] bg-page-radial-gradient"
    v-bind="$attrs"
  >
    <ClientOnly>
      <LayoutAnimatedModal ref="qqModal" :title="t('footer.community.qq')">
        <Icon
          name="footer/qq"
          class="rounded-md w-[256px] h-[256px] select-none pointer-events-none"
          :as-image="true"
          :lazy="true"
        />
        <p class="text-center text-lg font-bold">
          <LayoutCopyToClipboard :text="'909677190'">
            909677190
          </LayoutCopyToClipboard>
        </p>
      </LayoutAnimatedModal>
    </ClientOnly>
    <div class="w-full py-12 px-4 mx-auto max-w-[85rem] sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-6 mb-10 md:grid-cols-4 lg:grid-cols-5">
        <div class="col-span-full hidden lg:col-span-1 lg:block">
          <div class="flex pointer-events-none select-none gap-3">
            <Icon
              name="logo"
              class="w-10 h-10 select-none pointer-events-none"
              :as-image="true"
              :lazy="true"
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
          <div class="flex pointer-events-none select-none gap-3">
            <Icon
              name="logo"
              class="w-10 h-10 select-none pointer-events-none"
              :as-image="true"
              :lazy="true"
            />
          </div>
          <p class="mt-3 text-xs text-white/80">{{ $t("footer.copyright") }}</p>
        </div>
        <div
          class="flex gap-y-3 flex-col lg:flex-row lg:justify-between lg:items-center lg:gap-y-0"
        >
          <div class="flex items-center">
            <div class="space-x-4 text-sm">
              <NuxtLink
                class="capitalize transition-colors text-white/50 hover:text-white/90"
                :to="localePath('privacy-policy')"
              >
                {{ $t("privacy.title") }}
              </NuxtLink>
              <a
                class="capitalize inline-flex gap-x-2 transition-colors text-white/50 hover:text-white/90"
                :href="`mailto:${CONTACT_EMAIL}`"
              >
                {{ $t("footer.contact") }}
              </a>
              <NuxtLink
                target="_blank"
                class="capitalize transition-colors text-white/50 hover:text-white/90"
                to="https://docs.beam.mw/BEAM_Media_Kit_and_resources_v4.zip"
                >{{ $t("footer.mediakit") }}</NuxtLink
              >
            </div>
          </div>
          <div class="flex justify-between items-center gap-3">
            <section
              v-for="(icon, index) of socialIcons"
              :key="index"
              class="space-x-4"
            >
              <NuxtLink
                target="_blank"
                v-bind="{ title: typedExternalLinksTitle[icon] }"
                class="inline-block text-gray-200 200 opacity-60 hover:opacity-90 transition select-none"
                :to="ExternalLinks[icon]"
              >
                <Icon
                  :name="`socials/${typedExternalLinksIcon[icon]}`"
                  class="w-[18px] h-[18px] select-none pointer-events-none"
                  :as-image="true"
                  :lazy="true"
                />
              </NuxtLink>
            </section>
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
  CONTACT_EMAIL,
} from "../app.config";

// Make it async
const Icon = defineAsyncComponent(() => import("./icon.vue"));

const { t } = useI18n();
const localePath = useLocalePath();

const socialIcons = Object.keys(ExternalLinksIcon).filter(
  (value) => typeof value === "string"
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
      {
        text: t("footer.join.beamOutreachClub"),
        href: "https://beamoutreach.club",
      },
      { text: t("footer.join.beamForum"), href: ExternalLinks.FORUM },
      { text: t("footer.join.beamBlog"), href: ExternalLinks.MEDIUM },
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
        onClick: () => openQQModal(),
      },
    ],
  },
  {
    title: t("footer.developers.title"),
    links: [
      {
        text: t("footer.developers.documentation"),
        href: "https://documentation.beam.mw/",
      },
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
  {
    title: t("footer.miners.title"),
    links: [
      { text: t("footer.miners.startMining"), href: "lol" },
      { text: t("footer.miners.support"), href: "https://t.me/BeamMiners" },
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
