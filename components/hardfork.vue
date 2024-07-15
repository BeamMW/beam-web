<script lang="ts" setup>
onMounted(() => {
  eventBus.emit(UserInteractionEvents.ROADMAP_COMPONENT_READY, {});
});
</script>
<template>
  <LayoutWrapper
    id="targetComponentRoadmap"
    :center="true"
    class="pt-10 lg:pt-12"
  >
    <LayoutTitle :title="$t('hardfork.title')" />
    <HardforkItems/>
  </LayoutWrapper>
</template>
