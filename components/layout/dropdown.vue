<template>
  <div>
    <div
      ref="referenceElement"
      class="w-auto h-auto inline-block"
      @click="toggleDropdown"
    >
      <slot name="dropdown-button" />
    </div>
    <div v-show="visible" ref="popperElement" class="popper-container">
      <transition name="dropdown" @after-leave="afterLeave">
        <div v-if="showDropdown">
          <slot name="dropdown-content" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import { createPopper } from "@popperjs/core";

const showDropdown = ref(false);
const visible = ref(false);
const referenceElement: Ref<HTMLElement | null> = ref(null);
const popperElement: Ref<HTMLElement | null> = ref(null);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const closeDropdown = () => {
  showDropdown.value = false;
};

function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

watchEffect(() => {
  if (showDropdown.value) {
    visible.value = true;
    if (
      isHTMLElement(referenceElement.value) &&
      isHTMLElement(popperElement.value)
    ) {
      createPopper(referenceElement.value, popperElement.value, {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ],
      });
    }
  }
});

const handleClickOutside = (event: MouseEvent) => {
  if (
    referenceElement.value &&
    popperElement.value &&
    !referenceElement.value.contains(event.target as Node) &&
    !popperElement.value.contains(event.target as Node)
  ) {
    closeDropdown();
  }
};

onMounted(() => {
  const instance = getCurrentInstance();
  if (instance) {
    instance.emit("register-toggle", toggleDropdown);
  }

  // Handle click outside
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const afterLeave = () => {
  visible.value = false;
};

provide("toggleDropdown", toggleDropdown);
</script>
<style lang="postcss" scoped>
.popper-container {
  @apply inline-block;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 200ms, transform 200ms;
}
.dropdown-enter-from,
.dropdown-leave-to {
  @apply opacity-0;
  transform: scale(0.95);
}
.dropdown-enter-to,
.dropdown-leave-from {
  @apply opacity-100 scale-100;
}
</style>
