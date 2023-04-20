<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span v-if="!asImage" v-bind="$attrs" v-html="icon" />
  <div
    v-else-if="iconUrl"
    :class="`opacity-0 transition duration-500 ${
      imageLoaded ? '!opacity-100' : ''
    } ${props.classParent}`"
  >
    <img
      v-if="clientSide"
      loading="lazy"
      :src="iconUrl"
      :alt="alt"
      v-bind="$attrs"
      @load="onImageLoad"
    />
    <img v-else loading="lazy" :src="iconUrl" :alt="alt" v-bind="$attrs" />
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
  lazy: {
    type: Boolean,
    required: false,
    default: false,
  },
  alt: {
    type: String,
    required: false,
    default: "",
  },
});

const icon = ref("");
const lazy = ref(false);
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

const updateIcon = () => {
  const rawIcon = iconsImport[getPathToSvg(false)];

  if (!rawIcon) {
    throw new Error(
      "Invalid SVG passed, check your component or make sure if it's lazy loaded it's in /public."
    );
  }

  icon.value = rawIcon;
};

if (!props.lazy) {
  // Call updateIcon initially to set the icon value
  updateIcon();

  // Use watch to update the icon when the name prop changes
  watch(
    () => props.name,
    () => {
      updateIcon();
    }
  );
}

const clientSide = ref(false);

onMounted(() => {
  clientSide.value = true;
});

watchEffect(() => {
  lazy.value = props.lazy;
});

const iconUrl = computed(() => {
  if (props.lazy) {
    return getPathToSvg(true);
  }

  return `data:image/svg+xml,${encodeSvg(icon.value)}`;
});
</script>
