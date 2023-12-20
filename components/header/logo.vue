<template>
  <LayoutLink
    ref="logoParent"
    :to="localePath('index')"
    :title="$t('header.nav.home')"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @touchend="touchRevertAnimation"
  >
    <div
      :class="`grid items-center justify-center h-10 w-10 transition-transform duration-[600ms] hover:will-change-transform select-none ${
        hover ? 'scale-125' : ''
      }`"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 57 40"
        alt="BEAM Logo"
        class="h-10 w-10 item-container -mt-0.5 z-50"
        :style="{
          gridColumn: 1,
          gridRow: 1,
        }"
      >
        <defs>
          <linearGradient id="x" x1="0%" x2="100%" y1="50%" y2="50%">
            <stop offset="0%" stop-color="#24C1FF" />
            <stop offset="48.99%" stop-color="#24C1FF" />
            <stop offset="49%" stop-color="#0B76FF" />
            <stop offset="100%" stop-color="#0B76FF" />
          </linearGradient>
          <linearGradient id="z" x1="0%" x2="100%" y1="50%" y2="50%">
            <stop offset="0%" stop-color="#6BFFFA" />
            <stop offset="49.99%" stop-color="#6BFFFA" />
            <stop offset="50%" stop-color="#00E2C2" />
            <stop offset="100%" stop-color="#00E2C2" />
          </linearGradient>
          <linearGradient id="aa" x1="0%" x2="54.8%" y1="50.2%" y2="50.2%">
            <stop offset="0%" stop-opacity="0" />
            <stop offset="100%" stop-color="#FFF" />
          </linearGradient>
          <linearGradient id="bb" x1="99.4%" x2="35.8%" y1="49.8%" y2="49.8%">
            <stop offset="0%" stop-opacity="0" />
            <stop offset="100%" stop-color="#FF51FF" />
          </linearGradient>
          <linearGradient id="cc" x1="100.4%" x2="48.9%" y1="50.1%" y2="50.1%">
            <stop offset="0%" stop-opacity="0" />
            <stop offset="100%" stop-color="#A18CFF" />
          </linearGradient>
          <linearGradient id="dd" x1="99.9%" x2="41.1%" y1="50.2%" y2="50.2%">
            <stop offset="0%" stop-opacity="0" />
            <stop offset="100%" stop-color="#AB38E6" />
          </linearGradient>
        </defs>
        <g fill="none">
          <path fill="url(#x)" d="M28 0L52 40H4L28 0Zm0 13L17 33h22L28 13Z" />
          <path fill="url(#z)" d="M28 18l8 13H21z" />
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
          <path id="ray1" class="ray" fill="url(#aa)" d="m0 13 28 13v1L0 21z" />
          <path id="ray2" class="ray" fill="url(#bb)" d="M57 9 28 26l29-12z" />
          <path id="ray3" class="ray" fill="url(#cc)" d="m57 25-29 2 29-7z" />
          <path
            id="ray4"
            class="ray"
            fill="url(#dd)"
            d="M57 14 28 26v1l29-7z"
          />
        </g>
      </svg>
      <Icon
        name="logo-bg"
        :class="`h-10 w-10 z-40 item-container scale-0 transition-transform duration-[600ms] ease-in-out will-change-transform ${
          hover ? 'scale-125 rotate-90 duration-[600ms]' : ''
        }`"
        :style="{
          gridColumn: 1,
          gridRow: 1,
        }"
        :as-image="true"
        loading="lazy"
        alt="Beam logo background"
      />
    </div>
  </LayoutLink>
</template>
<script lang="ts" setup>
const localePath = useLocalePath();

const maskCircle = ref<HTMLElement | null>(null);
const hover = ref(false);
const animation = ref<gsap.core.Tween | null>(null);

function touchRevertAnimation() {
  setTimeout(() => {
    hover.value = false;
  }, 1000);
}

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
  animation.value = gsap.to(maskCircle.value, {
    paused: true,
    attr: { r: 30 },
    duration: 0.6,
    ease: "linear",
  });
});
</script>
