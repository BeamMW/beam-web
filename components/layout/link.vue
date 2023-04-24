<template>
  <NuxtLink :to="destination" @click.native="handleClick" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to?: string | Record<string, unknown>;
  href?: string | Record<string, unknown>;
}>();

const destination = computed(() => {
  return props.to || props.href || undefined;
});

//const link = useLink({ to: destination });

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
  } else {
    // Call the original NuxtLink click handler
    // link.navigate(event);
  }
}
</script>
