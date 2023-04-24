<template>
  <div class="pb-2.5">
    <h6
      class="pb-2 md:pb-0 md:pt-0 md:px-0 font-bold text-xs sm:text-base uppercase text-gray-200"
    >
      {{ menu.title }}
    </h6>
    <ul class="flex flex-col pt-1.5">
      <li v-for="(link, indexL) in menu.links" :key="indexL">
        <LayoutLink
          :to="link.href"
          :class="`mb-1 inline-block capitalize transition text-white/70 hover:text-white ${
            link.class ? link.class : ''
          }`"
          >{{ link.text }}</LayoutLink
        >
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
});
</script>
