<script lang="ts" setup>
import { UserInteractionEvents, eventBus } from "~/utils/emitter";
import { scrollToComponent } from "~/utils/scrollToComponent";

const { t } = useI18n();

const targetComponentBuy = ref(null);

const whereToBuyScroll = () => scrollToComponent(targetComponentBuy);

onMounted(() =>
  eventBus.on(UserInteractionEvents.SCROLL_TO_WHERE_TO_BUY, whereToBuyScroll)
);

onUnmounted(() =>
  eventBus.off(UserInteractionEvents.SCROLL_TO_WHERE_TO_BUY, whereToBuyScroll)
);

const exchanges = [
  {
    title: "Gate.io",
    image: "exchanges/gateio",
    link: "https://www.gate.io/trade/BEAM_USDT",
  },
  {
    title: "MEXC Global",
    image: "exchanges/mexc",
    link: "https://www.mexc.com/exchange/BEAM_USDT?_from=market",
  },
  {
    title: "Tradeogre",
    image: "exchanges/tradeogre",
    link: "https://tradeogre.com/exchange/BTC-BEAM",
  },
  {
    title: "Hotbit",
    image: "exchanges/hotbit",
    link: "https://www.hotbit.io/exchange?symbol=BEAM_USDT",
  },
  {
    title: "Bitforex",
    image: "exchanges/bitforex",
    link: "https://www.bitforex.com/en/spot/beam_usdt",
  },
  {
    title: "Atomars",
    image: "exchanges/atomars",
    link: "https://atomars.com/trading/BEAMBTC",
  },
  {
    title: "CoinEx",
    image: "exchanges/coinex",
    link: "https://www.coinex.com/exchange?currency=usdt&dest=beam#spot",
  },
  {
    title: "Bkex",
    image: "exchanges/bkex",
    link: "https://www.bkex.com/trade/BEAM_USDT",
  },
];

const instantExchanges = [
  {
    title: "Beam4Me",
    image: "instant-exchanges/beam4me",
    link: "https://beam4.me/?from_curr=ETH&from_chain=1&to_curr=BEAM&to_chain=-1",
  },
  {
    title: "Simpleswap",
    image: "instant-exchanges/simpleswap",
    link: "https://simpleswap.io/?to=beam",
  },
  {
    title: "StealthEX",
    image: "instant-exchanges/stealthex",
    link: "https://stealthex.io/?to=beam",
  },
  {
    title: "Kriptomat",
    image: "instant-exchanges/kriptomat",
    link: "https://kriptomat.io/cryptocurrency-prices/beam-price/",
  },
];
</script>
<template>
  <LayoutWrapper :center="true">
    <div ref="targetComponentBuy">
      <LayoutTitle :title="$t('buyWhere.title')" />

      <BuyGrid :title="t('buyWhere.exchanges')">
        <BuyCard
          v-for="exchange in exchanges"
          :key="exchange.title"
          :title="exchange.title"
          :image="exchange.image"
          :link="exchange.link"
        />
      </BuyGrid>

      <BuyGrid class="pt-4 md:pt-6" :title="t('buyWhere.instantexchanges')">
        <BuyCard
          v-for="exchange in instantExchanges"
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
