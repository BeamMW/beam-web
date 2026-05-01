<template>
  <RenderCacheable :cache-key="routeName">
    <BlogPost :route-name="routeName" />
  </RenderCacheable>
</template>

<script lang="ts" setup>
const route = useRoute();

// Handle the route path for the blog post
const routeName = computed(() => {
  const path = route.path.replace(/^\/blog\//, "").replace(/\/$/, "");
  return `/blog/${path}`;
});

definePageMeta({
  layout: "default",
});
</script>
