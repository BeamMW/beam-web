<template>
  <div class="max-w-7xl mx-auto px-6 lg:px-0">
    <div class="relative flex py-14 items-center">
      <div class="divider"></div>
      <span
        class="flex-shrink mx-7 text-white/90 uppercase text-xl tracking-widest"
        >{{ $t("downloads.divider") }}
      </span>
      <div class="divider"></div>
    </div>
  </div>
</template>
<style scoped>
.divider {
  @apply flex-grow border-t border-white/5;
}
</style>
