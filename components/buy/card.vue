<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <LayoutLink
    class="group flex flex-col justify-center border rounded-xl bg-[rgb(11,31,64)]/50 hover:bg-[#042248] focus:bg-[#042248] border-black border-opacity-30 shadow-[0px_0px_0px_1px_rgba(255,255,255,.05)_inset] focus:outline-none focus:ring-2 focus:ring-beam-blue/75 focus:ring-offset-2 transition focus:ring-offset-[#042248]"
    :href="link"
  >
    <div class="p-4 md:p-5">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <Icon
            class="h-7 w-7 md:h-[2.375rem] md:w-[2.375rem] select-none"
            :name="`buy/${image}`"
            :as-image="true"
            :alt="title"
            loading="lazy"
          />
          <div>
            <h3
              class="font-bold text-white text-sm md:text-base opacity-90 group-hover:opacity-100 group-hover:text-beam-blue transition whitespace-nowrap"
            >
              {{ title }}
            </h3>
          </div>
        </div>
        <div>
          <Icon
            class="block w-3.5 h-3.5 text-white group-hover:text-beam-blue opacity-60 group-hover:opacity-100 transition rtl:rotate-180"
            name="layout/arrow-right"
          />
        </div>
      </div>
    </div>
  </LayoutLink>
</template>
