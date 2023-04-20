<template>
  >
    <div class="rounded-lg">
      <ul class="py-2 font-bold text-white text-sm" role="none">
        <li
          v-for="availableLocale in availableLocales"
          :key="availableLocale.code"
          class="w-full"
  <div class="dropdown-container">
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
