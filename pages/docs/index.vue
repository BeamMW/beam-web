<script lang="ts" setup>
const styles =
  "bg-[#042248]/50 hover:bg-[#042248] focus:bg-[#042248] focus:ring-offset-[#042248] focus:ring-beam-blue/75 text-beam-blue";

const localePath = useLocalePath();
</script>
<template>
  <LayoutWrapper :center="true" class="py-10 lg:py-12 bg-page-radial-gradient">
    <LayoutTitle title="Documentation" />
    <div class="grid lg:grid-cols-2 items-center gap-6 md:gap-10 text-white">
      <ResourcesLink
        title="Desktop Wallet"
        image="download/resources/desktop"
        :link="localePath('/docs/desktop')"
        link-text="Explore"
        :class="styles"
      />
    </div>
  </LayoutWrapper>
</template>
