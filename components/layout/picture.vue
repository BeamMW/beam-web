<template>
  <ClientOnly>
    <div
      ref="imageWrapper"
      :class="`select-none pointer-events-none opacity-0 transition duration-500 ${
        imageLoaded ? '!opacity-100' : ''
      }`"
    >
      <picture>
        <source v-if="webp" :srcset="`${src}.webp`" type="image/webp" />
        <source :srcset="`${src}.${extension}`" :type="`image/${extension}`" />
        <img
          :src="`${src}.${extension}`"
          v-bind="$attrs"
          loading="lazy"
          @load="onImageLoad"
        />
      </picture>
    </div>
  </ClientOnly>
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
  extension: {
    type: String,
    required: false,
    default: "png",
  },
});

const imageLoaded = ref(false);

function onImageLoad() {
  imageLoaded.value = true;
}
</script>
