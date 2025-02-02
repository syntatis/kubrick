import config from '@syntatis/eslint-config';

export default [
	{
		ignores: ['dist', 'node_modules', 'temp', 'tmp'],
	},
	...config,
];
