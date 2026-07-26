import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { defineConfig } from 'eslint/config';
import { configs } from 'typescript-eslint';

export default defineConfig(
	configs.recommended,
	{
		files: ['**/*.{ts,tsx,cts,mts}'],
		rules: {
			'import-x/named': 'off',
		},
		settings: {
			'import-x/extensions': [
				'.ts',
				'.tsx',
				'.cts',
				'.mts',
				'.js',
				'.jsx',
				'.cjs',
				'.mjs',
			],
			'import-x/external-module-folders': [
				'node_modules',
				'node_modules/@types',
			],
			'import-x/parsers': {
				'@typescript-eslint/parser': ['.ts', '.tsx', '.cts', '.mts'],
			},
			'import-x/resolver-next': [
				createTypeScriptImportResolver({
					alwaysTryTypes: true,
				}),
			],
		},
	},
	{
		files: ['**/*.{ts,tsx,cts,mts}'],
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					caughtErrors: 'none',
					varsIgnorePattern: '^_|^React$',
				},
			],
			'no-unused-vars': 'off',
		},
	},
	{
		files: [
			'**/*.config.{ts,tsx}',
			'**/*.d.{ts,tsx}',
			'**/*.spec.{ts,tsx}',
			'**/*.test.{ts,tsx}',
			'index.{ts,tsx,cts,mts}',
		],
		rules: {
			'@typescript-eslint/ban-ts-comment': 'off',
			'import-x/no-default-export': 'off',
			'import-x/no-named-as-default': 'off',
		},
	},
	{
		files: ['**/*.cjs'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
	}
);
