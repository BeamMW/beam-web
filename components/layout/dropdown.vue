<template>
  <div>
    <div
      ref="referenceElement"
      class="w-auto h-auto inline-block"
      @click="toggleDropdown"
    >
      <slot name="dropdown-button" />
    </div>
    <div
      v-show="visible"
      ref="popperElement"
      :class="`popper-container z-50 ${snapLeft ? 'popper-container-snap-left' : ''}`"
    >
      <transition name="dropdown" @before-enter="afterEnter" @after-leave="afterLeave">
        <div v-if="showDropdown" class="h-full">
          <slot name="dropdown-content" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted,
  getCurrentInstance,
} from "vue";
// eslint-disable-next-line import/named
import { createPopper, Instance, Modifier, OptionsGeneric } from "@popperjs/core";
import { throttle } from "~/utils/throttle";

const showDropdown = ref(false);
const snapLeft = ref(false);
const visible = ref(false);
const referenceElement = ref<HTMLElement | null>(null);
const popperElement = ref<HTMLElement | null>(null);

let popperInstance: Instance | null = null;

const toggleDropdown = async () => {
  showDropdown.value = !showDropdown.value;
};

/*const getWindowVirtualReferenceElement = (): HTMLElement => {
  const virtualReferenceElement = document.createElement("div");

  virtualReferenceElement.style.width = "100vw";
  virtualReferenceElement.style.height = "100%";
  virtualReferenceElement.style.position = "absolute";
  virtualReferenceElement.style.top = "0";
  virtualReferenceElement.style.left = "0";

  return virtualReferenceElement;
};*/

const closeDropdown = () => {
  showDropdown.value = false;
};

function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

const createPopperInstance = async (newReferenceElement: HTMLElement, options: Partial<OptionsGeneric<Partial<Modifier<any, any>>>>) => {
  if (!newReferenceElement) {
    return;
  }

  // Create a new Popper.js instance with the new reference element
  if (isHTMLElement(popperElement.value)) {
    popperInstance = createPopper(newReferenceElement, popperElement.value, options);
  }
};

const updatePlacement = throttle(async () => {
  const viewportWidth = window.innerWidth;
  const breakpoint = 768; // md

  // Destroy the existing Popper.js instance if it exists
  if (popperInstance) {
    popperInstance.destroy();
  }

  if (showDropdown.value) {
    if (viewportWidth <= breakpoint) {
      // Destroy the existing Popper.js instance if it exists
      if (popperInstance) {
        popperInstance.destroy();
      }
      snapLeft.value = true
    } else if (referenceElement.value) {
      snapLeft.value = false
      await createPopperInstance(referenceElement.value, {
        placement: "bottom",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 15],
            },
          },
        ],
      });
    }
  }
}, 50);

watch([showDropdown, referenceElement], async () => {
  if (showDropdown.value && referenceElement.value) {
    await updatePlacement();
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
  // Attach dropdown content to body
  if (popperElement.value) {
    document.body.appendChild(popperElement.value);
  }

  const instance = getCurrentInstance();
  if (instance) {
    instance.emit("register-toggle", toggleDropdown);
  }

  // Handle click outside
  document.addEventListener("click", handleClickOutside);

  // Handle window resize
  window.addEventListener("resize", updatePlacement);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", updatePlacement);
  if (popperElement.value) {
    popperElement.value.remove();
  }
  if (popperInstance) {
    popperInstance.destroy();
  }
});

const afterLeave = () => {
  visible.value = false;
};
const afterEnter = async () => {
  visible.value = true;
};

provide("toggleDropdown", toggleDropdown);
</script>
<style lang="postcss" scoped>
/** Custom default dropdown container */
.popper-container:deep(.dropdown-container) {
  @apply h-full will-change-transform z-50 text-white relative list-none bg-[rgba(4,37,72,1)] border-black border rounded-lg border-opacity-30 shadow-[0_10px_15px_-3px_rgba(0,0,0,.1),0_4px_6px_-4px_rgba(0,0,0,.1),0px_0px_0px_1px_rgba(255,255,255,.05)_inset];
}
.popper-container-snap-left {
  @apply h-screen fixed top-0 left-0;
  &:deep(.dropdown-container) {
    @apply rounded-none !rounded-r-lg;
  }
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 200ms, transform 200ms;
}
.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateX(-100%);
}
.dropdown-enter-to,
.dropdown-leave-from {
  transform: translateX(0%);
}

@media (min-width: 768px) {

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
  @apply opacity-100;
  transform: scale(1);
}}


</style>
