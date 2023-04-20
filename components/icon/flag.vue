<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  flag: {
    type: String,
    required: true,
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
    class="overflow-hidden rounded-full select-none pointer-events-none"
    v-bind="$attrs"
  >
    <Icon
      :name="iconName"
      class-parent="w-full h-full"
      class="w-full h-full !scale-[1.2] select-none pointer-events-none"
      :as-image="true"
      :lazy="lazy"
    />
  </div>
</template>
