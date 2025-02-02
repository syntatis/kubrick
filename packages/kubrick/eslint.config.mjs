import config from '@syntatis/eslint-config';

export default [
	{
		ignores: ['dist', 'node_modules', 'temp', 'tmp'],
	},
	...config,
	{
		files: ['**/*.stories.{js,jsx,ts,tsx}'],
		rules: {
			'import-x/no-default-export': 'off',
		},
	},
	{
		files: ['*.test.{js,jsx,ts,tsx,mts}'],
		rules: {
			'@typescript-eslint/ban-ts-comment': 'off',
			'import-x/no-named-as-default': 'off',
		},
	},
];
