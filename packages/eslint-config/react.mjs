import eslintReact from '@eslint-react/eslint-plugin';
import kit, { merge } from '@eslint-react/kit';
import globals from 'globals';

/**
 * Enforce arrow function definitions for function components.
 * Replaces `react/function-component-definition` from eslint-plugin-react.
 */
function functionComponentDefinition() {
	return (context, { collect, hint }) => {
		const { query, visitor } = collect.components(context, {
			hint:
				hint.component.Default &
				~hint.component.DoNotIncludeFunctionDefinedAsObjectMethod,
		});

		return merge(visitor, {
			'Program:exit'(program) {
				for (const { node } of query.all(program)) {
					if (node.type === 'ArrowFunctionExpression') {
						continue;
					}
					context.report({
						message:
							'Function components must be defined with arrow functions.',
						node,
					});
				}
			},
		});
	};
}

export default [
	{
		files: ['**/*.jsx', '**/*.tsx'],
		...eslintReact.configs['recommended-typescript'],
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
		settings: {
			'react-x': {
				version: '18.0.0',
			},
		},
	},
	kit().use(functionComponentDefinition).getConfig(),
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
