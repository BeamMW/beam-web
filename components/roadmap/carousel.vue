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
      :auto-height="true"
    >
      <SwiperSlide v-for="(item, index) in roadmap" :key="index">
        <div class="carousel-item-link lg:px-16">
          <div
            class="flex items-center flex-col text-white lg:items-start px-10 md:px-0"
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

<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { throttle } from "~/utils/throttle";

const { t } = useI18n();

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
    name: t("roadmap.milestones.1.title"),
    year: 2019,
    color: "#00f3d0",
    image: "atom",
    types: [
      {
        description: t("roadmap.milestones.1.items.1"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.1.items.2"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.1.items.3"),
        state: PROGRESS.COMPLETED,
      },
    ],
  },
  {
    name: t("roadmap.milestones.2.title"),
    year: 2019,
    color: "#00d3ff",
    image: "boson",
    types: [
      {
        description: t("roadmap.milestones.2.items.1"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.2.items.2"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.2.items.3"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.2.items.4"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.2.items.5"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.2.items.6"),
        state: PROGRESS.COMPLETED,
      },
    ],
  },
  {
    name: t("roadmap.milestones.3.title"),
    year: 2019,
    color: "#3d9be9",
    image: "cathode",
    types: [
      {
        description: t("roadmap.milestones.3.items.1"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.3.items.2"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.3.items.3"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.3.items.4"),
        state: PROGRESS.COMPLETED,
      },
    ],
  },
  {
    name: t("roadmap.milestones.4.title"),
    year: 2020,
    color: "#9d6eff",
    image: "doppler",
    types: [
      {
        description: t("roadmap.milestones.4.items.1"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.4.items.2"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.4.items.3"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.4.items.4"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.4.items.5"),
        state: PROGRESS.COMPLETED,
      },
    ],
  },
  {
    name: t("roadmap.milestones.5.title"),
    year: 2020,
    color: "#f86cff",
    image: "electron",
    types: [
      {
        description: t("roadmap.milestones.5.items.1"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.5.items.2"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.5.items.3"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.5.items.4"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.5.items.5"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.5.items.6"),
        state: PROGRESS.COMPLETED,
      },
    ],
  },
  {
    name: t("roadmap.milestones.6.title"),
    year: 2021,
    color: "#b02fb0",
    image: "fermion",
    types: [
      {
        description: t("roadmap.milestones.6.items.1"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.6.items.2"),
        state: PROGRESS.COMPLETED,
      },
    ],
  },
  {
    name: t("roadmap.milestones.7.title"),
    year: 2022,
    color: "#bc1b9f",
    image: "gluon",
    types: [
      {
        description: t("roadmap.milestones.7.items.1"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.7.items.2"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.7.items.3"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.7.items.4"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.7.items.5"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.7.items.6"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.7.items.7"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.7.items.8"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.7.items.9"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.7.items.10"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.7.items.11"),
        state: PROGRESS.COMPLETED,
      },
      {
        description: t("roadmap.milestones.7.items.12"),
        state: PROGRESS.COMPLETED,
      },
    ],
  },
  {
    name: t("roadmap.milestones.8.title"),
    year: 2023,
    color: "#c8502d",
    image: "hadron",
    types: [
      {
        description: t("roadmap.milestones.8.items.1"),
        state: PROGRESS.BUILDING,
      },
      {
        description: t("roadmap.milestones.8.items.2"),
        state: PROGRESS.PLANNED,
      },
      {
        description: t("roadmap.milestones.8.items.3"),
        state: PROGRESS.PLANNED,
      },
      {
        description: t("roadmap.milestones.8.items.4"),
        state: PROGRESS.PLANNED,
      },
    ],
  },
].reverse();

const slidesToShow = ref(1);
const customNextButton = ref(null);
const customPrevButton = ref(null);

const calculateSlidesToShow = () => {
  if (typeof process !== "undefined" && process.client) {
    const width = window.innerWidth;
    if (width >= 1280) {
      return 3;
    } else if (width >= 768) {
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
