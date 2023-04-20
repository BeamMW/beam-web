<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();

const props = defineProps({
  tKey: {
    type: String,
    required: true,
  },
  tInterpolation: {
    type: Object,
    required: false,
    default: () => {},
  },
});

const divRef = ref(null);

onMounted(() => {
  const el = divRef.value;
  if (!el) return;

  el.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "A") {
      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");
      const router = useRouter();

      if (href && href[0] === "/" && targetAttr !== "_blank") {
        event.preventDefault();
        router.push(href);
      }
    }
  });
});

async function renderMarkdown(text) {
  const MarkdownIt = (await import("markdown-it")).default;
  const md = new MarkdownIt({ breaks: true });

  // Renderer rule for opening links
  md.renderer.rules.link_open = (tokens, idx, options, _env, self) => {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex("href");
    const href = token.attrs[hrefIndex][1];

    if (href.startsWith("#")) {
      return self.renderToken(tokens, idx, options);
    }

    if (href.startsWith("/")) {
      token.attrs[hrefIndex][1] = localePath(href);
    } else if (!href.startsWith("mailto:")) {
      token.attrSet("target", "_blank");
      token.attrSet("rel", "noreferrer noopener");
    }

    return self.renderToken(tokens, idx, options);
  };

  return { content: md.renderInline(text) };
}

const { data, pending } = await useAsyncData(
  `${props.tKey}${JSON.stringify(props.tInterpolation)}`,
  async () => await renderMarkdown(t(props.tKey, props.tInterpolation))
);
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span v-if="!pending" ref="divRef" v-html="data.content"></span>
</template>

<style lang="postcss" scoped>
span:deep(a) {
  @apply transition-opacity cursor-pointer text-beam-blue hover:underline underline-offset-4;
}
</style>
