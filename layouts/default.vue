<template>
  <main>
    <HeaderAnnouncement />
    <HeaderComponent :class="headerRef" />
    <slot />
    <FooterComponent :class="footerRef" />
  </main>
</template>
<script lang="ts" setup>
const currentRoute = useState("currentRoute", () => "");

const headerRef = ref("");
const footerRef = ref("");
watch(
  currentRoute,
  () => {
    switch (currentRoute.value) {
      case "mining":
        headerRef.value = "bg-[rgba(3,50,34,.65)]";
        footerRef.value = "bg-page-radial-gradient-dark-green";
        break;
      default:
        headerRef.value = "bg-[rgba(4,37,72,.65)]";
        footerRef.value = "bg-page-radial-gradient";
    }
  },
  { immediate: true }
);
</script>

