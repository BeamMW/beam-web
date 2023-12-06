<template>
  <div class="carousel relative">
    <div
      ref="customNextButton"
      class="custom-next-button group absolute right-0 z-10 cursor-pointer bg-gradient-to-l from-[#041D3C] h-full w-24 lg:w-20 flex items-center justify-end"
    >
      <Icon
        class="block w-7 h-7 text-white group-hover:opacity-100 opacity-60 transition-opacity"
        name="layout/arrow-right"
      />
    </div>
    <div
      ref="customPrevButton"
      class="custom-prev-button group absolute left-0 z-10 cursor-pointer bg-gradient-to-r from-[#041D3C] h-full w-20 flex items-center justify-start"
    >
      <Icon
        class="block rotate-180 w-7 h-7 text-white group-hover:opacity-100 opacity-60 transition-opacity"
        name="layout/arrow-right"
      />
    </div>

    <swiper
      :slides-per-view="slidesToShow"
      :space-between="spaceBetween"
      :navigation="{
        nextEl: customNextButton,
        prevEl: customPrevButton,
      }"
      :loop="true"
      :autoplay="{ delay: 2500 }"
    >
      <SwiperSlide v-for="(item, index) in pressArticles" :key="index">
        <LayoutLink
          :to="item.href"
          class="carousel-item-link"
          :title="item.image"
        >
          <div class="carousel-item">
            <Icon
              :as-image="true"
              :name="`medias/${item.image}`"
              class="h-12 text-beam-blue w-auto"
              loading="lazy"
              :alt="item.image"
            />
          </div>
        </LayoutLink>
      </SwiperSlide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { pressArticles } from "@/app.config";
import { throttle } from "~/utils/throttle";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Autoplay]);

const slidesToShow = ref(1);
const customNextButton = ref(null);
const customPrevButton = ref(null);

const calculateSlidesToShow = () => {
  if (process.client) {
    const width = window.innerWidth;
    if (width >= 1280) {
      return 4;
    } else if (width >= 1024) {
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

const spaceBetween = ref(20);
</script>

<style scoped>
.carousel {
  @apply w-full;
  margin: 0 auto;
}

.carousel-item {
  @apply text-white flex items-center justify-center p-[1rem];
}
.carousel-item-link:deep(img) {
  @apply !opacity-60 transition-opacity;
}
.carousel-item-link:hover:deep(img) {
  @apply !opacity-100;
}
</style>
