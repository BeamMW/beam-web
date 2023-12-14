<script lang="ts" setup>
import { ExternalLinks } from "@/app.config";

const localePath = useLocalePath();

defineProps({
  navClass: {
    type: String,
    required: false,
    default: "",
  },
  interactiveBar: {
    type: Boolean,
    required: false,
    default: true,
  },
  gradientColor: {
    type: Array,
    required: false,
    default: undefined,
  },
});
</script>
<template>
  <div class="absolute h-full w-full z-20 pointer-events-none">
    <div
      v-if="interactiveBar && gradientColor"
      :class="[
        'header-box mb-6 overflow-hidden backdrop-brightness-50',
        navClass,
      ]"
    >
      <HeaderInteractiveBar :gradient-color="gradientColor" />
    </div>
    <nav
      :class="[
        'sticky header-box max-w-7xl xl:mx-auto mx-3 rounded-full',
        navClass,
      ]"
    >
      <div
        class="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center py-2 md:py-4 px-4 md:px-5"
      >
        <div class="order-2 md:order-1 flex self-start">
          <div class="inline-block w-auto">
            <HeaderLogo />
          </div>
        </div>
        <div
          class="justify-self-start order-1 md:justify-self-auto md:order-2 text-base text-white font-bold"
        >
          <ul
            class="md:flex md:p-0 font-medium md:rounded-lg md:flex-row md:gap-x-8 md:mt-0"
          >
            <li class="hidden md:block">
              <HeaderNavigationItem
                name="index"
                :prefetch="true"
                :to="localePath('index')"
                >{{ $t("header.nav.home") }}</HeaderNavigationItem
              >
            </li>
            <li class="hidden md:block">
              <HeaderNavigationItem
                name="downloads"
                :prefetch="true"
                :to="localePath('downloads')"
                >{{ $t("header.nav.downloads") }}</HeaderNavigationItem
              >
            </li>
            <li class="hidden md:block">
              <HeaderNavigationItem
                :to="ExternalLinks.DEX"
                target="_blank"
                rel="noopener noreferrer"
                >DEX</HeaderNavigationItem
              >
            </li>
            <li class="hidden md:block">
              <HeaderNavigationItem
                name="docs|docs/.*"
                :to="localePath('docs')"
                :prefetch="true"
                class="active-pink"
                >{{ $t("head.title.documentation") }}</HeaderNavigationItem
              >
            </li>
            <li>
              <LayoutDropdown>
                <template #dropdown-button>
                  <HeaderNavigationItem
                    as="button"
                    class="hidden md:inline-flex items-center gap-2"
                  >
                    {{ $t("header.nav.resources") }}
                    <Icon
                      class="rotate-90 block w-3 h-3 text-white group-hover:opacity-100 opacity-60 transition-opacity"
                      name="layout/arrow-right"
                    />
                  </HeaderNavigationItem>
                  <button
                    title="Home"
                    type="button"
                    class="flex items-center md:hidden p-1 h-8 w-8 text-sm rounded-lg focus:outline-none focus:ring-2 hover:opacity-75 opacity-90 transition-all focus:ring-beam-blue focus:ring-offset-[#042248]"
                  >
                    <Icon
                      name="layout/menus"
                      class="w-7 h-7 select-none"
                      alt="Menus"
                      :as-image="true"
                    />
                  </button>
                </template>
                <template #dropdown-content>
                  <HeaderResourcesDropdown />
                </template>
              </LayoutDropdown>
            </li>
          </ul>
        </div>

        <div
          class="justify-self-end flex items-center order-last lrt:text-left rtl:text-right"
        >
          <HeaderLanguage />
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.header-box {
  @apply backdrop-blur-xl top-3 z-20 border-white border border-opacity-5 shadow-[0px_0px_0px_1px_rgba(0,0,0,.5)] transition-all pointer-events-auto;
}
</style>
