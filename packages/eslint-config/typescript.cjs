const {
	createTypeScriptImportResolver,
} = require('eslint-import-resolver-typescript');
const eslintPluginImportX = require('eslint-plugin-import-x');
// eslint-disable-next-line import-x/newline-after-import
const tseslint = require('typescript-eslint');
const tseslintConfigs = tseslint.configs;

module.exports = tseslint.config(
	tseslintConfigs.recommended,
	eslintPluginImportX.flatConfigs.typescript,
	{
		settings: {
			'import/resolver-next': [
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
