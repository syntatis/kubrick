import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './SearchField.stories';

const SearchField = composeStory(Default, Meta);

it('should render the component', () => {
	render(<SearchField />);

	const input = screen.queryByLabelText('Search');

	expect(input).toBeEnabled();
	expect(input).toBeInTheDocument();
	expect(input).toHaveAttribute('type', 'search');
});

it('should have static class', () => {
	render(<SearchField data-testid="searchfield" />);

	const root = screen.getByTestId('searchfield');
	const input = screen.getByLabelText('Search');

	expect(input).toHaveClass('kubrick-SearchField-input');
	expect(root).toHaveClass('kubrick-SearchField-root');
});

it('should have custom class name', () => {
	render(<SearchField className="blog-search" data-testid="searchfield" />);

	const root = screen.getByTestId('searchfield');

	expect(root).toHaveClass('kubrick-SearchField-root', 'blog-search');
});

it('should have inline style', () => {
	render(
		<SearchField data-testid="searchfield" style={{ paddingRight: 30 }} />
	);

	const root = screen.getByTestId('searchfield');

	expect(root).toHaveStyle({ 'padding-right': '30px' });
});

it('should have description', () => {
	render(
		<SearchField description="Search the post, pages, and other post types." />
	);

	const input = screen.getByLabelText('Search');

	expect(input).toHaveAccessibleDescription(
		'Search the post, pages, and other post types.'
	);
});

it('should have "id" attribute', () => {
	render(<SearchField data-testid="searchfield" id="custom-posts" />);

	const root = screen.getByTestId('searchfield');

	expect(root).toHaveAttribute('id', 'custom-posts-SearchField-root');
});

it('should have "tabindex" attribute', () => {
	render(<SearchField excludeFromTabOrder />);

	const input = screen.getByLabelText('Search');

	expect(input).toHaveAttribute('tabindex', '-1');
});

it('should retain the "type" attribute', () => {
	// @ts-expect-error
	render(<SearchField type="email" />);

	const input = screen.getByLabelText('Search');

	expect(input).toHaveAttribute('type', 'search');
});

it('should not have invalid html attributes', async () => {
	// @ts-expect-error
	render(<SearchField data-testid="searchfield" foo="bar" />);

	const root = screen.getByTestId('searchfield');
	const input = screen.getByLabelText('Search');

	expect(input).not.toHaveAttribute('foo');
	expect(root).not.toHaveAttribute('foo');
});

it('should be disabled', () => {
	render(<SearchField isDisabled />);

	const input = screen.getByLabelText('Search');

	expect(input).toBeDisabled();
});

it('should be readonly', () => {
	render(<SearchField isReadOnly />);

	const input = screen.getByLabelText('Search');

	expect(input).toHaveAttribute('readonly');
});

it('should be marked as required', () => {
	render(<SearchField isRequired />);

	const input = screen.getByLabelText(new RegExp('Search *'));

	expect(input).toBeRequired();
});

it('should be marked as invalid and show error message', () => {
	render(<SearchField validate={() => 'An unexpected error occurred!'} />);

	const input = screen.getByLabelText('Search');

	expect(input).toBeInvalid();
	expect(input).toHaveAccessibleDescription('An unexpected error occurred!');
});

it('should have value (default)', async () => {
	const user = userEvent.setup();

	render(<SearchField defaultValue="foo" />);

	const input = screen.getByLabelText('Search');

	await user.type(input, '-bar');

	expect(input).toHaveValue('foo-bar');
});

it('should have value (controlled)', async () => {
	const user = userEvent.setup();

	render(<SearchField value="foo" />);

	const input = screen.getByLabelText('Search');

	expect(input).toHaveValue('foo');

	await user.type(input, '-bar');

	expect(input).toHaveValue('foo');
});

it('should call "onChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<SearchField onChange={fn} />);

	const input = screen.getByLabelText('Search');

	await user.type(input, 'How to do in WooCommerce');

	expect(fn).toHaveBeenCalledWith('How to do in WooCommerce');
});

it('should call "onSubmit" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<SearchField onSubmit={fn} />);

	const input = screen.getByLabelText('Search');

	await user.type(input, 'How to do in WooCommerce');
	await user.keyboard('{Enter}');

	expect(fn).toHaveBeenCalledWith('How to do in WooCommerce');
});
