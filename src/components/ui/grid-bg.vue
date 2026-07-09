<template>
  <div class="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>
  <div
    class="pointer-events-none absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]"
    aria-hidden="true"
  ></div>
  <div
    class="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
    aria-hidden="true"
  ></div>

  <div class="pointer-events-none absolute inset-4 sm:inset-6" aria-hidden="true">
    <span class="border-body-text/20 absolute top-0 left-0 h-4 w-4 border-t border-l"></span>
    <span class="border-body-text/20 absolute top-0 right-0 h-4 w-4 border-t border-r"></span>
    <span class="border-body-text/20 absolute bottom-0 left-0 h-4 w-4 border-b border-l"></span>
    <span class="border-body-text/20 absolute right-0 bottom-0 h-4 w-4 border-r border-b"></span>
  </div>
</template>
