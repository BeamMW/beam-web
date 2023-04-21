<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
<template>
  <NuxtLink
    :to="link"
    target="_blank"
    class="p-4 group flex flex-col border rounded-xl border-black border-opacity-30 transition md:p-7 bg-[#042248]/50 hover:bg-[#042248] focus:bg-[#042248] shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset] focus:outline-none focus:ring-2 focus:ring-beam-blue/75 focus:ring-offset-2 focus:ring-offset-[#042248] w-full h-full"
  >
    <Icon
      class="select-none pointer-events-none w-9 h-auto"
      :name="`download/resources/${image}`"
      :as-image="true"
    />
    <h3
      class="mt-4 text-white/80 mb-3 text-lg font-bold group-hover:text-white/90"
    >
      {{ title }}
    </h3>
    <div class="mt-auto gap-4 select-none pointer-events-none">
      <LayoutExternalLink>{{
        linkText != "" ? linkText : $t("feature.learnmore")
      }}</LayoutExternalLink>
    </div>
  </NuxtLink>
</template>
