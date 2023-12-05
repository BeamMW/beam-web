<template>
  <div class="flex items-center gap-2">
    <slot name="icon" />
    <p class="flex-1 whitespace-wrap break-words text-ellipsis text-xs md:text-sm">
      <slot name="text" />
    </p>
  </div>
</template>
