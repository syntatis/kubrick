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
];
