<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { Vue3Marquee } from "vue3-marquee";

const environmentGetter = await useEnvironmentGetter();
const { t } = useI18n();

const announcementMessage = computed(() => t("header.announcement"));
const announcementMessageDev = computed(() => t("header.announcementdev"));

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
      <div class="grid mx-auto max-w-screen-xl grid-cols-12">
        <!-- Use fixed size for the interactive bar -->
        <div
          class="min-h-[44px] h-[44px] md:min-h-[57px] md:h-[57px] p-3 md:p-4 flex items-center col-span-12 md:col-span-10 font-bold text-sm text-white/90"
        >
          <transition
            name="marquee"
            enter-from-class="opacity-0"
            enter-active-class="transition-opacity duration-500 ease-out"
            leave-from-class="opacity-100"
            leave-active-class="transition-opacity duration-500 ease-out opacity-0"
          >
            <Vue3Marquee
              :clone="false"
              :gradient="true"
              :pause-on-hover="true"
              :gradient-color="gradientColor"
              :gradient-length="'80px'"
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
              />&nbsp;&nbsp;
            </Vue3Marquee>
          </transition>
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
.vue3-marquee .overlay::before,
.vue3-marquee .overlay::after {
  @apply pointer-events-none;
}
</style>
