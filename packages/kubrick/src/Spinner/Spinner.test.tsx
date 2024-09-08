import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Meta, { Default } from './Spinner.stories';

const Spinner = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Spinner data-testid="spinner" />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).toBeInTheDocument();
	expect(spinner).toHaveRole('status');
	expect(spinner).toHaveTextContent('Loading');
});

it('should have static class', () => {
	render(<Spinner data-testid="spinner" />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).toHaveClass('kubrick-Spinner-root');
});

it('should have custom class name', () => {
	render(<Spinner className="content-spinner" data-testid="spinner" />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).toHaveClass('kubrick-Spinner-root', 'content-spinner');
});

it('should have inline style', () => {
	render(<Spinner data-testid="spinner" style={{ marginBottom: 10 }} />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).toHaveStyle({
		'margin-bottom': '10px',
	});
});

it('should have "id" attribute', () => {
	render(<Spinner data-testid="spinner" id="unique" />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).toHaveAttribute('id', 'unique-Spinner-root');
});

it('should not have invalid html attributes', async () => {
	// @ts-expect-error
	render(<Spinner data-testid="spinner" foo="bar" />);

	const spinner = screen.queryByTestId('spinner');

	expect(spinner).not.toHaveAttribute('foo');
});
