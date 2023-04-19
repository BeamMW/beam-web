<script type="ts" setup>
const localePath = useLocalePath()
</script>
<template>
  <nav
    class="sticky backdrop-blur-xl w-full z-20 top-0 left-0 border-white border-b border-opacity-5 shadow-[0px_1px_0px_0px_rgba(0,0,0,.5)]"
    v-bind="$attrs"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <NuxtLink
        :to="localePath('index')"
        class="flex items-center hover:opacity-70 transition-opacity"
      >
        <Icon
          name="logo"
          class="h-10 w-10 mr-3 select-none flex items-center"
        />
      </NuxtLink>

      <div class="flex md:order-2">
        <HeaderLanguage />
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
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
      <div
        id="navbar-sticky"
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 font-bold text-base text-white"
      >
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
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
.scrollspy-link {
  @apply text-white hover:text-white/80 sm:py-6 transition;
  &.active {
    @apply text-beam-blue pointer-events-none;
  }
}
</style>
