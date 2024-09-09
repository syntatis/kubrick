import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './IconButton.stories';

const IconButton = composeStory(Default, Meta);

it('should render the component', () => {
	render(<IconButton />);

	const button = screen.queryByRole('button', { name: 'Download' });

	expect(button).toBeInTheDocument();
	expect(button).toBeEnabled();
});

it('should render as "secondary" variant', () => {
	render(<IconButton variant="secondary" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveClass('button', 'button-secondary');
});

it('should render "small" size', () => {
	render(<IconButton size="small" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveClass('button', 'button-small');
});

it('should render "large" size', () => {
	render(<IconButton size="large" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveClass('button', 'button-large');
});

it('should have static class', () => {
	render(<IconButton />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveClass(
		'kubrick-IconButton-root',
		'button',
		'button-primary'
	);
});

it('should have custom class name', () => {
	render(<IconButton className="foo-bar" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveClass(
		'button',
		'button-primary',
		'foo-bar',
		'kubrick-IconButton-root'
	);
});

it('should have inline style', () => {
	render(<IconButton style={{ width: 100 }} />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveStyle({ width: '100px' });
});

it('should have "id"', () => {
	render(<IconButton id="icon-button-1" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveAttribute('id', 'icon-button-1');
});

it('should have type "submit"', () => {
	render(<IconButton type="submit" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveAttribute('type', 'submit');
});

it('should have type "reset"', () => {
	render(<IconButton type="reset" />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveAttribute('type', 'reset');
});

it('should have "aria-*" label', () => {
	render(<IconButton label="Download changes" />);

	const button = screen.getByRole('button', { name: 'Download changes' });

	expect(button).toHaveAttribute('aria-label', 'Download changes');
});

it('should have "role" attribute', () => {
	render(<IconButton role="link" />);

	const button = screen.queryByRole('link', { name: 'Download' });

	expect(button).toBeInTheDocument();
});

it('should have "tabindex" attribute', () => {
	render(<IconButton excludeFromTabOrder />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toHaveAttribute('tabindex', '-1');
});

it('should be disabled', () => {
	render(<IconButton isDisabled />);

	const button = screen.getByRole('button', { name: 'Download' });

	expect(button).toBeDisabled();
});

it('should call the "onPress" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<IconButton onPress={fn} />);

	const button = screen.getByRole('button', { name: 'Download' });

	await user.click(button);

	expect(fn).toBeCalledTimes(1);
});

it('should call the "onHoverChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<IconButton onHoverChange={fn} />);

	const button = screen.getByRole('button', { name: 'Download' });

	await user.hover(button);

	expect(fn).toBeCalledTimes(1);
	expect(fn).toBeCalledWith(true); // isHovering: `true`.

	await user.unhover(button);

	expect(fn).toBeCalledTimes(2);
	expect(fn).toBeCalledWith(false); // isHovering: `false`.
});

it('should call the "onFocusChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<IconButton onFocusChange={fn} />);

	await user.tab();

	expect(fn).toBeCalledTimes(1);
	expect(fn).toBeCalledWith(true); // isFocused: `true`.

	await user.tab();

	expect(fn).toBeCalledTimes(2);
	expect(fn).toBeCalledWith(false); // isFocused: `false`.
});
