<template>
  <LayoutLink :to="localePath('index')" class="group" title="Homepage">
    <div class="grid items-center justify-center h-10 w-10">
      <Icon
        name="logo"
        class="h-full w-full item-container z-50 -mt-0.5"
        :as-image="true"
        alt="Beam logo"
      />
      <Icon
        name="logo-bg"
        class="h-full w-full item-container scale-125 group-hover:rotate-90 group-focus:rotate-90 transition-transform duration-300 ease-in-out z-40"
        :as-image="true"
        alt="Beam logo background"
      />
    </div>
  </LayoutLink>
</template>
<script lang="ts" setup>
const localePath = useLocalePath();
</script>
<style lang="postcss" scoped>
.item-container {
  @apply select-none object-cover;
  grid-row: 1;
  grid-column: 1;
}
</style>
