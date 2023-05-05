<script lang="ts" setup>
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  checksum: {
    type: String,
    required: false,
    default: undefined,
  },
  disableArrow: {
    type: Boolean,
    required: false,
  },
});

const downloadItem = computed(() => startDownload(props.link, props.checksum));
</script>
<template>
  <span>
    <LayoutLink
      :to="link"
      class="hover:text-white transition-colors"
      @click="downloadItem"
    >
      <span class="inline-flex items-center"
        >{{ title }}&nbsp;
        <Icon
          v-if="!disableArrow"
          class="h-3 w-3"
          name="download/get-arrow-inline"
        />
      </span>
    </LayoutLink>
  </span>
</template>
