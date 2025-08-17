import { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';
import tsConfigPaths from 'vite-tsconfig-paths';

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
			compilerOptions: {
				allowSyntheticDefaultImports: false,
				esModuleInterop: false,
			},
			propFilter: () => true,
		},
	},

	viteFinal: (config) => {
		config.plugins?.push(tsConfigPaths());

		return config;
	},
};

export default config;
