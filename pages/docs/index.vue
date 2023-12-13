<script lang="ts" setup>
import { ExternalLinks, docTypes } from "@/app.config";
const { t } = useI18n();

const title = computed(() => t("head.title.documentation"));
const description = computed(() => t("head.descriptions.docs"));
const localePath = useLocalePath();

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
  <div class="bg-page-radial-gradient-purple">
    <LayoutWrapper :center="true" class="py-10 lg:py-12">
      <div class="px-4 mx-auto max-w-screen-xl text-center z-[12] heroText">
        <LayoutTitle
          :title="t('head.title.documentation')"
          :reserve-space="true"
          gradient-color="specialGradientPurple"
          :large="true"
          :small-padding="true"
        />

        <h2
          class="mb-8 md:mb-12 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-white"
        >
          {{ $t("docs.warning") }}
        </h2>
      </div>

      <div
        class="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-6 md:gap-10 text-white"
      >
        <ResourcesLink
          v-for="(doc, index) in docTypes"
          :key="index"
          :title="t(doc.title)"
          :image="doc.image"
          :link="localePath(`/docs${doc.path}`)"
          :link-text="t('docs.explore')"
          class="bg-[#360061]/50 hover:bg-[#360061] focus:bg-[#360061] focus:ring-offset-[#360061] focus:ring-beam-purple text-[#E9D4F2]"
        />
      </div>

      <div class="flex justify-center">
        <LayoutLink
          :to="ExternalLinks.DOCS_SOURCES"
          class="opacity-70 text-beam-blue md:text-lg pt-8 md:pt-10 hover:opacity-100 flex items-center text-base underline gap-1 transition-opacity"
        >
          {{ $t("docs.edit")
          }}<Icon
            name="layout/external"
            class="inline-block h-[1.32rem] w-[1.32rem]"
          ></Icon>
        </LayoutLink>
      </div>
    </LayoutWrapper>
  </div>
</template>
