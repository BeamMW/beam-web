<template>
  <div
    ref="imageWrapper"
    :class="`opacity-0 transition duration-500 ${
      imageLoaded ? '!opacity-100' : ''
    }`"
  >
    <img
      v-if="clientSide"
      loading="lazy"
      :src="src"
      :alt="alt"
      :class="`${props.class} opacity-100 transition-opacity`"
      v-bind="$attrs"
      @load="onImageLoad"
    />
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
});

const imageLoaded = ref(false);

function onImageLoad() {
  imageLoaded.value = true;
}

const clientSide = ref(false);

onMounted(() => {
  clientSide.value = true;
});
</script>
