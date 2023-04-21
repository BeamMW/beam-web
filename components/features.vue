<template>
  <LayoutWrapper :center="true">
    <LayoutTitle :title="$t('feature.title')" />
    <div
      class="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-10"
    >
      <FeaturesCard
        v-for="(feature, index) in features"
        :key="index"
        :link="feature.link"
        :image="feature.image"
        :title="$t(feature.title)"
        :text="$t(feature.text)"
        loading="lazy"
      />
    </div>
  </LayoutWrapper>
</template>

<script lang="ts" setup>
const features = [
  {
    link: "https://documentation.beam.mw/#private-transactions",
    image: "features/private",
    title: "feature.1.title",
    text: "feature.1.text",
  },
  {
    link: "https://documentation.beam.mw/#tokens-a-k-a-beam-confidential-assets",
    image: "features/ca",
    title: "feature.2.title",
    text: "feature.2.text",
  },
  {
    link: "https://documentation.beam.mw/overview/beamx-tokenomics",
    image: "features/defi",
    title: "feature.3.title",
    text: "feature.3.text",
  },
  {
    link: "https://documentation.beam.mw/#atomic-swaps",
    image: "features/atomic-dex",
    title: "feature.4.title",
    text: "feature.4.text",
  },
  {
    link: "https://documentation.beam.mw/#smart-contracts-a-k-a-beam-shaders",
    image: "features/shaders",
    title: "feature.5.title",
    text: "feature.5.text",
  },
  {
    link: "https://documentation.beam.mw/#beam-wallets",
    image: "features/usability",
    title: "feature.6.title",
    text: "feature.6.text",
  },
];
</script>
