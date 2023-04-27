<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { Vue3Marquee } from "vue3-marquee";
const environmentGetter = await useEnvironmentGetter();
const { t } = useI18n();
const announcementMessage = computed(() => t("header.announcement"));
const announcementMessageDev = computed(() => t("header.announcementdev"));
</script>
<template>
  <div>
    <div class="bg-transparent border-[rgba(255,255,255,.08)] border-b">
      <div class="grid mx-auto max-w-screen-xl grid-cols-12">
        <div
          class="p-3 md:p-4 flex items-center col-span-12 md:col-span-10 font-bold text-sm text-white/90"
        >
          <Vue3Marquee
            :clone="false"
            :gradient="true"
            :pause-on-hover="true"
            :gradient-color="[4, 29, 60]"
            :gradient-width="'80px'"
          >
            <MarkdownRenderer
              :key="
                environmentGetter.isDappnet
                  ? announcementMessageDev
                  : announcementMessage
              "
              class="colorLinks"
              :t-key="
                environmentGetter.isDappnet
                  ? 'header.announcementdev'
                  : 'header.announcement'
              "
            />
          </Vue3Marquee>
        </div>
        <div
          class="p-3 hidden justify-self-end md:block md:p-4 col-span-2 font-bold text-base text-beam-green-dark opacity-80 whitespace-nowrap"
        >
          <ClientOnly>
            <HeaderLivePrice />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
@import "vue3-marquee/dist/style.css";
/* Fix: ensure we can select text at the side */
.vue3-marquee .overlay::before,
.vue3-marquee .overlay::after {
  @apply pointer-events-none;
}
</style>
