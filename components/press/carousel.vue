<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
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

<template>
  <div class="carousel relative">
    <div ref="customNextButton" class="group custom-swipe-arrow next-button">
      <Icon
        class="block w-4 h-4 md:w-6 md:h-6 text-beam-blue group-hover:opacity-100 opacity-60 transition-opacity"
        name="layout/arrow-right"
      />
    </div>
    <div ref="customPrevButton" class="group custom-swipe-arrow prev-button">
      <Icon
        class="block rotate-180 w-4 h-4 md:w-6 md:h-6 text-beam-blue group-hover:opacity-100 opacity-60 transition-opacity"
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
              class="w-48 h-20"
              loading="lazy"
              :alt="item.image"
            />
          </div>
        </LayoutLink>
      </SwiperSlide>
    </swiper>
  </div>
</template>

<style scoped>
.carousel {
  @apply w-full;
  margin: 0 auto;
}

.carousel-item {
  @apply text-white flex items-center justify-center;
}
.carousel-item-link:deep(img) {
  @apply !opacity-60 transition-opacity;
}
.carousel-item-link:hover:deep(img) {
  @apply !opacity-100;
}
</style>
