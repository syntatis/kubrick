import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Meta, { Default } from './IconLinkButton.stories';

const IconLinkButton = composeStory(Default, Meta);

it('should render the component', () => {
	render(<IconLinkButton />);

	const link = screen.queryByRole('link', {
		name: 'WordPress',
	});
	const icon = screen.queryByTestId('icon');

	expect(link).toBeInTheDocument();
	expect(link).toHaveAttribute('href', 'https://wordpress.org');
	expect(link).toHaveClass('button', 'button-primary');
	expect(icon).toBeInTheDocument();
});

it('should have static class', () => {
	render(<IconLinkButton />);

	const link = screen.queryByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveClass(
		'button',
		'button-primary',
		'kubrick-IconLinkButton-root'
	);
});

it('should have custom class', () => {
	render(<IconLinkButton className="hello-world" href="/" />);

	const link = screen.getByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveClass(
		'button',
		'button-primary',
		'hello-world',
		'kubrick-IconLinkButton-root'
	);
});

it('should have inline style', () => {
	render(<IconLinkButton href="/" style={{ margin: 20 }} />);

	const link = screen.getByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveStyle({ margin: '20px' });
});

it('should have "target" attribute', () => {
	render(<IconLinkButton href="/" target="_blank" />);

	const link = screen.getByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveAttribute('target', '_blank');
});

it('should have "id" attribute', () => {
	render(<IconLinkButton href="/" id="hello-world-1" />);

	const link = screen.getByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveAttribute('id', 'hello-world-1');
});

it('should not have with invalid html attribute', () => {
	render(
		// @ts-expect-error
		<IconLinkButton foo="bar" href="/" />
	);

	const link = screen.getByRole('link', {
		name: 'WordPress',
	});

	expect(link).not.toHaveAttribute('foo');
});
