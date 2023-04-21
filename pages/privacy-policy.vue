<script lang="ts" setup>
const { t } = useI18n();
</script>
<template>
  <section class="bg-page-radial-gradient w-full">
    <div class="max-w-prose px-4 py-10 lg:py-12 sm:px-6 lg:px-8 mx-auto">
      <b class="block text-base text-center text-text opacity-80 font-semibold tracking-wide uppercase">LAST UPDATED: 21TH OF APRIL 2023</b>
      <LayoutTitle :title="t('privacy.title')" />

      <div class="space-y-5 md:space-y-8 px-7">
        <div v-for="index in 9" :key="index" class="space-y-3">
          <h3
            :class="
              index === 1
                ? 'text-2xl font-bold md:text-3xl hidden'
                : 'text-2xl font-semibold'
            "
          >
            {{ $t(`privacy.${index}.title`) }}
          </h3>
          <p class="text-lg text-gray-200">
            <MarkdownRenderer
              :t-key="`privacy.${index}.content`"
              :t-interpolation="{
                support: '[support@beam.mw](mailto:support@beam.mw)',
              }"
            />
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
