<script lang="ts" setup>
import { ExternalLinks } from "~/app.config";

const { t } = useI18n();

const title = computed(() => t("privacy.title"));
const description = computed(() => t("head.descriptions.privacy"));

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});

definePageMeta({
  layout: "default",
});
</script>
<template>
  <section
    class="bg-page-radial-gradient background-radial-defaults w-full pt-28 md:pt-32"
  >
    <div
      class="max-w-prose px-4 py-10 lg:py-12 sm:px-6 lg:px-8 mx-auto text-blue-50"
    >
      <b
        class="block text-base text-center text-text font-bold tracking-wide uppercase mb-2"
        >{{ $t("privacy.lastupdate") }}</b
      >
      <LayoutTitle :title="t('privacy.title')" />

      <div class="space-y-5 md:space-y-8 px-7">
        <div v-for="index in 9" :key="index" class="space-y-3">
          <h3
            :class="
              index === 1
                ? 'text-2xl font-bold md:text-3xl hidden'
                : 'text-2xl font-bold'
            "
          >
            {{ $t(`privacy.${index}.title`) }}
          </h3>
          <p class="text-lg">
            <MarkdownRenderer
              :t-key="`privacy.${index}.content`"
              :t-interpolation="{
                support: `[${ExternalLinks.SUPPORT_EMAIL.replace(
                  'mailto:',
                  '',
                )}](${ExternalLinks.SUPPORT_EMAIL})`,
              }"
            />
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
