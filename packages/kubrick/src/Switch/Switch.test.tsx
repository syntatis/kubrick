import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './Switch.stories';

const Switch = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Switch />);

	const input = screen.getByLabelText('Show in REST API');

	expect(input).toBeInTheDocument();
	expect(input).toBeEnabled();
	expect(input).not.toBeChecked();
	expect(input).toHaveAttribute('role', 'switch');
});

it('should have the static class', () => {
	render(<Switch data-testid="switch" />);

	const root = screen.getByTestId('switch');

	expect(root).toHaveClass('kubrick-Switch-root');
});

it('should have the custom class', () => {
	render(<Switch className="setting-switch" data-testid="switch" />);

	const root = screen.getByTestId('switch');

	expect(root).toHaveClass('kubrick-Switch-root', 'setting-switch');
});

it('should have the inline style', () => {
	render(<Switch data-testid="switch" style={{ marginBlockEnd: 10 }} />);

	const root = screen.getByTestId('switch');

	expect(root).toHaveStyle({
		'margin-block-end': '10px',
	});
});

it('should be disabled', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Switch data-testid="switch" isDisabled onChange={fn} />);

	const input = screen.getByLabelText('Show in REST API');

	expect(input).toBeDisabled();

	await user.click(input);

	expect(fn).not.toBeCalled();
});

it('should be readonly', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Switch data-testid="switch" isReadOnly onChange={fn} />);

	const input = screen.getByLabelText('Show in REST API');

	expect(input).not.toBeChecked();
	expect(input).toBeEnabled();

	await user.click(input);

	expect(fn).not.toBeCalled();
	expect(input).not.toBeChecked();
});

it('should be selected (default)', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Switch data-testid="switch" defaultSelected onChange={fn} />);

	const input = screen.getByLabelText('Show in REST API');

	expect(input).toBeChecked();

	await user.click(input);

	expect(fn).toHaveBeenCalledOnce();
	expect(fn).toHaveBeenCalledWith(false);
	expect(input).not.toBeChecked();
});

it('should be selected (controlled)', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Switch data-testid="switch" isSelected onChange={fn} />);

	const input = screen.getByLabelText('Show in REST API');

	expect(input).toBeChecked();

	await user.click(input);

	expect(fn).toHaveBeenCalledWith(false);
	expect(input).toBeChecked();
});

it('should have the description', async () => {
	render(
		<Switch
			data-testid="switch"
			description="When enabled it will show post type in REST API."
		/>
	);

	const input = screen.getByLabelText('Show in REST API');

	expect(input).toHaveAccessibleDescription(
		'When enabled it will show post type in REST API.'
	);
});
