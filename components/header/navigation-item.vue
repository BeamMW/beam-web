<template>
  <button v-if="isButton" :class="classElement" type="button" v-bind="$attrs">
    <slot />
  </button>
  <NuxtLink v-else :to="to" :class="classElement" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  to: {
    type: String,
    required: false,
    default: "/beam-undefined",
  },
  as: {
    type: String,
    required: false,
    default: "",
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
});

const isButton = ref(props.as === "button");
const defaultClasses = `block py-2 font-bold text-white/90 hover:text-white/70 transition-colors rounded`;
const classElement = ref(defaultClasses);

const route = useRoute();

watchEffect(() => {
  const routeNameParsed =
    typeof route.name === "string" ? route.name.split("___")[0] : "";
  classElement.value =
    routeNameParsed === props.name
      ? `${defaultClasses} active`
      : defaultClasses;
});
</script>

<style lang="postcss" scoped>
.active {
  @apply text-beam-blue;
}
</style>
