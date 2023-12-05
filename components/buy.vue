<script lang="ts" setup>
import { exchangesBuy, instantExchangesBuy } from "~/app.config";

const { t } = useI18n();
</script>
<template>
  <LayoutWrapper :center="true">
    <div id="exchanges"></div>
    <div id="targetComponentBuy">
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
            <Icon class="w-4 h-4" name="layout/warning" />
          </template>
          <template #text>
            <MarkdownRenderer t-key="buyWhere.disclaimer" />
          </template>
        </BuyNotice>
        <BuyNotice>
          <template #icon>
            <Icon class="w-4 h-4" name="layout/info" />
          </template>
          <template #text>
            <MarkdownRenderer t-key="buyWhere.uniswap" />
          </template>
        </BuyNotice>
      </div>
    </div>
  </LayoutWrapper>
</template>
<style scoped>
div#exchanges {
  display: block;
  position: relative;
  top: -100px;
  visibility: hidden;
}
</style>
