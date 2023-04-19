export function useTitleTemplate() {
  const { t } = useI18n();
  const mainTitle = computed(() => t("head.title.main"));

  useHead({
    titleTemplate: function (titleChunk?: string | undefined) {
      return titleChunk
        ? `${titleChunk} - ${mainTitle.value}`
        : mainTitle.value;
    },
  });
}
