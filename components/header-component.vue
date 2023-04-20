<script type="ts" setup>
const localePath = useLocalePath()
</script>
<template>
  <nav
    class="sticky backdrop-blur-xl top-0 left-0 w-full z-20 border-white border-b border-opacity-5 shadow-[0px_1px_0px_0px_rgba(0,0,0,.5)]"
    v-bind="$attrs"
  >
    <div
      class="grid-layout max-w-screen-xl mx-auto items-center py-4 px-3 md:px-4"
    >
      <div class="justify-self-start md:hidden order-1 flex items-center">
        <button
          type="button"
          class="w-6 h-6 text-sm text-beam-green rounded-lg focus:outline-none focus:ring-2 hover:bg-beam-green/20 focus:ring-beam-pink/50"
        >
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div class="order-2 md:order-1">
        <NuxtLink
          :to="localePath('index')"
          class="hover:opacity-70 transition-opacity"
        >
          <Icon name="logo" class="h-auto w-10 select-none" :as-image="true" />
        </NuxtLink>
      </div>

      <div class="hidden md:block order-2 text-base text-white font-bold">
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0"
        >
          <li>
            <HeaderNavigationItem name="index" :to="localePath('index')">{{
              $t("header.nav.home")
            }}</HeaderNavigationItem>
          </li>
          <li>
            <HeaderNavigationItem
              name="downloads"
              :to="localePath('downloads')"
              >{{ $t("header.nav.downloads") }}</HeaderNavigationItem
            >
          </li>

          <LayoutDropdown>
            <template #dropdown-button>
              <HeaderNavigationItem
                as="button"
                class="!flex !items-center !justify-between"
              >
                {{ $t("header.nav.resources") }}
                <Icon
                  class="hs-accordion-active:-rotate-90 rotate-90 block ml-2 w-3 h-3 text-white hs-accordion-active:text-beam-blue hs-accordion-active:opacity-100 group-hover:opacity-100 opacity-60 transition-opacity"
                  name="layout/arrow-right"
                />
              </HeaderNavigationItem>
            </template>
            <template #dropdown-content>
              <HeaderResources />
            </template>
          </LayoutDropdown>
        </ul>
      </div>

      <div class="justify-self-end flex items-center order-last">
        <HeaderLanguage />
      </div>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
.grid-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
}
</style>
