import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsConfigPaths(), react()],
	test: {
		coverage: {
			exclude: ['**/*.stories.{ts,tsx}'],
			include: ['packages/kubrick/**'],
			provider: 'istanbul',
			reporter: ['html'],
		},
		environment: 'jsdom',
		globals: true,
		include: ['**/*.test.{ts,tsx}'],
		setupFiles: './tests/setup.ts',
	},
});
