<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});

const modal = ref();

function openModal() {
  modal.value.show();
}
</script>
<template>
  <div class="inline">
    <LayoutAnimatedModal ref="modal" :title="title">
      <div class="divide-solid divide-white/10 divide-y flex flex-col gap-3">
        <slot />
      </div>
    </LayoutAnimatedModal>

    <button
      type="button"
      class="hover:text-white transition-colors border-b border-white/70 hover:border-white"
      @click="openModal"
    >
      {{ $t("downloads.detailslink") }}
    </button>
  </div>
</template>
