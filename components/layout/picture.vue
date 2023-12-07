<template>
  <div
    ref="imageWrapper"
    :class="`select-none pointer-events-none opacity-0 transition duration-500 ${
      imageLoaded ? '!opacity-100' : ''
    }`"
  >
    <picture>
      <source
        v-if="webp"
        :srcset="`${removeFileExtension(src)}.webp`"
        type="image/webp"
      />
      <img
        :src="src"
        class="opacity-100 transition-opacity"
        v-bind="$attrs"
        @load="onImageLoad"
      />
    </picture>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  webp: {
    type: Boolean,
    required: false,
    default: false,
  },
});

function removeFileExtension(filename: string) {
  const lastDotIndex = filename.lastIndexOf(".");
  return lastDotIndex === -1 ? filename : filename.slice(0, lastDotIndex);
}

const imageLoaded = ref(false);

function onImageLoad() {
  imageLoaded.value = true;
}
</script>
