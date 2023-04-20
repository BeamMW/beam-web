<template>
  <div>
    <div ref="referenceElement" @click="toggleDropdown">
      <slot name="dropdown-button" />
    </div>
    <div
      v-show="visible"
      ref="popperElement"
      :class="`popper-container z-50 ${
        snapLeft ? 'popper-container-snap-left' : ''
      }`"
    >
      <transition
        name="dropdown"
        @before-enter="afterEnter"
        @after-leave="afterLeave"
      >
        <div v-if="showDropdown" class="h-full">
          <slot name="dropdown-content" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";

// prettier-ignore
import { createPopper, Instance, Modifier, OptionsGeneric } from "@popperjs/core"; // eslint-disable-line import/named

const showDropdown = ref<boolean>(false);
const snapLeft = ref(false);
const visible = ref(false);
const referenceElement = ref<HTMLElement | null>(null);
const popperElement = ref<HTMLElement | null>(null);

let popperInstance: Instance | null = null;

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const closeDropdown = () => {
  showDropdown.value = false;
};

function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

const createPopperInstance = (
  newReferenceElement: HTMLElement,
  options: Partial<OptionsGeneric<Partial<Modifier<any, any>>>>
) => {
  if (!newReferenceElement) {
    return;
  }

  // Create a new Popper.js instance with the new reference element
  if (isHTMLElement(popperElement.value)) {
    popperInstance = createPopper(
      newReferenceElement,
      popperElement.value,
      options
    );
  }
};

const updatePlacement = async () => {
  const viewportWidth = window.innerWidth;
  const minWidthBreakpoint = 768; // md

  if (showDropdown.value) {
    if (viewportWidth < minWidthBreakpoint) {
      // Destroy the existing Popper.js instance if it exists
      if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
      }
      snapLeft.value = true;
    } else if (
      viewportWidth >= minWidthBreakpoint &&
      referenceElement.value &&
      !popperInstance
    ) {
      snapLeft.value = false;
      await createPopperInstance(referenceElement.value, {
        placement: "bottom",
        strategy: "fixed",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 14],
            },
          },
        ],
      });
    }
  }
};

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
const afterEnter = () => {
  visible.value = true;
};

provide("toggleDropdown", toggleDropdown);
</script>
<style lang="postcss" scoped>
/** Custom default dropdown container */
.popper-container:deep(.dropdown-container) {
  @apply h-full will-change-transform z-50 text-white relative list-none bg-[rgba(4,37,72,.6)] backdrop-blur-xl backdrop-brightness-125 border-black border rounded-lg border-opacity-30 shadow-[0_10px_15px_-3px_rgba(0,0,0,.1),0_4px_6px_-4px_rgba(0,0,0,.1),0px_0px_0px_1px_rgba(255,255,255,.05)_inset];
}

@keyframes animate {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.popper-container-snap-left {
  @apply h-screen fixed top-0 left-0;
  &:deep(.dropdown-container) {
    @apply rounded-none !rounded-r-3xl !w-[45vw] shadow-beam-pink shadow-2xl;
  }
  &:deep(.dropdown-container)::before {
    @apply shadow-beam-green shadow-2xl h-full w-full;
    animation: animate 15s linear infinite;
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
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
  }
}
</style>
