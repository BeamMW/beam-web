<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();

const styles =
  "bg-[#042248]/50 hover:bg-[#042248] focus:bg-[#042248] focus:ring-offset-[#042248] focus:ring-beam-blue/75 text-beam-blue";
</script>
<template>
  <LayoutWrapper :center="true">
    <LayoutTitle :title="t('downloads.resources.title')" />
    <div
      class="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-6 md:gap-10"
    >
      <ResourcesLink
        :title="t('downloads.resources.wallet')"
        image="download/resources/desktop"
        :link="`${localePath('docs')}/desktop`"
        :link-text="t('downloads.resources.documentation')"
        :class="styles"
      />
      <ResourcesLink
        :title="t('downloads.resources.commandlinenode')"
        image="download/resources/console"
        :link="`${localePath('docs')}/node`"
        :link-text="t('downloads.resources.documentation')"
        :class="styles"
      />
      <ResourcesLink
        :title="t('downloads.resources.commandlinewallet')"
        image="download/resources/console"
        :link="`${localePath('docs')}/cli`"
        :link-text="t('downloads.resources.documentation')"
        :class="styles"
      />
      <ResourcesLink
        :title="t('downloads.resources.changelog')"
        image="download/resources/changelog"
        :link="`${localePath('docs')}/changelog`"
        :class="styles"
      />
    </div>
  </LayoutWrapper>
</template>
