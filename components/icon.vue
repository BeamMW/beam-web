<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span v-if="!asImage && iconUrl" v-bind="$attrs" v-html="iconUrl" data-load-type="1" />
  <div
    v-else-if="iconUrl"
    :class="`opacity-0 transition duration-500 ${
      imageLoaded || props.loading == 'eager' ? '!opacity-100' : ''
    } ${props.classParent}`"
  >
    <img
      v-if="props.loading == 'lazy' && clientSide"
      :src="iconUrl"
      loading="lazy"
      @load="onImageLoad"
      v-bind="$attrs"
      data-load-type="2"
    />
    <img v-else-if="props.loading == 'eager'" :src="iconUrl" v-bind="$attrs" data-load-type="3" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  classParent: {
    type: String,
    required: false,
    default: "",
  },
  asImage: {
    type: Boolean,
    required: false,
    default: false,
  },
  loading: {
    type: String,
    required: false,
    default: "eager",
  },
});

const imageLoaded = ref(false);

function onImageLoad() {
  imageLoaded.value = true;
}

const encodingMap: { [key: string]: string } = {
  '"': "'",
  "%": "%25",
  "#": "%23",
  "{": "%7B",
  "}": "%7D",
  "<": "%3C",
  ">": "%3E",
  "&": "%26",
  "|": "%7C",
  "[": "%5B",
  "]": "%5D",
  "^": "%5E",
  "`": "%60",
  ";": "%3B",
  "?": "%3F",
  ":": "%3A",
  "@": "%40",
  "=": "%3D",
};

function encodeSvg(svgString: string) {
  if (!svgString) {
    throw new Error("Invalid SVG passed, check your component");
  }
  return svgString
    .replace(
      "<svg",
      ~svgString.indexOf("xmlns")
        ? "<svg"
        : '<svg xmlns="http://www.w3.org/2000/svg"'
    )
    .replace(/["%#{}<>;&?@=|[\]^`]/g, (match) => encodingMap[match] || match)
    .replace(/\s+/g, " ");
}

const iconsImport = import.meta.glob("assets/svg/**/**.svg", {
  as: "raw",
  eager: true,
});

const getPathToSvg = (usePublicPath = false) =>
  `${!usePublicPath ? "/assets" : ""}/svg/${props.name}.svg`;

// If we want to load immediately
/*if (props.loading == 'eager') {
  // Call updateIcon initially to set the icon value
  updateIcon();

  // Use watch to update the icon when the name prop changes
  watch(
    () => props.name,
    () => {
      updateIcon();
    }
  );
}*/

const getRawIcon = () => {
  const rawIcon = iconsImport[getPathToSvg(false)];
  if (!rawIcon) {
    console.log(getPathToSvg(false))
    throw new Error(
      "Invalid SVG passed, check your component or make sure if it's lazy loaded it's in /public."
    );
  }
  return rawIcon
}

const iconUrl = computed(() => {
  if (!props.asImage) {
    return getRawIcon();
  } else if (props.loading == 'lazy') {
    return getPathToSvg(true);
  } else {
    return `data:image/svg+xml,${encodeSvg(getRawIcon())}`;
  }
});

const clientSide = ref(false);
onMounted(() => {
  clientSide.value = true;
});
</script>
