<template>
  <div :class="[customClass]">
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
          <section class="dropdown-container">
            <div class="grid-container">
              <slot name="dropdown-content" />
            </div>
          </section>
        </div>
      </transition>
    </div>
    <div v-if="alwaysShow && !showDropdown" class="hidden md:block">
      <slot name="dropdown-content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";

// prettier-ignore
import { createPopper } from "@popperjs/core";
import type { Instance, Modifier, OptionsGeneric } from "@popperjs/core";

import { UserInteractionEvents, eventBus } from "~/utils/emitter";

const showDropdown = ref<boolean>(false);
const snapLeft = ref(false);
const visible = ref(false);
const referenceElement = ref<HTMLElement | null>(null);
const popperElement = ref<HTMLElement | null>(null);

const windowLocked = useState("windowLocked", () => false);
const windowBlurred = useState("windowBlurred", () => false);

let popperInstance: Instance | null = null;

const props = defineProps({
  alwaysShow: {
    type: Boolean,
    required: false,
    default: false,
  },
  lock: {
    type: Boolean,
    required: false,
    default: true,
  },
  customClass: {
    type: String,
    required: false,
    default: "",
  },
});

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  if (!showDropdown.value) {
    if (props.lock) {
      windowLocked.value = false;
    }
    windowBlurred.value = false;
  }
};

const closeDropdown = () => {
  showDropdown.value = false;
  if (props.lock) {
    windowLocked.value = false;
  }
  windowBlurred.value = false;
};

const closePopper = (
  event: CustomEvents[UserInteractionEvents.CLOSE_MENUS],
) => {
  const { callback } = event;
  closeDropdown();
  setTimeout(() => {
    callback();
  }, 100);
};

function destroyPopper() {
  // Destroy the existing Popper.js instance if it exists
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}
function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

const createPopperInstance = (
  newReferenceElement: HTMLElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Partial<OptionsGeneric<Partial<Modifier<any, any>>>>,
) => {
  if (!newReferenceElement) {
    return;
  }

  // Create a new Popper.js instance with the new reference element
  if (isHTMLElement(popperElement.value)) {
    popperInstance = createPopper(
      newReferenceElement,
      popperElement.value,
      options,
    );
    popperInstance.forceUpdate();
  }
};

const updatePlacement = async () => {
  const viewportWidth = window.innerWidth;
  const minWidthBreakpoint = 768; // md

  if (showDropdown.value) {
    if (viewportWidth < minWidthBreakpoint) {
      destroyPopper();
      if (props.lock) {
        windowLocked.value = true;
      }
      windowBlurred.value = true;
      snapLeft.value = true;
    } else if (
      viewportWidth >= minWidthBreakpoint &&
      referenceElement.value &&
      !popperInstance
    ) {
      if (props.lock) {
        windowLocked.value = false;
      }
      windowBlurred.value = false;
      if (props.alwaysShow) {
        visible.value = false;
        closeDropdown();
      } else {
        snapLeft.value = false;
        await createPopperInstance(referenceElement.value, {
          placement: "bottom",
          strategy: "fixed",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        });
      }
    }
  }
};

watch([showDropdown, referenceElement], async () => {
  if (showDropdown.value && referenceElement.value) {
    await updatePlacement();
  }
});

const handleClick = (event: MouseEvent) => {
  if (
    referenceElement.value &&
    popperElement.value &&
    showDropdown.value &&
    !referenceElement.value.contains(event.target as Node) &&
    !popperElement.value.contains(event.target as Node)
  ) {
    event.preventDefault();
    event.stopPropagation();
    closeDropdown();
  } else if (
    popperElement.value &&
    popperElement.value.contains(event.target as Node)
  ) {
    // close dropdown automatically if we click on an internal link inside
    const targetElement = event.target as HTMLElement;
    if (targetElement.nodeName === "A") {
      const hrefAttribute = targetElement.getAttribute("href");
      if (
        hrefAttribute &&
        (hrefAttribute.startsWith("/") || hrefAttribute.startsWith("#"))
      ) {
        closeDropdown();
      }
    }
  }
};

const resizeObserver = ref<ResizeObserver | undefined>();

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
  document.addEventListener("click", handleClick);

  // Handle window resize
  resizeObserver.value = new ResizeObserver((_entries) => updatePlacement());
  resizeObserver.value.observe(document.body);

  // Listen on custom events
  eventBus.on(UserInteractionEvents.CLOSE_MENUS, closePopper);
});

onBeforeUnmount(() => {
  resizeObserver.value?.disconnect();
  document.removeEventListener("click", handleClick);

  // Detach dropdown content to body
  if (popperElement.value) {
    popperElement.value.remove();
  }

  destroyPopper();

  // Remove custom events
  eventBus.off(UserInteractionEvents.CLOSE_MENUS, closePopper);
});

const afterLeave = () => {
  visible.value = false;
  destroyPopper();
};
const afterEnter = () => {
  visible.value = true;
};

provide("toggleDropdown", toggleDropdown);
</script>

<style scoped>
/** Custom default dropdown container */
.popper-container {
  .dropdown-container {
    @apply h-full will-change-transform z-50 rounded-2xl text-white relative list-none backdrop-blur-xl backdrop-brightness-75 border-black border border-opacity-30 shadow-[0_10px_15px_-3px_rgba(0,0,0,.1),0_4px_6px_-4px_rgba(0,0,0,.1),0px_0px_0px_1px_rgba(255,255,255,.05)_inset] transition-colors;
  }

  .grid-container {
    @apply overflow-y-scroll md:overflow-y-hidden h-screen pb-[30vh] md:h-auto md:!pb-0 md:shadow-2xl;
    -webkit-overflow-scrolling: touch !important;
  }
}

body.bg-beam-bg-blue {
  .popper-container .dropdown-container {
    @apply md:!bg-[#042248]/40;
  }
}

body.bg-beam-bg-purple {
  .popper-container .dropdown-container {
    @apply md:!bg-[#200036]/40;
  }
}

body.bg-beam-bg-green {
  .popper-container .dropdown-container {
    @apply md:!bg-[#001B0E]/40;
  }
}

@keyframes animate {
  0% {
    @apply opacity-0;
  }
  50% {
    @apply opacity-100;
  }
  100% {
    @apply opacity-0;
  }
}

.popper-container-snap-left {
  @apply h-screen fixed top-0 ltr:left-0 rtl:right-0 overscroll-y-contain;
  &:deep(.dropdown-container) {
    @apply !w-[49vw] sm:!w-[45vw] shadow-beam-pink shadow-2xl;
  }
  &:deep(.dropdown-container)::before {
    @apply shadow-beam-green shadow-2xl absolute w-full h-full -z-[1];
    animation: animate 15s linear infinite;
    content: "";
  }
}

@media (max-width: 767px) {
  .dropdown-enter-active,
  .dropdown-leave-active {
    @apply transition-[opacity,transform] ease-in-out-custom duration-[225ms];
  }
  .dropdown-enter-from,
  .dropdown-leave-to {
    @apply ltr:-translate-x-[calc(100%+50px)] rtl:translate-x-[calc(100%+50px)];
  }
  .dropdown-enter-to,
  .dropdown-leave-from {
    @apply ltr:-translate-x-0 rtl:translate-x-0;
  }
}

@media (max-width: 767px) {
  .dropdown-container,
  .dropdown-container::before {
    @apply !rounded-none ltr:!rounded-r-3xl rtl:!rounded-l-3xl;
  }
}
</style>
