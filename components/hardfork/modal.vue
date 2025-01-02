<template>
  <transition name="fade" @after-leave="$emit('close')">
    <div
      v-if="visible"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      @click="handleOverlayClick"
    >
      <div
        class="bg-[#042148ec] border-opacity-10 border border-black rounded-lg w-full max-w-lg p-6 shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset]"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">{{ title }}</h2>
          <button
            class="text-gray-600 hover:text-gray-900"
            @click="$emit('close')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <p v-html="formattedText"></p>
          <div class="flex flex-col gap-3 mt-3">
            <LayoutLink
              v-for="item in links"
              :key="item.link"
              class="group flex w-fit py-2 px-4 flex-row items-center gap-3 justify-center border rounded bg-[rgb(11,31,64)]/50 hover:bg-[#042248] focus:bg-[#042248] border-black border-opacity-30 shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset] focus:outline-none focus:ring-2 focus:ring-beam-blue/75 focus:ring-offset-2 transition focus:ring-offset-[#042248]"
              :href="item.link"
            >
              <span>{{ item.title }}</span>
              <Icon
                class="block w-5 h-5 text-white group-hover:text-beam-blue opacity-60 group-hover:opacity-100 transition rtl:rotate-180"
                name="layout/external"
              />
            </LayoutLink>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

interface HardforkLink {
  title: string;
  link: string;
}

interface ModalProps {
  title: string;
  year: string;
  text: string;
  visible: boolean;
  links: HardforkLink[];
}

const props = defineProps<ModalProps>();
const emit = defineEmits<{
  (event: "close"): void;
}>();

const handleOverlayClick = () => {
  emit("close");
};
const formattedText = props.text.replace(/\n/g, "<br>");
</script>

<style scoped>
/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Additional transition effects for modal */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
