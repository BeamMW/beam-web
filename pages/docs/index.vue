<script lang="ts" setup>
import { docTypes } from "@/app.config";
const { t } = useI18n();

const localePath = useLocalePath();

const title = computed(() => t("head.title.documentation"));
const description = computed(() => t("head.description"));

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});
</script>
<template>
  <div class="bg-page-radial-gradient-purple">
    <LayoutWrapper :center="true" class="py-10 lg:py-12">
      <LayoutTitle :title="t('head.title.documentation')" />
      <div
        class="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-10 text-white"
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
    </LayoutWrapper>
  </div>
</template>
