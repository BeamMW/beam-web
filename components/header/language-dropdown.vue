<template>
  <div
    class="z-50 text-white relative list-none bg-[rgba(4,37,72,1)] border-black border rounded-lg divide-y divide-gray-100 border-opacity-30 shadow-[0_10px_15px_-3px_rgba(0,0,0,.1),0_4px_6px_-4px_rgba(0,0,0,.1),0px_0px_0px_1px_rgba(255,255,255,.05)_inset]"
  >
    <div class="rounded-lg">
      <ul class="py-2 font-bold text-white text-sm" role="none">
        <li
          v-for="availableLocale in availableLocales"
          :key="availableLocale.code"
          class="w-full"
        >
          <NuxtLink
            :to="
              switchLocalePath(availableLocale.code) ||
              localePath('index', availableLocale.code)
            "
            class="hover:text-beam-blue transition-colors px-4 py-2.5 hover:bg-black/20 w-full inline-block"
            @click.prevent.stop="onLanguageClicked(availableLocale.code)"
          >
            <span class="flex items-center">
              <IconFlag
                class="w-5 h-5 mr-2"
                :flag="availableLocale.code"
                :as-image="true"
                :lazy="true"
              />
              {{ availableLocale.name }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { eventBus } from "~/utils/emitter";

interface LanguageInterface {
  code: string;
  name: string;
}

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const availableLocales = computed(() => {
  return (locales.value as LanguageInterface[]).filter(
    (i: LanguageInterface) => i.code !== locale.value
  );
});

const onLanguageClicked = (lang: string) => {
  eventBus.emit(UserInteractionEvents.LANGUAGE_CHANGE, {
    lang,
  });
  eventBus.emit(UserInteractionEvents.EXIT_LANGUAGE_DROPDOWN, {});
};
</script>
