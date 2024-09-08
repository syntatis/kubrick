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
			},
			customCss: ['./src/styles/tailwind.css', './src/styles/starlight.scss'],
			expressiveCode: {
				plugins: [pluginCollapsibleSections()],

				styleOverrides: {
					borderRadius: 'var(--border-radius-sm)',
					frames: {
						editorTabBarBackground: 'var(--sl-color-gray-1)',
						frameBoxShadowCssValue: '0 1px 1px rgba(0, 0, 0, 0.04)',
						terminalBackground: 'var(--sl-color-gray-1)',
						terminalTitlebarBackground: 'var(--sl-color-gray-2)',
					},
					textMarkers: {
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
				discord: 'https://discord.gg/#',
				github: 'https://github.com/syntatis/kubrick',
			},
			title: 'Kubrick',
		}),
		tailwind(),
		react(),
	],
});
