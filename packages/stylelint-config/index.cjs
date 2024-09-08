module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
	rules: {
		'color-named': 'never',
		'custom-property-pattern': '^[a-z\\-0-9]+$',
		'declaration-no-important': true,
		'font-weight-notation': 'numeric',
		'no-descending-specificity': null,
		'number-max-precision': 3,
		'selector-attribute-quotes': 'always',
		'selector-class-pattern':
			'^[a-z][a-zA-Z0-9]+$|^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global', 'export'],
			},
		],
	},
};
