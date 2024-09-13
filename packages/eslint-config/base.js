module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:prettier/recommended',
		'plugin:perfectionist/recommended-natural',
	],
	overrides: [
		{
			files: [
				'*.config.{js,mjs,cjs}',
				'*.d.{js,mjs,cjs}',
				'*.spec.{js,mjs,cjs}',
				'*.test.{js,mjs,cjs}',
			],
			rules: {
				'import/no-default-export': 'off',
				'import/no-named-as-default': 'off',
			},
		},
	],
	parserOptions: {
		ecmaFeatures: {
			globalReturn: false,
			jsx: true,
		},
		ecmaVersion: 2020,
		sourceType: `module`,
	},
	plugins: ['@stylistic'],
	rules: {
		'@stylistic/max-len': [
			'error',
			{
				// Primary use is to set limit for the comments.
				// @see prettier/prettier.
				code: 100,
				comments: 120,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreUrls: true,
			},
		],
		'@stylistic/padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				next: ['block-like', 'return', 'continue', 'throw'],
				prev: '*',
			},
			{
				blankLine: 'always',
				next: '*',
				prev: ['const', 'let', 'var'],
			},
			{
				blankLine: 'never',
				next: ['const', 'let', 'var'],
				prev: ['const', 'let', 'var'],
			},
			{
				blankLine: 'always',
				next: '*',
				prev: 'directive',
			},
			{
				blankLine: 'never',
				next: 'directive',
				prev: 'directive',
			},
			{
				blankLine: 'always',
				next: 'default',
				prev: '*',
			},
			{
				blankLine: 'never',
				next: 'break',
				prev: '*',
			},
			{
				blankLine: 'never',
				next: 'case',
				prev: 'case',
			},
		],
		'import/newline-after-import': [
			'error',
			{
				count: 1,
			},
		],
		'import/no-cycle': [
			2,
			{
				maxDepth: 1,
			},
		],
		/**
		 * @see https://notes.webutvikling.org/default-exports/
		 * @see https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/ by Nicholas C. Zakas
		 */
		'import/no-default-export': 'error',
		'import/no-duplicates': [
			'error',
			{
				'prefer-inline': true,
			},
		],
		'perfectionist/sort-imports': [
			'error',
			{
				groups: [
					'type',
					['builtin', 'external'],
					'internal-type',
					'internal',
					['parent-type', 'sibling-type', 'index-type'],
					['parent', 'sibling', 'index'],
					'object',
					'unknown',
				],
				'newlines-between': 'never',
				type: 'natural',
			},
		],
		'prettier/prettier': [
			'error',
			{
				experimentalTernaries: true,
				printWidth: 80,
				singleQuote: true,
				trailingComma: 'es5',
				useTabs: true,
			},
		],
	},
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	settings: {
		'import/resolver': {
			node: true,
		},
	},
};
