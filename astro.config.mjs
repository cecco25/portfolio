// @ts-check
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://cecco25.vercel.app',
	integrations: [vue(), sitemap()],

	vite: {
		plugins: [tailwindcss()],
	},
});