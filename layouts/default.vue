<template>
  <div>
    <Html
      :lang="head.htmlAttrs && head.htmlAttrs.lang"
      :dir="head.htmlAttrs && head.htmlAttrs.dir"
      :style="`background-color: ${bodyColor};`"
    >
      <Head>
        <Meta name="theme-color" :content="bodyColor" />
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body :style="`background-color: ${bodyColor};`">
        <main>
          <HeaderAnnouncement />
          <HeaderComponent :class="headerRef" />
          <slot />
          <FooterComponent :class="footerRef" />
        </main>
      </Body>
    </Html>
  </div>
</template>

<script lang="ts" setup>
const currentRoute = useState("currentRoute", () => "");

useTitleTemplate();

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

const headerRef = ref("");
const footerRef = ref("");
const bodyColor = ref("");

watch(
  currentRoute,
  () => {
    switch (currentRoute.value) {
      case "mining":
        headerRef.value = "bg-[rgba(3,50,34,.6)]";
        footerRef.value = "bg-page-radial-gradient-dark-green";
        bodyColor.value = "#00150B";
        break;
      case "docs":
      case "docs-slug":
        headerRef.value = "bg-[rgba(54,0,97,.6)]";
        footerRef.value = "bg-page-radial-gradient-purple";
        bodyColor.value = "#1C002E";
        break;
      default:
        headerRef.value = "bg-[rgba(4,37,72,.6)]";
        footerRef.value = "bg-page-radial-gradient";
        bodyColor.value = "#041D3C";
    }
  },
  { immediate: true }
);
</script>
