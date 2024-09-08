module.exports = {
	extends: [
		'./base.js',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
	],
	overrides: [
		{
			files: [
				'*.config.{ts,jsx,tsx,mts,cts}',
				'*.d.{ts,jsx,tsx,mts,cts}',
				'*.spec.{ts,jsx,tsx,mts,cts}',
				'*.test.{ts,jsx,tsx,mts,cts}',
			],
			rules: {
				'import/no-default-export': 'off',
				'import/no-named-as-default': 'off',
			},
		},
		{
			files: ['*.test.{ts,jsx,tsx,mts,cts}', '*.spec.{ts,jsx,tsx,mts,cts}'],
			rules: {
				'@typescript-eslint/ban-ts-comment': 'off',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	rules: {
		'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
	},
	settings: {
		'import/resolver': {
			typescript: true,
		},
	},
};
