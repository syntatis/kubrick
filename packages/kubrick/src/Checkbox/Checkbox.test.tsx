import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './Checkbox.stories';

const Checkbox = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Checkbox />);

	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(checkbox).toBeInTheDocument();
	expect(checkbox).toBeEnabled();
});

it('should have description', () => {
	render(
		<Checkbox description="When checked WordPress will correct invalid nested XHTML" />
	);

	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(checkbox).toHaveAccessibleDescription(
		'When checked WordPress will correct invalid nested XHTML'
	);
});

it('should have static class', () => {
	render(<Checkbox data-testid="checkbox" />);

	const root = screen.getByTestId('checkbox');

	expect(root).toHaveClass('kubrick-Checkbox-root');
});

it('should have custom class', () => {
	render(<Checkbox className="foo-bar" data-testid="checkbox" />);

	const root = screen.getByTestId('checkbox');

	expect(root).toHaveClass('foo-bar');
});

it('should have inline styles', () => {
	render(<Checkbox data-testid="checkbox" style={{ padding: 30 }} />);

	const root = screen.getByTestId('checkbox');

	expect(root).toHaveStyle({ padding: '30px' });
});

it('should have "name" attribute', () => {
	render(<Checkbox name="correct_xhtml" />);

	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(checkbox).toHaveAttribute('name', 'correct_xhtml');
});

it('should have "id" attribute', () => {
	render(<Checkbox data-testid="checkbox" id="xhtml" />);

	const root = screen.getByTestId('checkbox');
	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(root).toHaveAttribute('id', 'xhtml-Checkbox-root');
	expect(checkbox).toHaveAttribute('id', 'xhtml');
});

it('should not have with invalid html attribute', () => {
	// @ts-expect-error
	render(<Checkbox data-testid="checkbox" foo="bar" />);

	const root = screen.getByTestId('checkbox');
	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(root).not.toHaveAttribute('foo');
	expect(checkbox).not.toHaveAttribute('foo');
});

it('should be excluded from tab order', () => {
	render(<Checkbox excludeFromTabOrder />);

	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(checkbox).toHaveAttribute('tabindex', '-1');
});

it('should be checked', async () => {
	render(<Checkbox />);

	const user = userEvent.setup();
	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	await user.click(checkbox);

	expect(checkbox).toBeChecked();
});

it('should be checked (by default)', () => {
	render(<Checkbox defaultSelected />);

	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(checkbox).toBeChecked();
});

it('should be checked (controlled)', () => {
	render(<Checkbox isSelected />);

	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(checkbox).toBeChecked();
});

it('should be readonly', () => {
	render(<Checkbox isReadOnly />);

	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(checkbox).toHaveAttribute('aria-readonly', 'true');
});

it('should be disabled', () => {
	render(<Checkbox isDisabled />);

	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(checkbox).toBeDisabled();
});

it('should be checked on click', async () => {
	render(<Checkbox name="agree" />);

	const user = userEvent.setup();
	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(checkbox).not.toBeChecked();
	await user.click(checkbox);
	expect(checkbox).toBeChecked();
});

it('should be unchecked on click', async () => {
	render(<Checkbox defaultSelected name="agree" />);

	const user = userEvent.setup();
	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	expect(checkbox).toBeChecked();
	await user.click(checkbox);
	expect(checkbox).not.toBeChecked();
});

it('should call the "onChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Checkbox onChange={fn} />);

	const checkbox = screen.getByRole('checkbox', {
		name: 'WordPress should correct invalidly nested XHTML automatically',
	});

	await user.click(checkbox);

	expect(fn).toBeCalledTimes(1);
	expect(fn).toBeCalledWith(true);

	await user.click(checkbox);

	expect(fn).toBeCalledTimes(2);
	expect(fn).toBeCalledWith(false);
});
