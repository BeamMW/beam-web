<template>
  <div>
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
        <LayoutLink
          :to="
            switchLocalePath(availableLocale.code) ||
            localePath('index', availableLocale.code)
          "
          class="hover:text-beam-blue transition-colors w-full py-5 px-6 md:px-4 md:py-2.5 hover:bg-black/20 inline-block"
          @click.prevent.stop="onLanguageClicked(availableLocale.code)"
        >
          <span class="flex items-center gap-2">
            <IconFlag
              class="w-5 h-5"
              :flag="availableLocale.code"
              :as-image="true"
              loading="lazy"
            />
            {{ availableLocale.name }}
          </span>
        </LayoutLink>
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
    (i: LanguageInterface) => i.code !== locale.value,
  );
});

const onLanguageClicked = (lang: string) => {
  eventBus.emit(UserInteractionEvents.LANGUAGE_CHANGE, {
    lang,
  });
  eventBus.emit(UserInteractionEvents.EXIT_LANGUAGE_DROPDOWN, {});
};
</script>
