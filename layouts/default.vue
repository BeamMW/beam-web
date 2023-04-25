<template>
  <div>
    <Html
      :lang="head.htmlAttrs && head.htmlAttrs.lang"
      :dir="head.htmlAttrs && head.htmlAttrs.dir"
    >
      <Head>
        <Meta name="theme-color" :content="themeColor" />
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
      <Body>
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

useHead({
  bodyAttrs: {
    class: "bg-[#041D3C]",
  },
});

const headerRef = ref("");
const footerRef = ref("");
const themeColor = ref("");
watch(
  currentRoute,
  () => {
    switch (currentRoute.value) {
      case "mining":
        headerRef.value = "bg-[rgba(3,50,34,.65)]";
        footerRef.value = "bg-page-radial-gradient-dark-green";
        themeColor.value = "#033222";
        break;
      default:
        headerRef.value = "bg-[rgba(4,37,72,.65)]";
        footerRef.value = "bg-page-radial-gradient";
        themeColor.value = "#041D3C";
    }
  },
  { immediate: true }
);
</script>
