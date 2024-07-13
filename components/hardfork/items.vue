<template>
  <div class="w-full relative mb-5">
    <div ref="customNextButton" class="group custom-swipe-arrow next-button">
      <Icon class="block w-4 h-4 md:w-6 md:h-6 text-beam-blue group-hover:opacity-100 opacity-60 transition-opacity"
        name="layout/arrow-right" />
    </div>
    <div ref="customPrevButton" class="group custom-swipe-arrow prev-button">
      <Icon
        class="block rotate-180 w-4 h-4 md:w-6 md:h-6 text-beam-blue group-hover:opacity-100 opacity-60 transition-opacity"
        name="layout/arrow-right" />
    </div>
    <swiper ref="swiperRef" :grab-cursor="true" :slides-per-view="slidesToShow" :navigation="{
      nextEl: customNextButton,
      prevEl: customPrevButton,
    }" :initial-slide="hardfork.length" :auto-height="true">
      <SwiperSlide v-for="(item, index) in hardfork" :key="index">
        <div class="carousel-item-link lg:px-16">
          <div class="flex items-center flex-col text-blue-50 lg:items-start px-10 md:px-0"
            :style="{ color: item.color }">
            <div class="flex items-center gap-4">
              <Icon :as-image="true" :name="`beam-releases/${item.image}`" class="h-12 w-12" loading="lazy"
                :alt="item.image" />
              <p class="font-bold text-xl m-0 p-0">{{ item.name }}</p>
            </div>
            <div class="flex flex-col gap-2 mt-6">
              <p class="text-blue-50">
                {{ item.text.slice(0, 100) + '...' }}
              </p>
              <button @click="openModal(item)"
                class="!outline-none w-fit px-4 py-1 border rounded bg-[rgb(11,31,64)]/50 hover:bg-[#042248] focus:bg-[#042248] border-black border-opacity-30 shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset] focus:outline-none focus:ring-2 focus:ring-beam-blue/75 focus:ring-offset-2 transition focus:ring-offset-[#042248]">
                View More
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </swiper>
    <modal
      v-if="currentItem"
      :title="currentItem.name"
      :text="currentItem.text"
      :visible="!!currentItem"
      @close="currentItem = null"
    />
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Swiper as SwiperInstance } from "swiper";
import { Navigation } from "swiper/modules";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from 'vue-i18n';
import Modal from './modal.vue';

const { t } = useI18n();

SwiperCore.use([Navigation]);

interface HardforkLink {
  title: string;
  link: string;
}

interface HardforkItem {
  name: string;
  text: string;
  links: HardforkLink[];
  color: string;
  image: string;
  showFullText: boolean;
}

type Hardfork = HardforkItem[];

const hardfork = ref<Hardfork>([
  {
    name: t("hardfork.hardforks.1.title"),
    text: t("hardfork.hardforks.1.text"),
    color: "#3d9be9",
    showFullText: false,
    links: [
      {
        title: t("hardfork.hardforks.1.links.1.title"),
        link: t("hardfork.hardforks.1.links.1.link")
      }
    ],
    image: "atom",
  },
  {
    name: t("hardfork.hardforks.2.title"),
    text: t("hardfork.hardforks.2.text"),
    color: "#3d9be9",
    showFullText: false,
    links: [
      {
        title: t("hardfork.hardforks.2.links.1.title"),
        link: t("hardfork.hardforks.2.links.1.link")
      },
      {
        title: t("hardfork.hardforks.2.links.2.title"),
        link: t("hardfork.hardforks.2.links.2.link")
      },
      {
        title: t("hardfork.hardforks.2.links.3.title"),
        link: t("hardfork.hardforks.2.links.3.link")
      }
    ],
    image: "boson",
  },
  {
    name: t("hardfork.hardforks.3.title"),
    text: t("hardfork.hardforks.3.text"),
    color: "#3d9be9",
    showFullText: false,
    links: [
      {
        title: t("hardfork.hardforks.3.links.1.title"),
        link: t("hardfork.hardforks.3.links.1.link")
      },
      {
        title: t("hardfork.hardforks.3.links.2.title"),
        link: t("hardfork.hardforks.3.links.2.link")
      },
      {
        title: t("hardfork.hardforks.3.links.3.title"),
        link: t("hardfork.hardforks.3.links.3.link")
      },
      {
        title: t("hardfork.hardforks.3.links.4.title"),
        link: t("hardfork.hardforks.3.links.4.link")
      }
    ],
    image: "cathode",
  },
  {
    name: t("hardfork.hardforks.4.title"),
    text: t("hardfork.hardforks.4.text"),
    color: "#3d9be9",
    showFullText: false,
    links: [
      {
        title: t("hardfork.hardforks.4.links.1.title"),
        link: t("hardfork.hardforks.4.links.1.link")
      },
      {
        title: t("hardfork.hardforks.4.links.2.title"),
        link: t("hardfork.hardforks.4.links.2.link")
      }
    ],
    image: "doppler",
  },
  {
    name: t("hardfork.hardforks.5.title"),
    text: t("hardfork.hardforks.5.text"),
    color: "#3d9be9",
    showFullText: false,
    links: [
      {
        title: t("hardfork.hardforks.5.links.1.title"),
        link: t("hardfork.hardforks.5.links.1.link")
      },
      {
        title: t("hardfork.hardforks.5.links.2.title"),
        link: t("hardfork.hardforks.5.links.2.link")
      }
    ],
    image: "epsilon",
  }
]);

const slidesToShow = ref(1);
const customNextButton = ref(null);
const customPrevButton = ref(null);
const swiperRef = ref<SwiperInstance | null>(null);

const updateSlidesToShow = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width >= 1280) {
      slidesToShow.value = 2;
    } else if (width >= 768) {
      slidesToShow.value = 2;
    } else {
      slidesToShow.value = 1;
    }
  }
};

const resizeObserver = ref<ResizeObserver | undefined>();

onMounted(() => {
  resizeObserver.value = new ResizeObserver(() => updateSlidesToShow());
  resizeObserver.value.observe(document.body);
  updateSlidesToShow();
});

onBeforeUnmount(() => {
  resizeObserver.value?.disconnect();
});

const openModal = (item: HardforkItem) => {
  currentItem.value = item;
};

const currentItem = ref<HardforkItem | null>(null);
</script>
