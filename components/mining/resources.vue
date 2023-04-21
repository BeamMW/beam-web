<script lang="ts" setup>
const { t } = useI18n();

const styles =
  "bg-[#012a08]/50 hover:bg-[#012a08] focus:bg-[#012a08] focus:ring-offset-[#012a08] focus:ring-beam-green-dark text-beam-green-dark";
</script>
<template>
  <LayoutWrapper :center="true">
    <LayoutTitle :title="t('downloads.resources.title')" />
    <div class="grid lg:grid-cols-2 items-center gap-6 md:gap-10 text-white">
      <ResourcesLink
        title="Rewards Calculator"
        image="mining/resources/mining"
        link="https://whattomine.com/coins?aq_3070=3&a_3070=true&aq_69xt=0&aq_68xt=0&aq_68=0&aq_67xt=0&aq_66xt=0&aq_vii=0&aq_5700xt=0&aq_5700=0&aq_5600xt=0&aq_vega64=0&aq_vega56=0&aq_4090=0&aq_4080=0&aq_47Ti=0&aq_39Ti=0&aq_3090=0&aq_38Ti=0&aq_3080=0&aq_37Ti=0&aq_3060Ti=0&aq_3060=0&aq_66=0&aq_55xt8=0&aq_580=0&aq_570=0&aq_480=0&aq_470=0&aq_fury=0&aq_380=0&aq_a5=0&aq_a45=0&aq_a4=0&aq_a2=0&aq_2080Ti=0&aq_2080=0&aq_2070=0&aq_2060=0&aq_166s=0&aq_1660Ti=0&aq_1660=0&aq_1080Ti=0&aq_1080=0&aq_1070Ti=0&aq_1070=0&aq_10606=0&aq_1050Ti=0&factor[eth_hr]=180.0&factor[eth_p]=390.0&factor[e4g_hr]=180.0&factor[e4g_p]=390.0&factor[zh_hr]=300.0&factor[zh_p]=540.0&factor[cnh_hr]=5250.0&factor[cnh_p]=540.0&factor[cng_hr]=8700.0&factor[cng_p]=540.0&factor[s5r_hr]=2.22&factor[s5r_p]=300.0&factor[cx_hr]=10.8&factor[cx_p]=510.0&factor[eqa_hr]=1170.0&factor[eqa_p]=540.0&factor[cc_hr]=30.6&factor[cc_p]=540.0&factor[cr29_hr]=30.9&factor[cr29_p]=540.0&factor[hh_hr]=1530.0&factor[hh_p]=240.0&factor[ct32_hr]=2.1&factor[ct32_p]=540.0&eqb=true&factor[eqb_hr]=102.0&factor[eqb_p]=540.0&factor[b3_hr]=3.6&factor[b3_p]=330.0&factor[ns_hr]=0.0&factor[ns_p]=0.0&factor[al_hr]=480.0&factor[al_p]=390.0&factor[ops_hr]=158.1&factor[ops_p]=540.0&factor[eqz_hr]=165.0&factor[eqz_p]=540.0&factor[zlh_hr]=204.0&factor[zlh_p]=450.0&factor[kpw_hr]=82.8&factor[kpw_p]=540.0&factor[ppw_hr]=82.2&factor[ppw_p]=540.0&factor[nx_hr]=219.0&factor[nx_p]=390.0&factor[fpw_hr]=75.0&factor[fpw_p]=450.0&factor[vh_hr]=3.57&factor[vh_p]=420.0&factor[cost]=0.1&factor[cost_currency]=USD&sort=Profitability24&volume=0&revenue=24h&factor[exchanges][]=&factor[exchanges][]=binance&factor[exchanges][]=bitfinex&factor[exchanges][]=bitforex&factor[exchanges][]=bittrex&factor[exchanges][]=coinex&factor[exchanges][]=exmo&factor[exchanges][]=gate&factor[exchanges][]=graviex&factor[exchanges][]=hitbtc&factor[exchanges][]=ogre&factor[exchanges][]=poloniex&factor[exchanges][]=stex&dataset=beam&commit=Calculate"
        link-text="WhatToMine"
        :class="styles"
      />
      <ResourcesLink
        title="Beam Mining Support"
        image="mining/resources/help"
        link="https://t.me/BeamMiners"
        link-text="Telegram"
        :class="styles"
      />
    </div>
  </LayoutWrapper>
</template>
