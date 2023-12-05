<template>
  <div class="copy-to-clipboard" @click="copyText">
    <div
      class="break-all font-mono hover:opacity-80 transition-opacity inline-flex items-center gap-1"
    >
      <slot />
      <Icon class="w-4 h-4 block" name="layout/copy" />
    </div>
    <span v-if="copied" class="copied-message">Copied!</span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const copied = ref(false);

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const copyText = async () => {
  await navigator.clipboard.writeText(props.text);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

defineExpose({ copyText });
</script>

<style scoped>
.copy-to-clipboard {
  @apply cursor-pointer relative inline-block;
}

.copied-message {
  @apply absolute top-full left-1/2 bg-black/20 border border-black/50 text-beam-blue px-2 py-1 rounded whitespace-nowrap text-xs opacity-0 transition-opacity duration-300 ease-in-out;
  transform: translateX(-50%);
}

.copy-to-clipboard:hover .copied-message {
  @apply opacity-100;
}
</style>
