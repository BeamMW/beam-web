<template>
  <div class="nuxt-loading-indicator" :style="indicatorStyle"></div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, onBeforeUnmount, ref } from "vue";
import { useNuxtApp } from "#app/nuxt";

const props = defineComponent({
  props: {
    throttle: { type: Number, default: 200 },
    duration: { type: Number, default: 2000 },
    height: { type: Number, default: 3 },
    color: {
      type: [String, Boolean],
      default:
        "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)",
    },
  },
});

const indicator = useLoadingIndicator({
  duration: props.duration,
  throttle: props.throttle,
});

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:start", indicator.start);
nuxtApp.hook("page:finish", indicator.finish);

const indicatorStyle = computed(() => ({
  height: `${props.height}px`,
  opacity: indicator.isLoading.value ? 1 : 0,
  background: props.color || undefined,
  backgroundSize: `${(100 / indicator.progress.value) * 100}% auto`,
  transform: `scaleX(${indicator.progress.value}%)`,
  transition: "transform 0.1s, height 0.4s, opacity 0.4s",
}));

function useLoadingIndicator(opts: { duration: number; throttle: number }) {
  const progress = ref(0);
  const isLoading = ref(false);
  const step = computed(() => 10000 / opts.duration);

  const _timer = ref<NodeJS.Timeout | null>(null);
  const _throttle = ref<NodeJS.Timeout | null>(null);

  function start() {
    clear();
    progress.value = 0;
    if (opts.throttle) {
      _throttle.value = setTimeout(() => {
        isLoading.value = true;
        _startTimer();
      }, opts.throttle);
    } else {
      isLoading.value = true;
      _startTimer();
    }
  }

  function finish() {
    progress.value = 100;
    _hide();
  }

  function clear() {
    if (_timer.value) clearTimeout(_timer.value);
    if (_throttle.value) clearTimeout(_throttle.value);
    _timer.value = null;
    _throttle.value = null;
  }

  function _increase(num: number) {
    progress.value = Math.min(100, progress.value + num);
  }

  function _hide() {
    clear();
    setTimeout(() => {
      isLoading.value = false;
      setTimeout(() => {
        progress.value = 0;
      }, 400);
    }, 500);
  }

  function _startTimer() {
    _timer.value = setInterval(() => {
      _increase(step.value);
    }, 100);
  }

  onBeforeUnmount(clear);

  return {
    progress,
    isLoading,
    start,
    finish,
    clear,
  };
}
</script>

<style lang="postcss" scoped>
.nuxt-loading-indicator {
  @apply fixed top-0 left-0 right-0 pointer-events-none z-50;
  @apply transform origin-left;
}
</style>
