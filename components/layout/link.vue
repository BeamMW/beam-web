<template>
  <NuxtLink
    :to="destination"
    :target="target || getLinkTarget(destination as string)"
    :prefetch="prefetch || false"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to?: string | Record<string, unknown>;
  href?: string | Record<string, unknown>;
  target?: string;
  prefetch?: boolean;
}>();

const destination = computed(() => {
  return props.to || props.href || undefined;
});

const route = useRoute();

function handleClick(event: MouseEvent) {
  const targetElement = event.currentTarget;
  if (
    targetElement &&
    (targetElement as HTMLElement).getAttribute("href") === route.path
  ) {
    if (typeof window !== "undefined") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}
</script>
