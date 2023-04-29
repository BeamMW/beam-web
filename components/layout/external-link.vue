<template>
  <span
    :class="{
      'inline-flex items-center hover:opacity-70 transition-opacity text-inherit': true,
      'gap-1.5': linkType(to) == LinkTypes.INTERNAL,
      'gap-2': linkType(to) == LinkTypes.EXTERNAL,
    }"
  >
    <span>
      <slot></slot>
    </span>
    <Icon
      :name="
        linkType(to) == LinkTypes.EXTERNAL
          ? 'layout/external'
          : 'layout/arrow-right'
      "
      :class="{
        'inline-block': true,
        'h-[1.32rem] w-[1.32rem]': linkType(to) == LinkTypes.EXTERNAL,
        'h-4 w-4': linkType(to) == LinkTypes.INTERNAL,
      }"
    ></Icon>
  </span>
</template>
<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>
