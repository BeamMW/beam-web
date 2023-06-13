<script lang="ts" setup>
import { exchangesBuy, instantExchangesBuy } from "~/app.config";

const { t } = useI18n();
</script>
<template>
  <LayoutWrapper :center="true" id="exchanges">
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

      <p
        class="text-sm text-left w-full opacity-70 mt-7 lg:mt-8 flex items-center gap-2"
      >
        <Icon class="w-4 h-4 hidden lg:inline-block" name="layout/warning" />
        <MarkdownRenderer t-key="buyWhere.disclaimer" />
      </p>
    </div>
  </LayoutWrapper>
</template>
