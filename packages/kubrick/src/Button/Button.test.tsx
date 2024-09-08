import { composeStory } from '@storybook/react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Icon, desktop } from '@wordpress/icons';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './Button.stories';

const Button = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Button />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toBeInTheDocument();
	expect(button).toBeEnabled();
});

it('should render as "secondary" variant', () => {
	render(<Button variant="secondary" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-secondary');
});

it('should render "small" size', () => {
	render(<Button size="small" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-small');
});

it('should render "large" size', () => {
	render(<Button size="large" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-large');
});

it('should render "hero" size', () => {
	render(<Button size="hero" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('button-hero');
});

it('should have static class', () => {
	render(<Button />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass(
		'kubrick-Button-root',
		'button',
		'button-primary'
	);
});

it('should have custom class name', () => {
	render(<Button className="foo-bar" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveClass('foo-bar');
});

it('should have inline style', () => {
	render(<Button style={{ width: 100 }} />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveStyle({ width: '100px' });
});

it('should have "id"', () => {
	render(<Button id="1" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveAttribute('id', '1');
});

it('should have type "submit"', () => {
	render(<Button type="submit" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveAttribute('type', 'submit');
});

it('should have type "reset"', () => {
	render(<Button type="reset" />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveAttribute('type', 'reset');
});

it('should have "aria-*" label', () => {
	render(<Button aria-label="Update changes" />);

	const button = screen.getByRole('button', { name: 'Update changes' });

	expect(button).toHaveAttribute('aria-label', 'Update changes');
});

it('should have "role" attribute', () => {
	render(<Button role="link" />);

	const button = screen.queryByRole('link', { name: 'Save changes' });

	expect(button).toBeInTheDocument();
});

it('should have "tabindex" attribute', () => {
	render(<Button excludeFromTabOrder />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toHaveAttribute('tabindex', '-1');
});

it('should be disabled', () => {
	render(<Button isDisabled />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toBeDisabled();
});

it('should have prefix', () => {
	render(<Button prefix={<Icon data-testid="prefix" icon={desktop} />} />);

	const icon = screen.queryByTestId('prefix');

	expect(icon).toBeInTheDocument();
});

it('should have suffix', () => {
	render(<Button suffix={<Icon data-testid="suffix" icon={desktop} />} />);

	const icon = screen.queryByTestId('suffix');

	expect(icon).toBeInTheDocument();
});

it('should call the "onPress" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Button onPress={fn} />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	await act(async () => await user.click(button));

	expect(fn).toBeCalledTimes(1);
});

it('should call the "onHoverChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Button onHoverChange={fn} />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	await act(async () => await user.hover(button));

	expect(fn).toBeCalledTimes(1);
	expect(fn).toBeCalledWith(true); // isHovering: `true`.

	await act(async () => await user.unhover(button));

	expect(fn).toBeCalledTimes(2);
	expect(fn).toBeCalledWith(false); // isHovering: `true`.
});

it('should call the "onFocusChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Button onFocusChange={fn} />);

	await act(async () => await user.tab());

	expect(fn).toBeCalledTimes(1);
	expect(fn).toBeCalledWith(true); // isFocused: `true`.

	await act(async () => await user.tab());

	expect(fn).toBeCalledTimes(2);
	expect(fn).toBeCalledWith(false); // isFocused: `false`.
});
