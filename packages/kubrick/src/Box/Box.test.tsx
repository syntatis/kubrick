import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Button } from '../Button';
import Meta, { Default } from './Box.stories';

const Box = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Box />);

	expect(
		screen.getByText(
			'Your site has critical issues that should be addressed as soon as possible to improve its performance and security.'
		)
	).toBeInTheDocument();
});

it('should have title', () => {
	render(<Box title="Site Health" />);

	expect(
		screen.getByRole('heading', { name: 'Site Health' })
	).toBeInTheDocument();
});

it('should have toggle button', async () => {
	render(<Box collapsible />);

	const button = screen.getByRole('button', { name: 'Toggle panel' });

	expect(button).toBeInTheDocument();
	expect(button).toBeEnabled();
});

it('should have footer', () => {
	render(<Box footer={<Button>Save changes</Button>} />);

	const button = screen.getByRole('button', { name: 'Save changes' });

	expect(button).toBeInTheDocument();
	expect(button).toBeEnabled();
});

it('should have static class', () => {
	render(<Box data-testid="box" />);

	expect(screen.getByTestId('box')).toHaveClass('kubrick-Box-root', 'postbox');
});

it('should have custom class name', () => {
	render(<Box className="box-1-class-name" data-testid="box" />);

	expect(screen.getByTestId('box')).toHaveClass('box-1-class-name');
});

it('should have inline style', () => {
	render(<Box data-testid="box" style={{ padding: 20 }} />);

	expect(screen.getByTestId('box')).toHaveStyle({
		padding: '20px',
	});
});

it('should have "id" attributes', () => {
	render(<Box data-testid="box" id="health-widget" />);

	expect(screen.getByTestId('box')).toHaveAttribute(
		'id',
		'health-widget-Box-root'
	);
});

it('should not have with invalid html attribute', () => {
	render(
		// @ts-expect-error
		<Box data-testid="box" foo="bar" />
	);

	expect(screen.getByTestId('box')).not.toHaveAttribute('foo');
});

it('should be collapsible', async () => {
	const user = userEvent.setup();

	render(
		<Box collapsible data-testid="box">
			This is the content of the box
		</Box>
	);

	const button = screen.getByRole('button', { name: 'Toggle panel' });
	const content = screen.getByText('This is the content of the box');

	expect(content).toBeVisible();

	await user.click(button);

	expect(content).not.toBeVisible();
});

it('should render collapsible label as string', async () => {
	const user = userEvent.setup();

	render(
		<Box collapsible="Toggle this box" data-testid="box">
			This is the content of the box
		</Box>
	);

	const button = screen.getByRole('button', { name: 'Toggle this box' });
	const content = screen.getByText('This is the content of the box');

	expect(content).toBeVisible();

	await user.click(button);

	expect(content).not.toBeVisible();
});

it('should render collapsible label as function', async () => {
	const user = userEvent.setup();

	render(
		<Box
			collapsible={(isExpanded) => (isExpanded ? 'Collapse' : 'Expand')}
			data-testid="box"
		>
			This is the content of the box
		</Box>
	);

	const button = screen.getByRole('button', { name: 'Collapse' });
	const content = screen.getByText('This is the content of the box');

	expect(content).toBeVisible();

	await user.click(button);

	expect(content).not.toBeVisible();
	expect(screen.queryByRole('button', { name: 'Expand' })).toBeEnabled();
});

it('should render "data-expanded" attribute', async () => {
	const user = userEvent.setup();

	render(<Box collapsible data-testid="box" />);

	const button = screen.getByRole('button', { name: 'Toggle panel' });

	expect(screen.getByTestId('box')).toHaveAttribute('data-expanded', 'true');

	await user.click(button);

	expect(screen.getByTestId('box')).not.toHaveAttribute('data-expanded');
});
