import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './Select.stories';

const Select = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Select />);

	const select = screen.getByLabelText('Site Language');

	expect(select).toHaveRole('combobox');
	expect(select).toBeEnabled();
});

it('should have static class', () => {
	render(<Select data-testid="select" />);

	const select = screen.getByLabelText('Site Language');
	const root = screen.getByTestId('select');

	expect(select).toHaveClass('kubrick-Select-input');
	expect(root).toHaveClass('kubrick-Select-root');
});

it('should have custom class name', () => {
	render(<Select className="setting-select" data-testid="select" />);

	const select = screen.getByLabelText('Site Language');
	const root = screen.getByTestId('select');

	expect(root).toHaveClass('kubrick-Select-root', 'setting-select');
	expect(select).not.toHaveClass('setting-select');
});

it('should have inline style', () => {
	render(<Select data-testid="select" style={{ marginBlock: 15 }} />);

	const root = screen.getByTestId('select');
	const select = screen.getByLabelText('Site Language');

	expect(root).toHaveStyle({ 'margin-block': '15px' });
	expect(select).not.toHaveStyle({ 'margin-block': '15px' });
});

it('should have description', () => {
	render(
		<Select
			data-testid="select"
			description="Please select the site language."
		/>
	);

	const select = screen.getByLabelText('Site Language');

	expect(select).toHaveAccessibleDescription(
		'Please select the site language.'
	);
});

it('should have "id" attribute', () => {
	render(<Select data-testid="select" id="setting-option" />);

	const root = screen.getByTestId('select');
	const select = screen.getByLabelText('Site Language');

	expect(root).toHaveAttribute('id', 'setting-option-Select-root');
	expect(select).toHaveAttribute('id', 'setting-option');
});

it('should have "tabindex" attribute', () => {
	render(<Select excludeFromTabOrder />);

	const select = screen.getByLabelText('Site Language');

	expect(select).toHaveAttribute('tabindex', '-1');
});

it('should not change "type" attribute', () => {
	// @ts-expect-error
	render(<Select data-testid="select" type="email" />);

	const select = screen.getByLabelText('Site Language');
	const root = screen.getByTestId('select');

	expect(select).not.toHaveAttribute('type');
	expect(root).not.toHaveAttribute('type');
});

it('should not have invalid html attribute', () => {
	// @ts-expect-error
	render(<Select data-testid="select" foo="bar" />);

	const select = screen.getByLabelText('Site Language');
	const root = screen.getByTestId('select');

	expect(select).not.toHaveAttribute('foo');
	expect(root).not.toHaveAttribute('foo');
});

it('should be disabled', () => {
	render(<Select isDisabled />);

	const select = screen.getByLabelText('Site Language');

	expect(select).toBeDisabled();
});

it('should be marked as required', () => {
	render(<Select isRequired />);

	const select = screen.getByLabelText(new RegExp('Site Language *'));

	expect(select).toBeRequired();
});

it('should be marked invalid', () => {
	render(<Select isInvalid />);

	const select = screen.getByLabelText('Site Language');

	expect(select).toBeInvalid();
});

it('should show the error message (controlled)', () => {
	render(<Select errorMessage="An unexpected error occurrred." />);

	const select = screen.getByLabelText('Site Language');

	expect(select).toHaveAccessibleDescription('An unexpected error occurrred.');
});

it('should have selected item value', () => {
	render(<Select selectedItem="Bahasa Indonesia" />);

	const select = screen.getByLabelText('Site Language');

	expect(select).toHaveValue('Bahasa Indonesia');
});

it('should default to first item when selected item passed is invalid', () => {
	render(<Select selectedItem="Bahasa" />);

	const select = screen.getByLabelText('Site Language');

	expect(select).toHaveValue('');
});

it('should call "onSelectionChange" callback when selecting an option', async () => {
	const user = userEvent.setup();
	const fn = vi.fn();

	render(<Select onSelectionChange={fn} />);

	const select = screen.getByLabelText('Site Language');

	await user.selectOptions(select, 'Afrikaans');

	expect(select).toHaveValue('Afrikaans');
	expect(fn).toHaveBeenCalledOnce();
	expect(fn).toHaveBeenCalledWith('Afrikaans');
});

it('should be marked as invalid based on value evaluation', async () => {
	render(
		<Select
			validate={(v) => {
				if (v === '') {
					return 'Invalid selected value!';
				}
			}}
		/>
	);

	const input = screen.getByLabelText('Site Language');

	expect(input).toBeInvalid();
	expect(input).toHaveAccessibleDescription('Invalid selected value!');
});
