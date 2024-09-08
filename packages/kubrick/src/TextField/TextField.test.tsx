import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './TextField.stories';

const TextField = composeStory(Default, Meta);

it('should render the component', () => {
	render(<TextField />);

	const input = screen.queryByLabelText('Site Name');

	expect(input).toBeEnabled();
	expect(input).toBeInTheDocument();
	expect(input).toHaveAttribute('type', 'text');
});

it('should have static class', () => {
	render(<TextField data-testid="textfield" />);

	const input = screen.getByLabelText('Site Name');
	const root = screen.getByTestId('textfield');

	expect(input).toHaveClass('kubrick-TextField-input');
	expect(root).toHaveClass('kubrick-TextField-root');
});

it('should have custom class', () => {
	render(<TextField className="input" data-testid="textfield" />);

	const root = screen.getByTestId('textfield');

	expect(root).toHaveClass('kubrick-TextField-root', 'input');
});

it('should have "code" class', () => {
	render(<TextField className="code" />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveClass('code');
});

it('should have "regular-text" class', () => {
	render(<TextField className="regular-text" />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveClass('regular-text');
});

it('should have inline style', () => {
	render(<TextField data-testid="textfield" style={{ paddingRight: 30 }} />);

	const root = screen.getByTestId('textfield');

	expect(root).toHaveStyle({ 'padding-right': '30px' });
});

it('should have description', () => {
	render(<TextField description="Add your site name" />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveAccessibleDescription('Add your site name');
});

it('should have "id" attribute', () => {
	render(<TextField data-testid="textfield" id="site-name" />);

	const root = screen.getByTestId('textfield');
	const input = screen.getByLabelText('Site Name');

	expect(root).toHaveAttribute('id', 'site-name-TextField-root');
	expect(input).toHaveAttribute('id', 'site-name');
});

it('should have "tabindex" attribute', () => {
	render(<TextField excludeFromTabOrder />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveAttribute('tabindex', '-1');
});

it('should have "type" attribute', () => {
	render(<TextField type="email" />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveAttribute('type', 'email');
});

it('should not have invalid html attributes', async () => {
	// @ts-expect-error
	render(<TextField data-testid="textfield" foo="bar" />);

	const root = screen.getByTestId('textfield');
	const input = screen.getByLabelText('Site Name');

	expect(input).not.toHaveAttribute('foo');
	expect(root).not.toHaveAttribute('foo');
});

it('should be disabled', () => {
	render(<TextField isDisabled />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toBeDisabled();
});

it('should be readonly', () => {
	render(<TextField isReadOnly />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveAttribute('readonly');
});

it('should be marked as required', () => {
	render(<TextField isRequired />);

	const input = screen.getByLabelText(new RegExp('Site Name *'));

	expect(input).toBeRequired();
});

it('should be marked as invalid based on value evaluation', async () => {
	const user = userEvent.setup();

	render(
		<TextField
			validate={(v) => {
				if (v === 'x') {
					return 'An unexpected error occurred!';
				}
			}}
		/>
	);

	const input = screen.getByLabelText('Site Name');

	expect(input).not.toBeInvalid();

	await user.type(input, 'x');

	expect(input).toBeInvalid();
	expect(input).toHaveAccessibleDescription('An unexpected error occurred!');
});

it('should render error message on top of validation message', async () => {
	const user = userEvent.setup();

	render(
		<TextField
			errorMessage={(v) => (v.isInvalid ? 'Error:' : '')}
			validate={(v) => (v === 'y' ? 'Value "y" is not allowed!' : undefined)}
		/>
	);

	const input = screen.getByLabelText('Site Name');

	await user.type(input, 'y');

	expect(input).toHaveAccessibleDescription('Error: Value "y" is not allowed!');
});

it('should show the error message (controlled)', () => {
	render(<TextField errorMessage="An unexpected error occurred!" />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveAccessibleDescription('An unexpected error occurred!');
});

it('should have value (default)', async () => {
	const user = userEvent.setup();

	render(<TextField defaultValue="foo" />);

	const input = screen.getByLabelText('Site Name');

	await user.type(input, '-bar');

	expect(input).toHaveValue('foo-bar');
});

it('should have value (controlled)', async () => {
	const user = userEvent.setup();

	render(<TextField value="foo" />);

	const input = screen.getByLabelText('Site Name');

	expect(input).toHaveValue('foo');

	await user.type(input, '-bar');

	expect(input).toHaveValue('foo');
});

it('should call "onChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<TextField onChange={fn} />);

	const input = screen.getByLabelText('Site Name');

	await user.type(input, 'Hello World!');

	expect(fn).toHaveBeenCalledWith('Hello World!');
});
