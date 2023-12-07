<template>
  <div class="flex items-center gap-2">
    <div class="flex-1">
      <slot name="icon" />
    </div>
    <p class="text-xs md:text-sm w-full">
      <slot name="text" />
    </p>
  </div>
</template>
