import { withThemeByClassName } from '@storybook/addon-themes';
import { Decorator, Preview } from '@storybook/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react';
import './preview.scss';

const DEFAULT_THEME = 'modern';
const ThemeDecorator: Decorator = (Story, context) => {
	const id = context.id;
	const viewMode = context?.viewMode;
	const theme = context?.globals.theme || DEFAULT_THEME;

	useEffect(() => {
		if (viewMode === 'docs') {
			const selector = `#anchor--${id} .docs-story`;

			document.querySelectorAll(selector).forEach((el) => {
				if (el instanceof HTMLElement) {
					el.classList.add('__wp-core-body__');
				}
			});
		}
	}, [viewMode, id, theme]);

	return (
		<div className="wp-core-ui" style={{ maxWidth: '50vw', width: '100%' }}>
			<Story {...context} />
		</div>
	);
};
const preview: Preview = {
	decorators: [
		withThemeByClassName({
			defaultTheme: DEFAULT_THEME,
			themes: {
				blue: 'admin-color-blue',
				coffee: 'admin-color-coffee',
				default: 'admin-color-default',
				ectoplasm: 'admin-color-ectoplasm',
				light: 'admin-color-light',
				midnight: 'admin-color-midnight',
				modern: 'admin-color-modern',
				ocean: 'admin-color-ocean',
				sunrise: 'admin-color-sunrise',
			},
		}),
		ThemeDecorator,
	],
	parameters: {
		actions: {
			argTypesRegex: '^on[A-Z].*',
		},
		backgrounds: {
			disable: true,
		},
		controls: {
			expanded: true,
			hideNoControlsWarning: true,
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
			sort: 'requiredFirst',
		},
		options: {
			storySort: {
				method: 'alphabetical',
			},
		},
	},
};

export default preview;
