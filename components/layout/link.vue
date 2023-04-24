<template>
  <NuxtLink
    :to="destination"
    @click.native="handleClick"
    :target="getLinkTarget(destination as string)"
    v-bind="$attrs"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to?: string | Record<string, unknown>;
  href?: string | Record<string, unknown>;
  target?: string;
}>();

const destination = computed(() => {
  return props.to || props.href || undefined;
});

function handleClick(event: MouseEvent) {
  const targetElement = event.target;
  if (
    targetElement &&
    (event.target as HTMLElement).getAttribute("href") === destination.value
  ) {
    const scrollOptions: ScrollToOptions = { top: 0, behavior: "smooth" };
    if (typeof window !== "undefined") {
      window.scrollTo(scrollOptions);
    }
  }
}
</script>
