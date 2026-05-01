<template>
  <div
    ref="scrollSpyContainer"
    class="flex flex-col-reverse max-w-7xl mx-auto pb-10 pt-40 md:pt-44 overflow-x-visible overflow-y-visible lg:grid lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8"
  >
    <!-- Main Content -->
    <article class="lg:col-span-3 px-4">
      <div>
        <!-- Post Header -->
        <header class="mb-8">
          <div class="flex items-center space-x-2 mb-4">
            <span
              v-if="post.category"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-300"
            >
              {{ categoryLabel(post.category) }}
            </span>
            <span class="text-sm text-purple-100/60">
              {{ formatDate(post.date) }}
            </span>
            <span class="text-sm text-purple-100/60">•</span>
            <span class="text-sm text-purple-100/60">
              {{ $t("blog.readingTime", { minutes }) }}
            </span>
          </div>

          <h1
            class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          >
            {{ post.title }}
          </h1>

          <p v-if="post.description" class="text-lg text-purple-100/80 mb-6">
            {{ post.description }}
          </p>

          <!-- Featured Image -->
          <div v-if="post.image" class="mt-8 mb-10 rounded-xl overflow-hidden">
            <img
              :src="post.image"
              :alt="post.title"
              loading="lazy"
              decoding="async"
              class="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        </header>

        <!-- Post Content -->
        <div class="prose prose-invert max-w-none">
          <ContentRenderer :value="post" class="blog-content" />
        </div>

        <!-- Post Footer -->
        <footer class="mt-12 pt-8 border-t border-purple-100/10">
          <!-- Tags -->
          <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mb-8">
            <span
              v-for="(tag, index) in post.tags"
              :key="index"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/20 text-purple-300"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Back to Blog -->
          <div class="flex justify-between items-center pt-6">
            <LayoutLink
              :to="localePath('/blog')"
              class="inline-flex items-center transition-colors group"
            >
              <Icon
                name="layout/arrow-right"
                class="w-4 h-4 mr-2 rotate-180 transition-transform group-hover:-translate-x-1"
              />
              {{ $t("blog.backToBlog") }}
            </LayoutLink>

            <!-- Share Buttons -->
            <div class="flex items-center space-x-2">
              <span class="text-sm text-purple-100/60">{{
                $t("blog.share")
              }}</span>
              <a
                :href="`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(post.title ?? '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 text-white/50 hover:text-white transition-colors"
                aria-label="Share on Twitter"
              >
                <Icon name="social/x" class="w-5 h-5 block" />
              </a>
              <a
                :href="`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 text-white/50 hover:text-white transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Icon name="social/linkedin" class="w-5 h-5 block" />
              </a>
              <button
                class="p-2 text-white/50 hover:text-white transition-colors"
                :aria-label="copied ? $t('blog.copied') : $t('blog.copyLink')"
                @click="copyToClipboard"
              >
                <Icon
                  :name="copied ? 'layout/check' : 'layout/copy'"
                  class="w-5 h-5 block"
                />
              </button>
            </div>
          </div>
        </footer>
      </div>

      <!-- Related Posts -->
      <div v-if="relatedPosts.length > 0" class="mt-12">
        <h2 class="text-2xl font-bold text-white mb-6">
          {{ $t("blog.relatedPosts") }}
        </h2>
        <div class="grid gap-6 md:grid-cols-2">
          <BlogPostCard
            v-for="relatedPost in relatedPosts"
            :key="relatedPost._path"
            :post="relatedPost"
          />
        </div>
      </div>
    </article>

    <!-- Sidebar -->
    <aside class="lg:col-span-1">
      <!-- Back to Blog button -->
      <LayoutLink
        class="stick capitalize group font-bold hidden lg:block mcontainer py-4 mb-4 text-purple-100/50 hover:text-purple-100/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#360061] h-auto focus:ring-beam-purple hover:!bg-[#360061]"
        :to="localePath('/blog')"
      >
        <div class="justify-center items-center gap-2 flex">
          <Icon
            class="ltr:rotate-180 block w-3 h-3 text-purple-100 group-hover:opacity-100 opacity-60 transition-opacity"
            name="layout/arrow-right"
          />
          {{ $t("blog.backToBlog") }}
        </div>
      </LayoutLink>

      <!-- TOC Summary -->
      <section v-if="post.body?.toc?.links?.length" class="stick">
        <LayoutDropdown
          :always-show="true"
          :lock="false"
          custom-class="inline-block lg:block"
        >
          <template #dropdown-button>
            <button
              type="button"
              class="inline-flex border-b !mx-4 rounded-full border-white px-6 border-opacity-10 lg:hidden py-3 font-bold justify-center items-center gap-2 uppercase bg-[#290048] hover:bg-[#360061] text-purple-100/50 hover:text-purple-100/90 h-auto"
            >
              {{ $t("blog.tableOfContents") }}
              <Icon class="rotate-90 block w-3 h-3" name="layout/arrow-right" />
            </button>
          </template>
          <template #dropdown-content>
            <div
              class="py-4 lg:h-[82vh] lg:overflow-y-scroll lg:overflow-x-hidden lg:pb-16 mcontainer"
            >
              <section class="py-4 lg:pt-0 rounded-xl">
                <h6>{{ $t("blog.tableOfContents") }}</h6>
                <ul
                  v-for="(link, index) in post.body.toc.links"
                  :key="index"
                  class="list-none ltr:ml-3 rtl:mr-3"
                >
                  <DocsTocLink
                    :link="link"
                    :article-path="localePath(post._path ?? '')"
                  />
                </ul>
              </section>
            </div>
          </template>
        </LayoutDropdown>
      </section>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import type { ParsedContent } from "@nuxt/content/dist/runtime/types/index";
import { readingTimeMinutes } from "~/utils/readingTime";

const localePath = useLocalePath();
const config = useRuntimeConfig();
const { t, te, locale } = useI18n();

const props = defineProps({
  routeName: {
    type: String,
    required: true,
  },
});

// Get current post

const nuxtApp = useNuxtApp();
const { data: postData } = await useAsyncData(
  `blog-${props.routeName}`,
  () => queryContent(props.routeName).findOne(),
  {
    getCachedData: (key) =>
      nuxtApp.isHydrating ? nuxtApp.payload.data[key] : undefined,
  },
);

if (!postData.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

const post = postData as Ref<ParsedContent>;

const minutes = computed(() => readingTimeMinutes(post.value?.body));

const categoryLabel = (slug: string) => {
  const key = `blog.categories.${slug}`;
  return te(key) ? t(key) : slug;
};

// Get all posts for related posts and categories
const { data: allPosts } = await useAsyncData(
  `blog-posts-${props.routeName}`,
  () => {
    return queryContent("/blog")
      .where({ _path: { $ne: props.routeName }, date: { $exists: true } })
      .sort({ date: -1 })
      .find();
  },
  {
    getCachedData: (key) =>
      nuxtApp.isHydrating ? nuxtApp.payload.data[key] : undefined,
  },
);

// Get related posts (first 2 posts from the same category)
const relatedPosts = computed(() => {
  if (!post.value?.category || !allPosts.value) return [];
  return allPosts.value
    .filter((p: ParsedContent) => p.category === post.value!.category)
    .slice(0, 2);
});

// Generate share URL
const shareUrl = computed(() => {
  return `${config.public.siteUrl}${post.value?._path}`;
});

// Scroll spy
const scrollSpyContainer = ref<HTMLElement | null>(null);
const scrollSpy = useScrollSpy();
scrollSpy({
  target: scrollSpyContainer,
  activeClass: "navigation-selected",
  offset: 200,
});

// Copy to clipboard
const copied = ref(false);
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    // Clipboard API unavailable (non-HTTPS or permissions denied) — fail silently
  }
};

// Set SEO meta tags
useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
  ogTitle: post.value?.title,
  ogDescription: post.value?.description,
  ogImage: post.value?.image,
  ogUrl: shareUrl,
  twitterCard: "summary_large_image",
  twitterTitle: post.value?.title,
  twitterDescription: post.value?.description,
  twitterImage: post.value?.image,
});

// Helper function to format dates
const formatDate = (date: string) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString(locale.value, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Add structured data for SEO
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.value?.title,
        description: post.value?.description,
        image: [post.value?.image],
        datePublished: post.value?.date,
        dateModified: post.value?.updatedAt || post.value?.date,
        author: {
          "@type": "Organization",
          name: "Beam",
          url: config.public.siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "Beam",
          logo: {
            "@type": "ImageObject",
            url: `${config.public.siteUrl}/images/beam-logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": shareUrl.value,
        },
      }),
    },
  ],
});
</script>

<style scoped>
/* Typography */
.prose {
  @apply text-purple-100/90 leading-relaxed text-lg md:text-xl;
}

.prose :deep(h1) {
  @apply text-4xl md:text-5xl font-bold text-white mt-12 mb-6 leading-tight;
}

.prose :deep(h2) {
  @apply text-3xl md:text-4xl font-bold text-white mt-12 mb-4 pt-8 border-t border-purple-100/10;
  scroll-margin-top: 6rem;
}

.prose :deep(h3) {
  @apply text-2xl md:text-3xl font-bold text-white mt-10 mb-3;
  scroll-margin-top: 6rem;
}

.prose :deep(h4) {
  @apply text-xl md:text-2xl font-semibold text-white mt-8 mb-2;
}

.prose :deep(a) {
  @apply text-beam-blue transition-colors font-medium;
  text-underline-offset: 3px;
}

.prose :deep(a:hover) {
  opacity: 0.8;
}

.prose :deep(ul) {
  @apply list-disc pl-5 space-y-2 my-6;
}

.prose :deep(ol) {
  @apply list-decimal pl-5 space-y-2 my-6;
}

.prose :deep(li) {
  @apply my-2;
}

.prose :deep(p) {
  @apply my-6 leading-relaxed;
}

.prose :deep(img) {
  @apply rounded-xl my-8 w-full h-auto shadow-lg;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-beam-blue pl-6 py-2 my-6 bg-purple-900/20 rounded-r-lg italic text-purple-100/90;
}

.prose :deep(pre) {
  @apply bg-[#0f0a1a] rounded-xl p-4 my-6 overflow-x-auto border border-purple-100/10;
}

.prose :deep(code) {
  @apply text-purple-100/90 font-mono text-sm;
}

.prose :deep(table) {
  @apply w-full my-6 border-collapse;
}

.prose :deep(th) {
  @apply bg-purple-900/30 text-left py-3 px-4 font-semibold text-purple-100 border-b border-purple-100/10;
}

.prose :deep(td) {
  @apply py-3 px-4 border-b border-purple-100/5;
}

.prose :deep(tr:last-child td) {
  @apply border-b-0;
}

/* Sidebar styles (docs-style) */
h6 {
  @apply font-bold text-xs sm:text-base uppercase text-gray-200 mb-2 ltr:pl-4 rtl:pl-4;
}

aside .mcontainer {
  @apply border rounded-xl border-black border-opacity-30 transition shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset] bg-[#290048];
}

aside .stick {
  @apply lg:sticky lg:h-auto lg:top-32 lg:self-start;
}

aside :deep(a.navigation-selected) {
  @apply text-beam-blue hover:text-beam-blue;
}
</style>
