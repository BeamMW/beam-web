<script lang="ts" setup>
defineProps({
  isNextStep: {
    type: Boolean,
    required: false,
  },
});

function createFaq(number: number) {
  return {
    title: `faq.${number}.question`,
    content: `faq.${number}.answer`,
  };
}

const faqEntries = 7;
const faqs = Array.from({ length: faqEntries }, (_, i) => createFaq(i + 1));
</script>

<template>
  <section
    class="mt-6 md:mt-10 border-black border rounded-xl p-7 bg-[#042248] border-opacity-30 shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset] col-span-1 flex flex-col"
  >
    <div class="grid gap-4 lg:gap-0 md:grid-cols-7">
      <div class="md:col-span-2">
        <div class="max-w-xs">
          <h2
            class="text-xl font-bold md:text-2xl md:leading-tight text-white capitalize"
          >
            <MarkdownRenderer t-key="faq.title" />
          </h2>
          <p class="mt-2 hidden md:block text-white/70">
            <MarkdownRenderer t-key="faq.description" />
          </p>
        </div>
      </div>

      <div class="md:col-span-5">
        <div class="hs-accordion-group flex flex-col gap-6">
          <FaqAccordion :items="faqs" :is-next-step="isNextStep" />
        </div>
      </div>
    </div>
  </section>
</template>
