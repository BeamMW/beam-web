<script lang="ts" setup>
const { locale, locales } = useI18n();

interface LanguageInterface {
  code: string;
  name: string;
}

const currentLocale = computed(() => {
  return (locales.value as LanguageInterface[]).find(
    (i: LanguageInterface) => i.code === locale.value
  );
});
</script>

<template>
  <LayoutButton
    v-if="currentLocale"
    as="button"
    class="!text-xs md:!text-sm !py-1 md:!py-1.5 !px-1.5 md:!px-2 md:!px-3"
    accent-color="beam-blue"
  >
    <IconFlag :key="locale" class="w-4 h-4" :flag="locale" loading="eager" />
    {{ currentLocale.name }}
  </LayoutButton>
</template>
