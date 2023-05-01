<template>
  <div class="pt-3">
    <LayoutLink
      :title="t('downloads.resources.changelog')"
      :to="link"
      class="text-beam-blue text-base capitalize font-bold"
    >
      <LayoutExternalLink :to="link">
        {{ $t("downloads.resources.changelog") }} ({{ version }})
      </LayoutExternalLink>
    </LayoutLink>
  </div>
</template>
<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();

const props = defineProps({
  version: {
    type: Number,
    required: true,
  },
});

const link = computed(() => `${localePath("docs")}/changelog/${props.version}`);
</script>
