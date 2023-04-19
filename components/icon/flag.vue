<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  flag: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: "",
  },
  lazy: {
    type: Boolean,
    default: false,
  },
});

const iconName = computed(() => `flags/${props.flag}`);
</script>

<template>
  <div
    v-show="props.flag != ''"
    :class="`${props.class} overflow-hidden rounded-full select-none pointer-events-none`"
  >
    <Icon
      :name="iconName"
      class-parent="w-full h-full"
      :class="`w-full h-full !scale-[1.5] select-none pointer-events-none`"
      :as-image="true"
      :lazy="lazy"
    />
  </div>
</template>
