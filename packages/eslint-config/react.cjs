const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const globals = require('globals');

module.exports = [
	reactPlugin.configs.flat?.recommended,
	reactPlugin.configs.flat?.['jsx-runtime'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'react-hooks': reactHooksPlugin,
		},
		rules: {
			'react/function-component-definition': [
				2,
				{
					namedComponents: 'arrow-function',
				},
			],
			'react/prop-types': 'off',
			...reactHooksPlugin.configs.recommended.rules,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		files: [
			'**/*.config.jsx',
			'**/*.d.jsx',
			'**/*.spec.jsx',
			'**/*.test.jsx',
			'index.jsx',
		],
		rules: {
			'import-x/no-default-export': 'off',
			'import-x/no-named-as-default': 'off',
		},
	},
];
