<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { nextTick } from "vue";
import { throttle } from "~/utils/throttle";

const { t } = useI18n();

const announcementContainer = ref();
const announcementRef = ref<HTMLElement | null>(null);

const announcementMessage = computed(() => t("header.announcement"));

const showMessage = ref(false);
const storageKey = "announcementMessageHash";

const hashCode = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return h;
};

const updateHeight = throttle(() => {
  if (showMessage.value && announcementRef.value) {
    enter(announcementContainer.value);
  }
}, 150);

onMounted(() => {
  const messageHash = localStorage.getItem(storageKey);
  showMessage.value =
    messageHash !== hashCode(announcementMessage.value).toString();

  window.addEventListener("resize", updateHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateHeight);
});

const dismissMessage = () => {
  showMessage.value = false;
  localStorage.setItem(
    storageKey,
    hashCode(announcementMessage.value).toString()
  );
};

const beforeEnter = (el: HTMLElement) => {
  el.style.height = "0";
};

const enter = async (el: HTMLElement) => {
  await nextTick();
  el.style.transition = "height 0.3s ease-in-out, opacity 0.3s ease-in-out";
  if (announcementRef.value) {
    el.style.height = `${announcementRef.value.offsetHeight}px`;
  }
};

const beforeLeave = (el: HTMLElement) => {
  if (announcementRef.value) {
    el.style.height = `${announcementRef.value.offsetHeight}px`;
  }
};

const leave = (el: HTMLElement) => {
  el.style.transition = "height 0.3s ease-in-out, opacity 0.3s ease-in-out";
  el.style.height = "0";
};
</script>
<template>
  <transition
    name="height-transition"
    @before-enter="beforeEnter"
    @enter="enter"
    @before-leave="beforeLeave"
    @leave="leave"
  >
    <div
      v-show="announcementMessage && showMessage"
      ref="announcementContainer"
      class="overflow-hidden will-change-auto"
    >
      <div ref="announcementRef" class="bg-transparent h-auto">
        <div class="max-w-screen-xl mx-auto">
          <div
            class="flex items-center border-[rgba(255,255,255,.05)] border-b md:p-4 p-2"
          >
            <p
              class="font-bold text-xs md:text-sm text-white/90 flex items-center gap-3"
            >
              <MarkdownRenderer
                class="colorLinks"
                t-key="header.announcement"
              />
            </p>
            <div class="ml-auto">
              <button
                type="button"
                class="inline-flex rounded-md p-1.5 text-white/80 transition-colors hover:text-white/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#042548] focus:ring-[#042548]"
                @click="dismissMessage"
              >
                <span class="sr-only">Dismiss</span>
                <Icon
                  extend-class="w-4 h-4 block"
                  name="layout/close"
                  :lazy="false"
                  :as-image="false"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="postcss" scoped>
.height-transition-enter-active,
.height-transition-leave-active {
  transition-property: height, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  overflow-y: hidden;
}
.height-transition-enter,
.height-transition-leave-to {
  opacity: 0;
}
</style>
