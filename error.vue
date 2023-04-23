<template>
  <main class="bg-page-radial-gradient-purple">
    <HeaderComponent class="bg-[rgba(28,0,46,.65)]" />
    <div
      class="flex max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto flex-col items-center justify-center space-y-6 py-16 text-center"
    >
      <div class="avatar">
        <Icon
          name="misc/404"
          :as-image="true"
          loading="lazy"
          class="w-64 h-64 mb-2 select-none pointer-events-none"
          alt="Beam Girl"
        />
      </div>
      <h1 class="text-base font-bold text-white">
        {{ title }}
      </h1>
      <h2 class="text-4xl font-bold text-white !m-0">
        {{ $t("errors.404.title") }}
      </h2>
      <p class="text-white text-lg">
        <MarkdownRenderer t-key="errors.404.message" />
      </p>
      <LayoutButton
        button-link="#"
        :big="true"
        as="button"
        accent-color="white"
        @click.prevent="handleError"
      >
        {{ $t("errors.back") }}
      </LayoutButton>
      <div class="text-white text-xs opacity-70 font-mono">
        <p>
          {{ props.error.message }}
        </p>
        <p
          v-if="props.error.stack"
          class="mt-2"
          v-text="stripHTML(props.error.stack)"
        />
      </div>
    </div>
    <FooterComponent class="bg-page-radial-gradient-purple" />
  </main>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});
const handleError = () => clearError({ redirect: "/" });

useTitleTemplate();

const title = computed(() =>
  t("errors.title", { code: props.error.statusCode })
);
const description = computed(() => t("head.description"));

function stripHTML(html: string) {
  if (typeof DOMParser !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  } else {
    return html;
  }
}

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});

useHead({
  bodyAttrs: {
    class: "bg-[#1C002E]",
  },
});
</script>
