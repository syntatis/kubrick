module.exports = {
	extends: [
		'./base.js',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
	],
	overrides: [
		{
			files: ['*.config.{jsx}', '*.d.{jsx}', '*.spec.{jsx}', '*.test.{jsx}'],
			rules: {
				'import/no-default-export': 'off',
				'import/no-named-as-default': 'off',
			},
		},
	],
	rules: {
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
			},
		],
		'react/prop-types': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
