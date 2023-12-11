<script lang="ts" setup>
const { t } = useI18n();
</script>
<template>
  <LayoutWrapper :center="true" class="pt-10 lg:pt-12 pb-5">
    <LayoutTitle :title="t('press.title')" />
    <PressCarousel />
  </LayoutWrapper>
</template>
