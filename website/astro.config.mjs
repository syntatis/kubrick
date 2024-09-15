import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { defineConfig } from 'astro/config';

export default defineConfig({
	integrations: [
		starlight({
			components: {
				Header: './src/templates/Header.astro',
				Sidebar: './src/content/templates/Sidebar.astro',
			},
			customCss: [
				'./src/styles/tailwind.css',
				'./src/styles/variables.scss',
				'./src/styles/starlight.scss',
				'./src/styles/pagefind.scss'
			],
			expressiveCode: {
				plugins: [pluginCollapsibleSections()],
				styleOverrides: {
					borderRadius: 'var(--border-radius-sm)',
					borderColor: 'var(--sl-color-gray-2)',
					collapsibleSections: {
						closedBackgroundColor: 'var(--sl-color-accent-low)',
					},
					frames: {
						editorTabBarBackground: 'var(--sl-color-gray-1)',
						frameBoxShadowCssValue: '0 1px 1px rgba(0, 0, 0, 0.04)',
						terminalBackground: 'var(--sl-color-gray-1)',
						terminalTitlebarBackground: 'var(--sl-color-gray-2)',
					},
					textMarkers: {
						lineMarkerAccentWidth: '0.25rem',
						markBackground: 'var(--sl-color-yellow-low)',
						markBorderColor: 'var(--sl-color-yellow)',
					},
				},
				themes: ['light-plus'],
			},
			sidebar: [
				{
					items: [
						{
							label: 'Overview',
							slug: 'guides/overview',
						},
						{
							label: 'Installation',
							slug: 'guides/installation',
						},
						{
							label: 'Styles',
							slug: 'guides/styles',
						},
						{
							label: 'Icons',
							slug: 'guides/icons',
						},
						{
							label: 'Previews',
							link: 'guides/previews',
						},
						{
							label: 'Examples',
							link: 'guides/examples',
						},
					],
					label: 'Guides',
				},
				{
					autogenerate: { directory: 'components' },
					label: 'Components',
				},
			],
			social: {
				discord: 'https://discord.com/channels/1190360462932574329/1284775092974522412',
				github: 'https://github.com/syntatis/kubrick',
			},
			title: 'Kubrick',
		}),
		tailwind(),
		react(),
	],
});
