<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { Vue3Marquee } from "vue3-marquee";

const { t } = useI18n();

const announcementMessage = computed(() => t("header.announcement"));

defineProps({
  gradientColor: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <!-- Use fixed size for the interactive bar -->
  <div
    class="min-h-[44px] h-[44px] max-h-[44px] flex text-blue-50 opacity-90 md:opacity-60 md:hover:opacity-100 transition-opacity duration-1000"
  >
    <div class="font-bold text-sm h-full">
      <Vue3Marquee
        :clone="true"
        :gradient="true"
        :pause-on-hover="false"
        :pause-on-click="true"
        :duration="34"
        :gradient-color="gradientColor"
        :gradient-length="'80px'"
      >
        {{ announcementMessage }}&nbsp;&nbsp;
      </Vue3Marquee>
    </div>
    <div
      class="hidden font-bold text-base whitespace-nowrap md:flex items-center"
      :style="{ backgroundColor: `rgb(${gradientColor.join(' ')})` }"
    >
      <ClientOnly>
        <HeaderLivePrice />
      </ClientOnly>
    </div>
  </div>
</template>

<style>
.vue3-marquee .overlay::before,
.vue3-marquee .overlay::after {
  @apply pointer-events-none;
}
.vue3-marquee.horizontal {
  height: 100% !important;
}
</style>
