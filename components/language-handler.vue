<template>
  <div>
    <slot :on-after-enter="afterEnter" :language-changed="languageChanged" />
  </div>
</template>

<script lang="ts" setup>
import { eventBus, UserInteractionEvents } from "~/utils/emitter";
import type { CustomEvents } from "~/utils/emitter";

const { setLocale } = useI18n();

const languageChanged = ref(false);

const changeLanguage = (
  event: CustomEvents[UserInteractionEvents.LANGUAGE_CHANGE],
) => {
  languageChanged.value = true;
  setLocale(event.lang);
};

// Listen for the changeLanguage event
eventBus.on(UserInteractionEvents.LANGUAGE_CHANGE, changeLanguage);

const onAfterEnter = () => {
  if (languageChanged.value) {
    languageChanged.value = false;
  }
  eventBus.emit(UserInteractionEvents.PAGE_TRANSITION_FINISHED, {});
};

const afterEnter = onAfterEnter;

defineExpose({ afterEnter, languageChanged });
</script>
