<script lang="ts" setup>
const styles =
  "bg-[#042248]/50 hover:bg-[#042248] focus:bg-[#042248] focus:ring-offset-[#042248] focus:ring-beam-blue/75 text-beam-blue";

const localePath = useLocalePath();

const resourceLinks = computed(() => [
  {
    title: "Desktop Wallet (not working)",
    image: "download/resources/desktop",
    path: "/desktop",
  },
  {
    title: "Mobile App",
    image: "download/resources/desktop",
    path: "/mobile",
  },
  {
    title: "Web Wallet (not working)",
    image: "download/resources/desktop",
    path: "/web-wallet",
  },
  {
    title: "Mining (not working)",
    image: "download/resources/desktop",
    path: "/web-wallet",
  },
  {
    title: "Developers",
    image: "download/resources/console",
    path: "/dev",
  },
  {
    title: "Node (not working)",
    image: "download/resources/desktop",
    path: "/node",
  },
  {
    title: "Atomic Swaps",
    image: "download/resources/desktop",
    path: "/atomics-swaps",
  },
  {
    title: "Command Line Interface",
    image: "download/resources/console",
    path: "/cli",
  },
  {
    title: "Explorer (not working)",
    image: "download/resources/desktop",
    path: "/explorer",
  },
]);
</script>
<template>
  <LayoutWrapper :center="true" class="py-10 lg:py-12 bg-page-radial-gradient">
    <LayoutTitle title="Documentation" />
    <div
      class="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-10 text-white"
    >
      <ResourcesLink
        v-for="(resource, index) in resourceLinks"
        :key="index"
        :title="resource.title"
        :image="resource.image"
        :link="localePath(`/docs${resource.path}`)"
        link-text="Explore (English)"
        :class="styles"
      />
    </div>
  </LayoutWrapper>
</template>
