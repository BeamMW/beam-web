<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const handleError = () => clearError({ redirect: localePath("/") });
const title = computed(() =>
  t("errors.title", { code: props.error.statusCode }),
);
const description = computed(() => t("head.descriptions.index"));

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});

function stripHTML(html: string) {
  if (typeof DOMParser !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
  } else {
    return html;
  }
}
</script>
<template>
  <section
    class="bg-page-radial-gradient background-radial-defaults text-blue-100"
  >
    <div
      class="flex max-w-7xl px-4 sm:px-0 mx-auto flex-col items-center justify-center space-y-6 pt-44 pb-20 text-center"
    >
      <LayoutPicture
        src="/svg/misc/404"
        alt="Beam Girl"
        class="w-64 h-64"
        extension="svg"
      />

      <div>
        <h1 class="text-base font-bold">
          {{ title }}
        </h1>
        <LayoutTitle :title="$t('errors.404.title')" :small-padding="true" />

        <div class="text-lg m-0 p-0">
          <MarkdownRenderer t-key="errors.404.message" />
        </div>
      </div>

      <LayoutButton
        button-link="#"
        :big="true"
        as="button"
        accent-color="beam-blue"
        @click.prevent="handleError"
      >
        {{ $t("errors.back") }}
      </LayoutButton>
      <div
        class="text-purple-100 text-xs opacity-70 font-mono flex gap-3 justify-center flex-col items-center"
      >
        <p>
          {{ props.error.message }}
        </p>
        <p
          v-if="props.error.stack"
          class="break-words w-3/4"
          v-text="stripHTML(props.error.stack)"
        />
      </div>
    </div>
  </section>
</template>
