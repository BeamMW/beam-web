<script lang="ts" setup>
const styles =
  "bg-[#042248]/50 hover:bg-[#042248] focus:bg-[#042248] focus:ring-offset-[#042248] focus:ring-beam-blue/75 text-beam-blue";
const localePath = useLocalePath();

import { docTypes } from "@/app.config";

useHead({
  bodyAttrs: {
    class: "!bg-[#00150B]",
  },
});
</script>
<template>
  <div class="bg-page-radial-gradient-purple">
    <LayoutWrapper :center="true" class="py-10 lg:py-12">
      <LayoutTitle title="Documentation" />
      <div
        class="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-10 text-white"
      >
        <ResourcesLink
          v-for="(doc, index) in docTypes"
          :key="index"
          :title="doc.title"
          :image="doc.image"
          :link="localePath(`/docs${doc.path}`)"
          link-text="Explore (English)"
          :class="styles"
        />
      </div>
    </LayoutWrapper>
  </div>
</template>
