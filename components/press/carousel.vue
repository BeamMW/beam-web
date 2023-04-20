<template>
  <div class="carousel relative">
    <div
      ref="customNextButton"
      class="custom-next-button group absolute right-0 z-10 cursor-pointer bg-gradient-to-l from-[#041D3C] h-full w-24 lg:w-20 flex items-center justify-end"
    >
      <Icon
        class="block w-10 h-10 lg:-mr-5 text-white group-hover:opacity-100 opacity-60 transition-opacity"
        name="layout/arrow-right"
      />
    </div>
    <div
      ref="customPrevButton"
      class="custom-prev-button group absolute left-0 z-10 cursor-pointer bg-gradient-to-r from-[#041D3C] h-full w-20 flex items-center justify-start"
    >
      <Icon
        class="block rotate-180 w-10 h-10 lg:-ml-5 text-white group-hover:opacity-100 opacity-60 transition-opacity"
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
      class="custom-swiper"
      :loop="true"
      :autoplay="{ delay: 2500 }"
    >
      <swiper-slide v-for="(item, index) in pressArticles" :key="index">
        <NuxtLink :to="item.href" class="carousel-item-link" target="_blank">
          <div class="carousel-item">
            <Icon
              :as-image="true"
              :name="`medias/${item.image}`"
              class="select-none pointer-events-none h-12 text-beam-blue w-fit"
              :lazy="true"
            />
          </div>
        </NuxtLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Navigation, Autoplay } from "swiper/core";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { pressArticles } from "@/app.config";
import { throttle } from "~/utils/throttle";

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

<style lang="postcss" scoped>
.carousel {
  width: 100%;
  margin: 0 auto;
}

.carousel-item {
  @apply text-black flex items-center justify-center;
  padding: 1rem;
}
.carousel-item-link:deep(img) {
  @apply !opacity-60 transition-opacity;
}
.carousel-item-link:hover:deep(img) {
  @apply !opacity-100;
}
</style>

<style lang="postcss">
@import "swiper/swiper-bundle.min.css";
</style>
