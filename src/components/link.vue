<template>
    <a :href="href" :class="[
        'font-family:var(--font-body)',
        'text-sm',
        'uppercase',
        'tracking-(--tracking-nav)',
        'transition-colors',
        'hover:text-(--color-accent)',
        { 'font-bold': cta }
    ]">
        <slot>{{ label }}</slot>
    </a>
</template>

<script setup lang="ts">
interface Props {
    href: string
    label?: string
    cta?: boolean
}

withDefaults(defineProps<Props>(), {
    label: '',
    cta: false
})
</script>
