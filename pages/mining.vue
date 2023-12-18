<script lang="ts" setup>
import { miningSoftware } from "@/app.config";

const { t } = useI18n();
const localePath = useLocalePath();

const title = computed(() => t("mining.title"));
const description = computed(() => t("head.descriptions.mining"));

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
  <div class="bg-page-radial-gradient-dark-green background-radial-defaults">
    <div
      class="flex max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto flex-col items-center justify-center space-y-8 pt-32 md:pt-36 text-center"
    >
      <div
        class="w-full flex flex-col md:flex-row justify-evenly items-center pt-8"
      >
        <Icon
          name="mining/intro"
          :as-image="true"
          loading="lazy"
          class="w-64 h-64"
          alt="Beam Girl"
        />

        <div class="pt-10">
          <LayoutTitle
            :title="t('mining.title')"
            :reserve-space="false"
            gradient-color="specialGradientGreen"
            :large="true"
            :small-padding="true"
          />
        </div>
      </div>

      <div>
        <h2 class="text-lg md:text-xl text-green-100">
          <MarkdownRenderer t-key="mining.introduction" />
        </h2>

        <p class="my-5 text-lg text-green-50">
          {{ $t("mining.details") }}
        </p>
      </div>

      <div>
        <LayoutButton
          button-link="/docs/mining"
          :big="true"
          accent-color="beam-green-dark"
        >
          <Icon
            name="get-started/beam-currency"
            :as-image="false"
            loading="eager"
            class="h-7 w-7"
          />
          {{ $t("mining.button") }}
        </LayoutButton>
      </div>
    </div>

    <LayoutWrapper :center="true" class="pt-10 lg:pt-12 text-green-50">
      <LayoutTitle
        :title="t('mining.miningSoftware')"
        gradient-color="specialGradientGreen"
      />

      <div class="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="(gpuType, index) in miningSoftware"
          :key="index"
          class="col-span-1"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div class="col-span-1 p-4 justify-self-center">
              <Icon
                :name="`mining/${gpuType.type.toLowerCase()}`"
                :as-image="true"
                loading="lazy"
                :alt="gpuType.type.toLowerCase()"
                class="h-7 w-auto opacity-90"
              />
            </div>
            <div class="col-span-1 p-4 justify-self-center">
              <LayoutLink
                v-for="(software, softwareIndex) in gpuType.miningSoftware"
                :key="softwareIndex"
                :to="software.link"
                class="block text-lg opacity-80 hover:opacity-100 transition-opacity"
              >
                {{ software.name }}
              </LayoutLink>
            </div>
          </div>
        </div>
      </div>

      <div>
        <LayoutButton
          accent-color="beam-green-dark"
          class="mt-5 w-fit mx-auto"
          :button-link="localePath('downloads')"
        >
          <Icon class="w-[18px] h-[18px]" name="layout/flat-beam-animated" />
          {{ $t("mining.downloadWalletAndNode") }}
        </LayoutButton>
      </div>
    </LayoutWrapper>

    <MiningResources class="py-10 lg:py-12" />
  </div>
</template>
