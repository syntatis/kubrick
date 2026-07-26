import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { flatConfigs } from 'eslint-plugin-import-x';
import { configs } from 'typescript-eslint';
import { defineConfig } from "eslint/config";

export default defineConfig(
	configs.recommended,
	flatConfigs.typescript,
	{
		settings: {
			'import-x/resolver-next': [
				createTypeScriptImportResolver({
					alwaysTryTypes: true,
				}),
			],
		},
	},
	{
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
			'index.{t}',
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
