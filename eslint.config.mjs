import config from '@syntatis/eslint-config';
import storybook from 'eslint-plugin-storybook';

export default [
	{
		ignores: [
			'**/coverage',
			'**/dist',
			'**/node_modules',
			'**/storybook-static',
			'**/temp',
			'**/tmp',
			'**/wordpress',
			'!**/.storybook',
		],
	},
	...config,
	...storybook.configs['flat/recommended'],
	{
		files: [
			'**/*.stories.tsx',
			'.storybook/main.ts',
			'.storybook/preview.{ts,tsx}',
			'.storybook/theme.ts',
		],
		rules: {
			'import-x/no-default-export': 'off',
		},
	},
];
