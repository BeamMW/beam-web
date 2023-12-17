<script lang="ts" setup>
import { ref, defineEmits } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const emitClose = defineEmits(["close"]);

const visible = ref(false);

function close() {
  emitClose("close");
  visible.value = false;
}

function show() {
  visible.value = true;
}

// Expose both 'show' and 'close' methods to the parent component
defineExpose({ show, close });
</script>

<template>
  <section class="inherit">
    <transition
      name="modal-bg"
      class="ease-in-out-custom duration-[200ms]"
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity"
      leave-from-class="opacity-100"
      leave-active-class="transition-opacity opacity-0"
    >
      <div
        v-show="visible"
        class="fixed flex transition items-center backdrop-blur-md justify-center top-0 bg-[rgba(4,37,72,.65)] left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full"
        @click.self="close"
      ></div>
    </transition>
    <transition
      name="modal"
      class="ease-in-out-custom duration-[200ms] will-change-[opacity,transform]"
      enter-from-class="opacity-0 scale-90 scale-y-75"
      enter-active-class="opacity-1 scale-100 scale-y-100"
      leave-from-class="opacity-1 scale-100"
      leave-active-class="opacity-0 scale-90"
    >
      <div
        v-show="visible"
        class="fixed will-change-transform flex items-center justify-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full"
        @click.self="close"
      >
        <div
          class="relative max-w-2xl mx-auto border-black border rounded-2xl p-6 lg:p-9 bg-[#042248] border-opacity-30 shadow-[0_10px_15px_-3px_rgba(0,0,0,.1),0_4px_6px_-4px_rgba(0,0,0,.1),0px_0px_0px_1px_rgba(255,255,255,.05)_inset]"
          @click.stop
        >
          <div class="flex items-start justify-between">
            <h6
              class="text-xl md:text-2xl font-bold specialGradient specialGradientBlue"
            >
              {{ title }}
            </h6>
            <button
              type="button"
              class="transition bg-transparent text-beam-blue hover:opacity-60 rounded-full text-sm p-1.5 rtl:mr-auto ltr:ml-auto inline-flex items-center"
              @click="close"
            >
              <Icon class="w-5 h-5 block" name="layout/close" />
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div
            class="space-y-6 leading-relaxed text-white/80 text-sm text-left mt-6"
          >
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.inherit {
  display: inherit;
}
</style>
