import eslint from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';
import { flatConfigs as importXFlatConfigs } from 'eslint-plugin-import-x';
import { configs as perfectionistConfigs } from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
	eslint.configs.recommended,
	importXFlatConfigs.recommended,
	perfectionistConfigs['recommended-natural'],
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
			'perfectionist/sort-exports': ['error'],
			'perfectionist/sort-imports': [
				'error',
				{
					groups: [
						'type',
						['builtin', 'external'],
						'internal',
						['parent', 'sibling', 'index'],
						'unknown',
					],
					newlinesBetween: 0,
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
			'**/eslint-config/*.mjs',
		],
		rules: {
			'import-x/no-default-export': 'off',
			'import-x/no-named-as-default': 'off',
		},
	},
];
