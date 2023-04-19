<template>
  <slot
    :on-before-enter="beforeEnter"
    :on-after-enter="afterEnter"
    :language-changed="languageChanged"
  ></slot>
</template>

<script lang="ts" setup>
import { eventBus, UserInteractionEvents, CustomEvents } from "~/utils/emitter";

const { setLocale } = useI18n();

const languageChanged = ref(false);

const changeLanguage = (
  event: CustomEvents[UserInteractionEvents.LANGUAGE_CHANGE]
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

const onBeforeEnter = async () => {};

const beforeEnter = () => onBeforeEnter();
const afterEnter = onAfterEnter;

defineExpose({ beforeEnter, afterEnter, languageChanged });
</script>
