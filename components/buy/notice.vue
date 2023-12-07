<template>
  <div class="flex items-center gap-2">
    <div class="flex-1 flex items-center">
      <slot name="icon" />
    </div>
    <p class="text-xs md:text-sm w-full break-words">
      <slot name="text" />
    </p>
  </div>
</template>
