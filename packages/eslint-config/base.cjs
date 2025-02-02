const eslint = require('@eslint/js');
const stylisticPlugin = require('@stylistic/eslint-plugin');
const prettierConfig = require('eslint-config-prettier');
const eslintPluginImportX = require('eslint-plugin-import-x');
const perfectionistPlugin = require('eslint-plugin-perfectionist');
const prettierPlugin = require('eslint-plugin-prettier');
const globals = require('globals');

module.exports = [
	eslint.configs.recommended,
	eslintPluginImportX.flatConfigs.recommended,
	perfectionistPlugin.configs['recommended-natural'],
	prettierConfig,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaFeatures: {
					globalReturn: false,
				},
			},
			sourceType: 'module',
		},
		plugins: {
			'@stylistic': stylisticPlugin,
			prettier: prettierPlugin,
		},
		settings: {
			'import/resolver': {
				node: true,
			},
		},
	},
	{
		rules: {
			'@stylistic/max-len': [
				'error',
				{
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
			'import-x/newline-after-import': [
				'error',
				{
					count: 1,
				},
			],
			'import-x/no-cycle': [
				2,
				{
					maxDepth: 1,
				},
			],
			'import-x/no-default-export': 'error',
			'import-x/no-duplicates': [
				'error',
				{
					'prefer-inline': true,
				},
			],
			'perfectionist/sort-exports': [
				'error',
				{
					groupKind: 'values-first',
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
					newlinesBetween: 'never',
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
	},
	{
		files: [
			'**/*.config.{js,mjs}',
			'**/*.d.{js,mjs}',
			'**/*.spec.{js,mjs}',
			'**/*.test.{js,mjs}',
			'index.{js,mjs}',
		],
		rules: {
			'import-x/no-default-export': 'off',
			'import-x/no-named-as-default': 'off',
		},
	},
];
