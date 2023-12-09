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
  <div>
    <div class="bg-transparent border-[rgba(255,255,255,.08)] border-b">
      <div class="mx-auto max-w-screen-xl">
        <!-- Use fixed size for the interactive bar -->
        <div
          class="min-h-[44px] h-[44px] max-h-[44px] md:min-h-[57px] md:h-[57px] md:max-h-[57px]"
        >
          <div class="flex items-center h-full">
            <div class="font-bold text-sm text-white/90">
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
              class="hidden md:block font-bold text-base text-beam-green-dark opacity-80 whitespace-nowrap pr-4 rtl:pl-4"
            >
              <ClientOnly>
                <HeaderLivePrice />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.vue3-marquee .overlay::before,
.vue3-marquee .overlay::after {
  @apply pointer-events-none;
}
</style>
