import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			exclude: ['**/*.stories.{ts,tsx}'],
			provider: 'istanbul',
			reporter: ['clover', 'html'],
			reportsDirectory: '../../coverage',
		},
		environment: 'jsdom',
		globals: true,
		include: ['**/*.test.{ts,tsx}'],
		setupFiles: './tests/setup.ts',
	},
});
