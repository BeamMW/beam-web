<script lang="ts" setup>
const { locale, locales } = useI18n();

interface LanguageInterface {
  code: string;
  name: string;
}

const currentLocale = computed(() => {
  return (locales.value as any).find(
    (i: LanguageInterface) => i.code === locale.value
  );
});
</script>

<template>
  <LayoutButton
    as="button"
    class="!text-xs md:!text-sm !py-1 md:!py-1.5 !px-1.5 md:!px-3"
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
