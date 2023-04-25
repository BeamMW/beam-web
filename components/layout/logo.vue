<template>
  <LayoutLink
    :to="localePath('index')"
    class="group"
    title="Homepage"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div
      class="grid items-center justify-center h-10 w-10 group-hover:scale-125 transition-transform duration-[600ms]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 57 40"
        alt="Beam logo"
        class="h-full w-full item-container z-50 -mt-0.5"
      >
        <defs>
          <linearGradient id="a" x1="0%" x2="54.8%" y1="50.2%" y2="50.2%">
            <stop offset="0%" stop-opacity="0" />
            <stop offset="100%" stop-color="#FFF" />
          </linearGradient>
          <linearGradient id="b" x1="99.4%" x2="35.8%" y1="49.8%" y2="49.8%">
            <stop offset="0%" stop-opacity="0" />
            <stop offset="100%" stop-color="#FF51FF" />
          </linearGradient>
          <linearGradient id="c" x1="100.4%" x2="48.9%" y1="50.1%" y2="50.1%">
            <stop offset="0%" stop-opacity="0" />
            <stop offset="100%" stop-color="#A18CFF" />
          </linearGradient>
          <linearGradient id="d" x1="99.9%" x2="41.1%" y1="50.2%" y2="50.2%">
            <stop offset="0%" stop-opacity="0" />
            <stop offset="100%" stop-color="#AB38E6" />
          </linearGradient>
        </defs>
        <g fill="none">
          <path fill="#0B76FF" d="M28 33h12L28 13V0l24 40H28z" />
          <path fill="#24C1FF" d="M28 33H17l11-20V0L5 40h23z" />
          <path fill="#39FFF2" d="M28 18v13h-7z" />
          <path fill="#00E2C2" d="M28 18v13h8z" />
          <mask id="raysMask">
            <rect width="100%" height="100%" fill="white" />
            <circle
              id="maskCircle"
              ref="maskCircle"
              cx="28.5"
              cy="20"
              r="0"
              fill="black"
            />
          </mask>
        </g>
        <g fill="none" mask="url(#raysMask)">
          <path id="ray1" class="ray" fill="url(#a)" d="m0 13 28 13v1L0 21z" />
          <path id="ray2" class="ray" fill="url(#b)" d="M57 9 28 26l29-12z" />
          <path id="ray3" class="ray" fill="url(#c)" d="m57 25-29 2 29-7z" />
          <path id="ray4" class="ray" fill="url(#d)" d="M57 14 28 26v1l29-7z" />
        </g>
      </svg>
      <Icon
        name="logo-bg"
        class="h-full w-full item-container scale-0 group-hover:scale-125 group-hover:rotate-90 transition-transform duration-[600ms] group-hover:duration-[600ms] ease-in-out z-40"
        :as-image="true"
        alt="Beam logo background"
      />
    </div>
  </LayoutLink>
</template>
<script lang="ts" setup>
const localePath = useLocalePath();
const maskCircle = ref<HTMLElement | null>(null);
const hover = ref(false);
let animation = ref<any>(null);

watchEffect(() => {
  if (animation.value) {
    if (hover.value) {
      animation.value.play();
    } else {
      animation.value.reverse();
    }
  }
});

onMounted(async () => {
  const { gsap } = await import("gsap");
  //const maskCircle = document.getElementById("maskCircle");
  animation.value = gsap.to(maskCircle.value, {
    paused: true,
    attr: { r: 30 },
    duration: 0.6,
    ease: "linear",
  });
});
</script>
<style lang="postcss" scoped>
.item-container {
  @apply select-none object-cover;
  grid-row: 1;
  grid-column: 1;
}
</style>
