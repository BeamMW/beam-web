import { eventBus, UserInteractionEvents, CustomEvents } from "~/utils/emitter";

export function useChangeLanguage(switchLocalePath: any) {
  const languageChanged = ref(false);

  // Here we prevent the same page from transitioning from the old language to the new one the same when changing language
  const changeLanguage = (
    event: CustomEvents[UserInteractionEvents.LANGUAGE_CHANGE]
  ) => {
    languageChanged.value = true;
    switchLocalePath(event.lang);
  };

  // Listen for the changeLanguage event
  eventBus.on(UserInteractionEvents.LANGUAGE_CHANGE, changeLanguage);

  const onAfterEnter = () => {
    if (languageChanged.value) {
      languageChanged.value = false;
    }
    eventBus.emit(UserInteractionEvents.PAGE_TRANSITION_FINISHED, {});
  };

  const { finalizePendingLocaleChange } = useI18n();
  const onBeforeEnter = async () => {
    await finalizePendingLocaleChange();
  };

  return { onAfterEnter, onBeforeEnter, languageChanged };
}
