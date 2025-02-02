import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { download, Icon, wordpress } from '@wordpress/icons';
import { expect, it } from 'vitest';
import Meta, { Default } from './Link.stories';

const Link = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Link />);

	const link = screen.queryByRole('link', {
		name: 'WordPress',
	});

	expect(link).toBeInTheDocument();
	expect(link).toHaveAttribute('href', 'https://wordpress.org');
});

it('should have static class', () => {
	render(<Link />);

	const link = screen.queryByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveClass('kubrick-Link-root');
});

it('should have custom class', () => {
	render(<Link className="hello-world" href="/" />);

	const link = screen.getByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveClass('hello-world', 'kubrick-Link-root');
});

it('should have inline style', () => {
	render(<Link href="/" style={{ margin: 10 }} />);

	const link = screen.getByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveStyle({ margin: '10px' });
});

it('should have "target" attribute', () => {
	render(<Link href="/" id="hello-world-1" target="_blank" />);

	const link = screen.getByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveAttribute('target', '_blank');
});

it('should have "id" attribute', () => {
	render(<Link href="/" id="hello-world-1" />);

	const link = screen.getByRole('link', {
		name: 'WordPress',
	});

	expect(link).toHaveAttribute('id', 'hello-world-1');
});

it('should not have with invalid html attribute', () => {
	render(
		// @ts-expect-error
		<Link foo="bar" href="/" />
	);

	const link = screen.getByRole('link', {
		name: 'WordPress',
	});

	expect(link).not.toHaveAttribute('foo');
});

it('should have prefix node', () => {
	render(
		<Link href="/" prefix={<Icon data-testid="wp-icon" icon={wordpress} />} />
	);

	const icon = screen.queryByTestId('wp-icon');

	expect(icon).toBeInTheDocument();
});

it('should have suffix node', () => {
	render(
		<Link
			href="/"
			suffix={<Icon data-testid="wp-icon-download" icon={download} />}
		/>
	);

	const icon = screen.queryByTestId('wp-icon-download');

	expect(icon).toBeInTheDocument();
});
