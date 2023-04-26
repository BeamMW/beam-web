<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  flag: {
    type: String,
    required: true,
  },
  loading: {
    type: String,
    required: true,
  },
});

const iconName = computed(() => `flags/${props.flag}`);
</script>

<template>
  <div
    v-show="props.flag != ''"
    class="overflow-hidden rounded-full"
    v-bind="$attrs"
  >
    <Icon
      :name="iconName"
      class-parent="w-full h-full"
      class="w-full h-full !scale-[1.25]"
      :as-image="true"
      loading="eager"
      alt="Flag"
    />
  </div>
</template>
