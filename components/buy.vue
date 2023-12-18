<script lang="ts" setup>
import { exchangesBuy, instantExchangesBuy } from "~/app.config";

const { t } = useI18n();

onMounted(() => {
  eventBus.emit(UserInteractionEvents.BUY_WHERE_COMPONENT_READY, {});
});
</script>
<template>
  <LayoutWrapper :center="true">
    <div id="exchanges"></div>
    <div id="targetComponentBuy" class="text-blue-50">
      <LayoutTitle :title="$t('buyWhere.title')" />

      <BuyGrid :title="t('buyWhere.exchanges')">
        <BuyCard
          v-for="exchange in exchangesBuy"
          :key="exchange.title"
          :title="exchange.title"
          :image="exchange.image"
          :link="exchange.link"
        />
      </BuyGrid>

      <BuyGrid class="pt-4 md:pt-6" :title="t('buyWhere.instantexchanges')">
        <BuyCard
          v-for="exchange in instantExchangesBuy"
          :key="exchange.title"
          :title="exchange.title"
          :image="exchange.image"
          :link="exchange.link"
        />
      </BuyGrid>

      <div
        class="text-sm text-left w-full whitespace-wrap break-words opacity-70 mt-7 lg:mt-8 flex flex-col gap-4 md:gap-2"
      >
        <BuyNotice>
          <template #icon>
            <Icon class="inline-block w-4 h-4" name="layout/warning" />
          </template>
          <template #text>
            <MarkdownRenderer t-key="buyWhere.disclaimer" />
          </template>
        </BuyNotice>
        <BuyNotice>
          <template #icon>
            <Icon class="inline-block w-4 h-4" name="layout/info" />
          </template>
          <template #text>
            <MarkdownRenderer t-key="buyWhere.ethereumContract" />
          </template>
        </BuyNotice>
      </div>
    </div>
  </LayoutWrapper>
</template>
<style scoped>
div#exchanges {
  @apply block relative invisible top-[-80px];
}
</style>
