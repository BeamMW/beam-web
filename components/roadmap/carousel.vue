<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { throttle } from "~/utils/throttle";

SwiperCore.use([Navigation]);

enum PROGRESS {
  PLANNED = "planned",
  BUILDING = "building",
  COMPLETED = "completed",
}

interface RoadmapItem {
  name: string;
  year: number;
  color: string;
  image: string;
  types: { description: string; state: PROGRESS }[];
}
type Roadmap = RoadmapItem[];

const roadmap: Roadmap = [
  {
    name: "Agile Atom",
    year: 2019,
    color: "#00f3d0",
    image: "atom",
    types: [
      { description: "Payment and Exchange API", state: PROGRESS.COMPLETED },
      { description: "Mining Pool API", state: PROGRESS.COMPLETED },
      { description: "Lightning Position Paper", state: PROGRESS.COMPLETED },
    ],
  },
  {
    name: "Bright Boson",
    year: 2019,
    color: "#00d3ff",
    image: "boson",
    types: [
      { description: "Android and iOS Wallets", state: PROGRESS.COMPLETED },
      {
        description: "Payment Platforms Integration",
        state: PROGRESS.COMPLETED,
      },
      { description: "Fast Node sync", state: PROGRESS.COMPLETED },
      { description: "Payment Confirmation", state: PROGRESS.COMPLETED },
      { description: "Beam Anywhere POC", state: PROGRESS.COMPLETED },
      { description: "Cold Wallet", state: PROGRESS.COMPLETED },
    ],
  },
  {
    name: "Clear Cathode",
    year: 2019,
    color: "#3d9be9",
    image: "cathode",
    types: [
      {
        description: "Beam ↔ BTC, LTC, QTUM Atomic Swap (Desktop wallet)",
        state: PROGRESS.COMPLETED,
      },
      { description: "PoW Algorithm Change", state: PROGRESS.COMPLETED },
      { description: "Lightning POC", state: PROGRESS.COMPLETED },
      { description: "Lelantus-MW POC", state: PROGRESS.COMPLETED },
    ],
  },
  {
    name: "Double Doppler",
    year: 2020,
    color: "#9d6eff",
    image: "doppler",
    types: [
      {
        description: "Atomic Swaps Marketplace (Desktop wallet) and API",
        state: PROGRESS.COMPLETED,
      },
      { description: "Laser Beam", state: PROGRESS.COMPLETED },
      { description: "Lelantus Testnet", state: PROGRESS.COMPLETED },
      { description: "Wallet Update notifications", state: PROGRESS.COMPLETED },
      { description: "Wallet fiat value indicator", state: PROGRESS.COMPLETED },
    ],
  },
  {
    name: "Eager Electron",
    year: 2020,
    color: "#f86cff",
    image: "electron",
    types: [
      {
        description: "Confidential Assets on Mainnet",
        state: PROGRESS.COMPLETED,
      },
      {
        description: "BeamHashIII PoW mining algorithm",
        state: PROGRESS.COMPLETED,
      },
      { description: "Lelantus MW", state: PROGRESS.COMPLETED },
      { description: "One-side payment", state: PROGRESS.COMPLETED },
      { description: "Sync balance over same seed", state: PROGRESS.COMPLETED },
      { description: "Mobile Node", state: PROGRESS.COMPLETED },
    ],
  },
  {
    name: "Fierce Fermion",
    year: 2022,
    color: "#b02fb0",
    image: "fermion",
    types: [
      {
        description: "Beam Virtual Machine in wallet and node",
        state: PROGRESS.COMPLETED,
      },
      { description: "In-wallet DAPP store", state: PROGRESS.COMPLETED },
    ],
  },
  {
    name: "Groovy Gluon",
    year: 2022,
    color: "#bc1b9f",
    image: "gluon",
    types: [
      { description: "IPFS Integration", state: PROGRESS.COMPLETED },
      { description: "Decentralized DApp Store", state: PROGRESS.COMPLETED },
      { description: "High Frequency Transactions", state: PROGRESS.COMPLETED },
      {
        description: "DAO core DAPP (governance and voting)",
        state: PROGRESS.COMPLETED,
      },
      { description: "Asset Swap Marketplace", state: PROGRESS.COMPLETED },
      { description: "Blockchain Explorer Updates", state: PROGRESS.COMPLETED },
      { description: "Shader SDK", state: PROGRESS.COMPLETED },
      { description: "Bridges release", state: PROGRESS.COMPLETED },
      { description: "Oracles", state: PROGRESS.COMPLETED },
      { description: "AMM DEX release", state: PROGRESS.COMPLETED },
      {
        description: "HW Wallet Support (Ledger Nano S & Nano S Plus)",
        state: PROGRESS.COMPLETED,
      },
      {
        description: "Beam Messenger DApp in Beam Wallet",
        state: PROGRESS.COMPLETED,
      },
    ],
  },
  {
    name: "Hearty Hadron and Later",
    year: 2023,
    color: "#c8502d",
    image: "hadron",
    types: [
      { description: "EVM support", state: PROGRESS.BUILDING },
      { description: "Hard Fork 8.0", state: PROGRESS.PLANNED },
      { description: "Sidechains support", state: PROGRESS.PLANNED },
      {
        description: "Launching EVM DApps on Beam chain",
        state: PROGRESS.PLANNED,
      },
    ],
  },
].reverse();

const slidesToShow = ref(1);
const customNextButton = ref<HTMLElement | null>(null);
const customPrevButton = ref<HTMLElement | null>(null);

const calculateSlidesToShow = () => {
  if (process.client) {
    const width = window.innerWidth;
    if (width >= 1280) {
      return 3;
    } else if (width >= 1024) {
      return 2;
    }
  }
  return 1;
};

const updateSlidesToShow = throttle(() => {
  slidesToShow.value = calculateSlidesToShow();
}, 100);

onMounted(() => {
  window.addEventListener("resize", updateSlidesToShow);
  updateSlidesToShow();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSlidesToShow);
});
</script>

<template>
  <div class="w-full relative">
    <div ref="customNextButton" class="group custom-swipe-arrow next-button">
      <Icon
        class="block w-5 h-5 md:w-7 md:h-7 text-white group-hover:opacity-100 opacity-60 transition-opacity"
        name="layout/arrow-right"
      />
    </div>
    <div ref="customPrevButton" class="group custom-swipe-arrow prev-button">
      <Icon
        class="block rotate-180 w-5 h-5 md:w-7 md:h-7 text-white group-hover:opacity-100 opacity-60 transition-opacity"
        name="layout/arrow-right"
      />
    </div>

    <swiper
      :grab-cursor="true"
      :slides-per-view="slidesToShow"
      :navigation="{
        nextEl: customNextButton,
        prevEl: customPrevButton,
      }"
    >
      <SwiperSlide v-for="(item, index) in roadmap" :key="index">
        <div class="carousel-item-link lg:px-16">
          <div
            class="flex items-center flex-col text-white lg:items-start"
            :style="{ color: item.color }"
          >
            <span class="text-xs font-bold opacity-70 mb-1">{{
              item.year
            }}</span>
            <div class="flex items-center gap-4">
              <Icon
                :as-image="true"
                :name="`beam-releases/${item.image}`"
                class="h-12 text-beam-blue w-auto"
                loading="lazy"
                :alt="item.image"
              />
              <h6 class="font-bold text-xl">{{ item.name }}</h6>
            </div>

            <div class="flex flex-col gap-2 mt-6">
              <div
                v-for="(type, indexT) in item.types"
                :key="indexT"
                class="flex items-center gap-2 text-sm"
              >
                <div
                  class="p-1 rounded-full text-[#041D3C]"
                  :style="{
                    outline:
                      type.state === PROGRESS.PLANNED
                        ? `2px solid ${item.color}`
                        : 'transparent',
                    outlineOffset:
                      type.state === PROGRESS.PLANNED ? '-2px' : '0px',
                    background:
                      type.state !== PROGRESS.PLANNED
                        ? item.color
                        : 'transparent',
                  }"
                >
                  <Icon
                    v-if="type.state === PROGRESS.BUILDING"
                    class="block w-2.5 h-2.5 rtl:rotate-180"
                    name="layout/arrow-right"
                  />
                  <Icon
                    v-else-if="type.state === PROGRESS.COMPLETED"
                    class="block w-2.5 h-2.5"
                    name="layout/check"
                  />
                  <div v-else class="block w-2.5 h-2.5"></div>
                </div>
                <p class="text-white/90">{{ type.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </swiper>
  </div>
</template>
