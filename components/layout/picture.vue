<template>
  <div
    ref="imageWrapper"
    :class="`opacity-0 transition duration-500 ${
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
        v-if="clientSide"
        :src="src"
        :alt="alt"
        :class="`${props.class} opacity-100 transition-opacity`"
        v-bind="$attrs"
        @load="onImageLoad"
      />
    </picture>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: false,
    default: "",
  },
  class: {
    type: String,
    required: false,
    default: "",
  },
  webp: {
    type: Boolean,
    required: false,
    default: false,
  },
});

function removeFileExtension(filename) {
  const lastDotIndex = filename.lastIndexOf(".");
  return lastDotIndex === -1 ? filename : filename.slice(0, lastDotIndex);
}

const imageLoaded = ref(false);

function onImageLoad() {
  imageLoaded.value = true;
}

const clientSide = ref(false);

onMounted(() => {
  clientSide.value = true;
});
</script>
