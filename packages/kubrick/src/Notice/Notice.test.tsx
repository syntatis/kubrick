import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import Meta, { Default } from './Notice.stories';

const Notice = composeStory(Default, Meta);

it('should render the notice', () => {
	render(<Notice data-testid="notice" />);

	const notice = screen.queryByTestId('notice');

	expect(notice).toHaveTextContent('Settings saved.');
});

it('should render the notice dismiss button', () => {
	render(<Notice data-testid="notice" isDismissable />);

	expect(screen.getByRole('button', { name: 'Dismiss notice' })).toBeEnabled();
});

it('should render the notice dismiss button with custom label', () => {
	render(<Notice data-testid="notice" isDismissable={{ label: 'Ignore' }} />);

	expect(screen.getByRole('button', { name: 'Ignore' })).toBeEnabled();
});

it('should render as "alt" variant', () => {
	render(<Notice data-testid="notice" variant="alt" />);

	const notice = screen.getByTestId('notice');

	expect(notice).toHaveClass('notice-alt', 'notice-info');
});

it('should render as info "level" variant', () => {
	render(<Notice data-testid="notice" />);

	const notice = screen.getByTestId('notice');

	expect(notice).toHaveClass('notice', 'notice-info');
});

it('should render as success "level" variant', () => {
	render(
		<Notice data-testid="notice" level="success">
			Changes saved
		</Notice>
	);

	const notice = screen.getByTestId('notice');

	expect(notice).toHaveClass('notice', 'notice-success');
});

it('should render as warning "level" variant', () => {
	render(<Notice data-testid="notice" level="warning" />);

	const notice = screen.getByTestId('notice');

	expect(notice).toHaveClass('notice', 'notice-warning');
});

it('should render as error "level" variant', () => {
	render(<Notice data-testid="notice" level="error" />);

	const notice = screen.getByTestId('notice');

	expect(notice).toHaveClass('notice', 'notice-error');
});

it('should have static class', () => {
	render(<Notice data-testid="notice" />);

	const notice = screen.getByTestId('notice');

	expect(notice).toHaveClass('kubrick-Notice-root', 'notice', 'notice-info');
});

it('should have custom class', () => {
	render(<Notice className="notice-foo-bar" data-testid="notice" />);

	const notice = screen.getByTestId('notice');

	expect(notice).toHaveClass('notice-foo-bar');
});

it('should have inline style', () => {
	render(<Notice data-testid="notice" style={{ margin: 100 }} />);

	const notice = screen.getByTestId('notice');

	expect(notice).toHaveStyle({ margin: '100px' });
});

it('should have "id" attributes', () => {
	render(<Notice data-testid="notice" id="setting-alert" />);

	const notice = screen.getByTestId('notice');

	expect(notice).toHaveAttribute('id', 'setting-alert-Notice-root');
});

it('should not have with invalid html attribute', () => {
	render(
		// @ts-expect-error
		<Notice data-testid="notice" foo="bar" />
	);

	const notice = screen.getByTestId('notice');

	expect(notice).not.toHaveAttribute('foo');
});

it('should be dismissed', () => {
	render(<Notice data-testid="notice" isDismissed />);

	const notice = screen.queryByTestId('notice');

	expect(notice).not.toBeInTheDocument();
});

it('should call the "onDismiss" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<Notice data-testid="notice" isDismissable onDismiss={fn} />);

	const notice = screen.getByTestId('notice');
	const dismissButton = screen.getByRole('button', {
		name: 'Dismiss notice',
	});

	expect(notice).toBeInTheDocument();
	expect(dismissButton).toBeEnabled();

	await user.click(dismissButton);

	expect(fn).toBeCalledTimes(1);
});
