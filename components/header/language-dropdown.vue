<template>
  <div class="dropdown-container">
    <h6
      class="md:hidden px-6 pt-6 pb-3 font-bold text-xs sm:text-base uppercase text-gray-200"
    >
      {{ $t("header.selectlanguage") }}
    </h6>
    <ul class="md:py-2 font-bold text-white text-sm" role="none">
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
          class="hover:text-beam-blue transition-colors w-full py-5 px-6 md:px-4 md:py-2.5 hover:bg-black/20 inline-block"
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
