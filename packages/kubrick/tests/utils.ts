import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
	cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
	return render(ui, {
		// Wrap provider(s) here if needed.
		wrapper: ({ children }) => children,
		...options,
	});
}

export { default as userEvent } from '@testing-library/user-event';
export { customRender as render }; // Override render export.
