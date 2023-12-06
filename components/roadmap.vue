<script lang="ts" setup>
const { t } = useI18n();
</script>
<template>
  <LayoutWrapper
    id="targetComponentRoadmap"
    :center="true"
    class="pt-10 lg:pt-12 pb-5"
  >
    <LayoutTitle :title="t('footer.join.roadmap')" />
    <RoadmapCarousel />
  </LayoutWrapper>
</template>
