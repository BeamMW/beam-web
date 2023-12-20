<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: "",
  },
  number: {
    type: String,
    required: false,
    default: "",
  },
  text: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
    default: "",
  },
  linkName: {
    type: String,
    required: false,
    default: "",
  },
  buttonName: {
    type: String,
    required: false,
    default: "",
  },
  buttonLink: {
    type: String,
    required: false,
    default: "",
  },
  accentColor: {
    type: String,
    required: false,
    default: "",
  },
  wideIcon: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: String,
    required: true,
  },
  asImage: {
    type: Boolean,
    default: true,
  },
});
const hasAccentColor: string = props.accentColor ? "hasAccentColor " : "";

const specialGradientColor = computed(() => {
  if (props.accentColor === "") {
    return false;
  }
  switch (props.accentColor) {
    case "beam-green":
      return "specialGradientGreen";
    case "beam-pink":
      return "specialGradientPurple";
    default:
      return "specialGradientBlue";
  }
});
</script>

<template>
  <section
    :style="`--selection-bg-color: var(--${accentColor});`"
    :class="`${hasAccentColor}bg-[#042248] border-opacity-30 shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset] col-span-1 flex flex-col`"
    class="w-full h-full border-opacity-10 border-black border rounded-lg p-7"
  >
    <Icon
      v-if="image"
      :class="`text-${accentColor ? accentColor : 'current'} ${
        wideIcon ? 'w-12 h-15' : 'w-10 h-12'
      }`"
      :name="image"
      :as-image="asImage"
      :loading="props.loading"
      :alt="title"
    />
    <p
      v-if="number"
      :class="`h-[46px] text-5xl select-none font-bold opacity-90 text-${accentColor}`"
    >
      {{ number }}
    </p>
    <div class="mt-3 mb-5">
      <h3
        :class="[
          'block text-blue-50 text-lg font-bold mb-3',
          specialGradientColor ? `specialGradient ${specialGradientColor}` : '',
        ]"
      >
        {{ title }}
      </h3>
      <p class="text-blue-50 text-opacity-80">{{ text }}</p>
    </div>
    <div class="mt-auto gap-4 select-none">
      <LayoutLink
        v-if="link"
        :title="$t('feature.learnmoreabout', { title })"
        :to="link"
        class="text-beam-blue"
      >
        <LayoutExternalLink :to="link">{{
          linkName ? linkName : $t("feature.learnmore")
        }}</LayoutExternalLink>
      </LayoutLink>
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
section.hasAccentColor ::selection {
  @apply text-black/70;
  background: var(--selection-bg-color);
}
</style>
