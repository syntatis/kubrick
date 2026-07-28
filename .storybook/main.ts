import { StorybookConfig } from '@storybook/react-vite';
import { createRequire } from 'node:module';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
	addons: [
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-themes'),
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-docs'),
	],

	core: {},

	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},

	staticDirs: ['../wordpress'],
	stories: ['../packages/kubrick/src/**/*.stories.@(ts|tsx)'],

	typescript: {
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			include: ['**/*.stories.tsx'],
			propFilter: () => true,
		},
	},

	viteFinal: (config) => {
		config.resolve = {
			...config.resolve,
			tsconfigPaths: true,
		};

		return config;
	},
};

export default config;
