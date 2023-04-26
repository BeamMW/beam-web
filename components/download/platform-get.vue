<script lang="ts" setup>
const { t } = useI18n();

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  highlight: {
    type: Boolean,
    required: false,
  },
  flag: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<template>
  <div class="text-center">
    <LayoutLink
      :to="link"
      :title="t('downloads.downloadButton', { platform: title })"
      :class="`${
        highlight
          ? 'pointer-events-none select-none opacity-90'
          : 'opacity-70 hover:opacity-90'
      } flex flex-col justify-center items-center gap-1 transition-opacity pb-2`"
    >
      <Icon
        :name="`download/platforms/${icon.toLowerCase()}`"
        class="w-11 h-11"
        :as-image="true"
      />
      <h4
        class="mt-5 font-bold text-xl text-white flex gap-x-2 justify-center items-center"
      >
        <span>{{ title }}</span>
        <span
          v-if="flag"
          class="text-xs uppercase bg-beam-green rounded-full font-bold p-1.5 text-black/75"
          >{{ flag }}</span
        >
      </h4>
    </LayoutLink>

    <div v-if="highlight" class="py-4">
      <LayoutButton :big="true" :button-link="link" accent-color="beam-blue">
        <Icon name="download/get" class="w-[18px] h-[24px]" />
        {{ $t("downloads.downloadButton", { platform: title }) }}
      </LayoutButton>
    </div>
    <p class="text-white/70 text-sm">
      <slot />
    </p>
  </div>
</template>
