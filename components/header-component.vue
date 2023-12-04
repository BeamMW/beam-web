<script lang="ts" setup>
import { ExternalLinks } from "@/app.config";

const localePath = useLocalePath();
</script>
<template>
  <nav
    class="sticky backdrop-blur-xl top-0 left-0 w-full z-20 border-white border-b border-opacity-5 shadow-[0px_1px_0px_0px_rgba(0,0,0,.5)] transition-colors"
    v-bind="$attrs"
  >
    <div
      class="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] max-w-screen-xl mx-auto items-center py-4 px-3 md:px-4"
    >
      <div class="order-2 md:order-1 flex items-center">
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
            <HeaderNavigationItem name="index" :to="localePath('index')">{{
              $t("header.nav.home")
            }}</HeaderNavigationItem>
          </li>
          <li class="hidden md:block">
            <HeaderNavigationItem
              name="downloads"
              :to="localePath('downloads')"
              >{{ $t("header.nav.downloads") }}</HeaderNavigationItem
            >
          </li>
          <li class="hidden md:block">
            <HeaderNavigationItem
              name="dex"
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
                  class="flex items-center md:hidden p-1 h-9 w-9 text-sm text-white rounded-lg focus:outline-none focus:ring-2 hover:opacity-80 transition-opacity focus:ring-white"
                >
                  <Icon
                    name="layout/menus"
                    class="w-7 h-7 select-none"
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
</template>
