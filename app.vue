<script lang="ts" setup>
import { UserInteractionEvents, eventBus } from "~/utils/emitter";
import { scrollToComponent } from "~/utils/scrollToComponent";

const localePath = useLocalePath();
const router = useRouter();

defineRobotMeta();

const scrollToIdOnPage = async (
  pageName: string,
  componentId: string,
  eventToWait: UserInteractionEvents,
) => {
  const targetComponent = document.getElementById(componentId);
  if (!targetComponent) {
    const pageLoadedAndMounted = () => {
      eventBus.off(eventToWait, pageLoadedAndMounted);
      setTimeout(() => {
        const targetComponent = document.getElementById(componentId);
        scrollToComponent(targetComponent);
      }, 1);
    };
    eventBus.on(eventToWait, pageLoadedAndMounted);
    await router.push(localePath(pageName));
  } else {
    scrollToComponent(targetComponent);
  }
};

// Scroll to "Where to buy" called but unable to scroll, redirect to homepage
const whereToBuyScroll = async () =>
  await scrollToIdOnPage(
    "/",
    "targetComponentBuy",
    UserInteractionEvents.BUY_WHERE_COMPONENT_READY,
  );
const roadmapScroll = async () =>
  await scrollToIdOnPage(
    "/",
    "targetComponentRoadmap",
    UserInteractionEvents.ROADMAP_COMPONENT_READY,
  );

onMounted(() => {
  eventBus.on(UserInteractionEvents.SCROLL_TO_WHERE_TO_BUY, whereToBuyScroll);
  eventBus.on(UserInteractionEvents.SCROLL_TO_ROADMAP, roadmapScroll);
});

onUnmounted(() => {
  eventBus.off(UserInteractionEvents.SCROLL_TO_WHERE_TO_BUY, whereToBuyScroll);
  eventBus.off(UserInteractionEvents.SCROLL_TO_ROADMAP, roadmapScroll);
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage :transition="false" />
  </NuxtLayout>
</template>
