<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { Vue3Marquee } from "vue3-marquee";

const environmentGetter = await useEnvironmentGetter();
const { t } = useI18n();

const announcementMessage = environmentGetter.isDappnet
  ? computed(() => t("header.announcementdev"))
  : computed(() => t("header.announcement"));

defineProps({
  gradientColor: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <!-- Use fixed size for the interactive bar -->
  <div class="min-h-[44px] h-[44px] max-h-[44px] flex">
    <div class="font-bold text-sm h-full">
      <Vue3Marquee
        :clone="true"
        :gradient="true"
        :pause-on-hover="false"
        :pause-on-click="true"
        :gradient-color="gradientColor"
        :gradient-length="'80px'"
      >
        {{ announcementMessage }}&nbsp;&nbsp;
      </Vue3Marquee>
    </div>
    <div
      class="hidden font-bold text-base text-beam-green-dark opacity-80 whitespace-nowrap md:flex items-center"
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
