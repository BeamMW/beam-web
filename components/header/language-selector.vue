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
    class="!text-sm !py-1.5 !px-2 md:!px-3"
    accent-color="beam-blue"
  >
    <IconFlag
      :key="currentLocale.code"
      class="w-4 h-4"
      :flag="currentLocale.code"
      :lazy="true"
    />
    {{ currentLocale.name }}
  </LayoutButton>
</template>
