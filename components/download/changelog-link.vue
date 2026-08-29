<template>
  <div class="pt-3">
    <LayoutLink
      :title="$t('downloads.resources.changelog')"
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
const localePath = useLocalePath();

const props = defineProps({
  version: {
    type: String,
    required: true,
  },
  releaseNotesLink: {
    type: String,
    required: false,
    default: "",
  },
});

// Platforms that publish their own release notes (e.g. a GitHub release) provide
// the link in downloads/*.json; everything else falls back to the docs changelog.
const link = computed(
  () =>
    props.releaseNotesLink ||
    `${localePath("docs")}/changelog/${props.version}`,
);
</script>
