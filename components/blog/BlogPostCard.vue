<template>
  <NuxtLink
    :to="localePath(post._path ?? '/blog')"
    class="group block h-full bg-[#1A0A2A] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1"
  >
    <div class="aspect-w-16 aspect-h-9 overflow-hidden">
      <img
        v-if="post.image"
        :src="post.image"
        :alt="post.title"
        loading="lazy"
        decoding="async"
        class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        v-else
        class="w-full h-48 bg-gradient-to-br from-purple-900/50 to-purple-500/20"
      />
    </div>

    <div class="p-6">
      <div class="flex items-center text-xs text-purple-100/50 mb-3">
        <span>{{ formatDate(post.date) }}</span>
        <span class="mx-2">•</span>
        <span>{{ $t("blog.readingTime", { minutes }) }}</span>
      </div>

      <h3
        class="text-xl font-bold text-white mb-2 group-hover:text-beam-blue transition-colors line-clamp-2"
      >
        {{ post.title }}
      </h3>

      <p class="text-purple-100/70 text-sm mb-4 line-clamp-3">
        {{ post.description }}
      </p>

      <div
        class="flex items-center text-sm text-beam-blue group-hover:underline"
      >
        <span>{{ $t("blog.readMore") }}</span>
        <Icon
          name="layout/arrow-right"
          class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { ParsedContent } from "@nuxt/content/dist/runtime/types/index";
import { readingTimeMinutes } from "~/utils/readingTime";

const props = defineProps<{
  post: ParsedContent;
}>();

const localePath = useLocalePath();
const { locale } = useI18n();

const minutes = computed(() => readingTimeMinutes(props.post.body));

const formatDate = (date: string) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString(locale.value, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
