<template>
    <a :href="href" :class="[
        'font-family:var(--font-body)',
        'text-sm',
        'uppercase',
        'tracking-(--tracking-nav)',
        'transition-colors',
        'hover:text-(--color-accent)',
        { 'text-(--text-muted)': !cta },
        { 'font-bold': cta },
        { 'text-(--text-color)': cta }
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
