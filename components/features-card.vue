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
  lazy: {
    type: Boolean,
    default: false,
  },
});

const hasAccentColor: string = props.accentColor ? "hasAccentColor " : "";
</script>

<template>
  <section
    :style="`--selection-bg-color: var(--${accentColor});`"
    :class="`${hasAccentColor}bg-[#042248] border-opacity-30 shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset] col-span-1 flex flex-col`"
    class="w-full h-full border-opacity-10 border-black border rounded-lg p-7"
  >
    <Icon
      v-if="image"
      :class="`select-none pointer-events-none h-fit text-${
        accentColor ? accentColor : 'current'
      } ${wideIcon ? 'w-12' : 'w-9'}`"
      :name="image"
      :as-image="true"
      :lazy="lazy"
    />
    <p
      v-if="number"
      :class="`h-[46px] text-5xl select-none font-bold opacity-90 text-${accentColor}`"
    >
      {{ number }}
    </p>
    <div class="mt-3 mb-5">
      <h3 class="block text-lg font-semibold text-white mb-3">{{ title }}</h3>
      <p class="text-white text-opacity-80">{{ text }}</p>
    </div>
    <div class="flex flex-col mt-auto gap-4 select-none">
      <NuxtLink v-if="link" :to="link" target="_blank">
        <LayoutExternalLink>{{
          linkName ? linkName : $t("feature.learnmore")
        }}</LayoutExternalLink>
      </NuxtLink>
      <slot></slot>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
section.hasAccentColor ::selection {
  @apply text-black/70;
  background: var(--selection-bg-color);
}
</style>
