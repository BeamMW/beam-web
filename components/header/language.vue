<script lang="ts" setup>
import { UserInteractionEvents, eventBus } from "~/utils/emitter";

const toggleDropdownInside = ref<(() => void) | null>(null);

const registerToggle = (toggleFn: () => void) => {
  toggleDropdownInside.value = toggleFn;
};

function toggleDropdownFromParent() {
  const toggle = toggleDropdownInside.value;
  if (typeof toggle === "function") {
    toggle();
  }
}

onMounted(() =>
  eventBus.on(
    UserInteractionEvents.EXIT_LANGUAGE_DROPDOWN,
    toggleDropdownFromParent,
  ),
);

onUnmounted(() =>
  eventBus.off(
    UserInteractionEvents.EXIT_LANGUAGE_DROPDOWN,
    toggleDropdownFromParent,
  ),
);
</script>
<template>
  <LayoutDropdown @register-toggle="registerToggle">
    <template #dropdown-button>
      <HeaderLanguageSelector />
    </template>
    <template #dropdown-content>
      <HeaderLanguageDropdown />
    </template>
  </LayoutDropdown>
</template>
