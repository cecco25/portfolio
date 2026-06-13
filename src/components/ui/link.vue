<template>
  <a
    :href="href"
    :class="[
      'font-body',
      'text-sm',
      'uppercase',
      'tracking-widest',
      'transition-colors',
      'hover:text-primary',
      { 'text-muted': !cta },
      { 'font-bold': cta },
      { 'text-body-text': cta },
    ]"
  >
    <slot>{{ label }}</slot>
  </a>
</template>

<script setup lang="ts">
interface Props {
  href: string;
  label?: string;
  cta?: boolean;
}

withDefaults(defineProps<Props>(), {
  label: "",
  cta: false,
});
</script>
