<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { nextTick } from "vue";
import { throttle } from "~/utils/throttle";

const environmentGetter = await useEnvironmentGetter();
const { t } = useI18n();

const announcementContainer = ref();
const announcementRef = ref<HTMLElement | null>(null);
const announcementMessage = computed(() => t("header.announcement"));
const announcementMessageDev = computed(() => t("header.announcementdev"));

const props = defineProps({
  canClose: {
    type: Boolean,
    default: true,
  },
});

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
  if (props.canClose) {
    const messageHash = localStorage.getItem(storageKey);
    showMessage.value =
      messageHash !== hashCode(announcementMessage.value).toString();
  } else {
    showMessage.value = true;
  }

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
      v-show="showMessage"
      ref="announcementContainer"
      class="overflow-hidden will-change-auto"
    >
      <div
        ref="announcementRef"
        class="bg-transparent h-auto border-[rgba(255,255,255,.08)] border-b"
      >
        <div class="max-w-screen-xl mx-auto">
          <div class="flex items-center p-3 md:p-4">
            <p
              class="font-bold text-xs md:text-sm text-white/90 flex items-center gap-3"
            >
              <MarkdownRenderer
                :key="
                  environmentGetter.isDappnet
                    ? announcementMessageDev
                    : announcementMessage
                "
                class="colorLinks"
                :t-key="
                  environmentGetter.isDappnet
                    ? 'header.announcementdev'
                    : 'header.announcement'
                "
              />
            </p>
            <div v-if="canClose" class="rtl:mr-auto ltr:ml-auto">
              <button
                type="button"
                class="inline-flex rounded-md p-1.5 text-white/80 transition-colors hover:text-white/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#042548] focus:ring-[#042548]"
                @click="dismissMessage"
              >
                <span class="sr-only">Dismiss</span>
                <Icon
                  class="w-4 h-4 block"
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
