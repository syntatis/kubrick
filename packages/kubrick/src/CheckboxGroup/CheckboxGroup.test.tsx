import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Meta, { Default } from './CheckboxGroup.stories';

const CheckboxGroup = composeStory(Default, Meta);

it('should render the checkboxes', () => {
	render(<CheckboxGroup />);

	const root = screen.queryByRole('group', { name: 'Hide on screen' });

	expect(root).toBeInTheDocument();

	const permalink = screen.queryByRole('checkbox', { name: 'Permalink' });
	const excerpt = screen.queryByRole('checkbox', { name: 'Excerpt' });
	const author = screen.queryByRole('checkbox', { name: 'Author' });

	expect(permalink).toBeInTheDocument();
	expect(permalink).toBeEnabled();
	expect(excerpt).toBeInTheDocument();
	expect(excerpt).toBeEnabled();
	expect(author).toBeInTheDocument();
	expect(author).toBeEnabled();
});

it('should render the description', () => {
	render(
		<CheckboxGroup description="When checked the option will be removed from the editor" />
	);

	const root = screen.getByRole('group', { name: 'Hide on screen' });

	expect(root).toHaveAccessibleDescription(
		'When checked the option will be removed from the editor'
	);
});

it('should have static class', () => {
	render(<CheckboxGroup />);

	const root = screen.getByRole('group', { name: 'Hide on screen' });

	expect(root).toHaveClass('kubrick-CheckboxGroup-root');
});

it('should have custom class', () => {
	render(<CheckboxGroup className="post-type-setting" />);

	const root = screen.getByRole('group', { name: 'Hide on screen' });

	expect(root).toHaveClass('kubrick-CheckboxGroup-root', 'post-type-setting');
});

it('should have inline style', () => {
	render(<CheckboxGroup style={{ margin: 50 }} />);

	const root = screen.getByRole('group', { name: 'Hide on screen' });

	expect(root).toHaveStyle({ margin: '50px' });
});

it('should have "id" attribute', () => {
	render(<CheckboxGroup id="checkbox-group-1" />);

	const root = screen.getByRole('group', { name: 'Hide on screen' });

	expect(root).toHaveAttribute('id', 'checkbox-group-1');
});

it('should not have with invalid html attribute', () => {
	render(
		// @ts-expect-error
		<CheckboxGroup foo="bar" />
	);

	const root = screen.getByRole('group', { name: 'Hide on screen' });
	const checkboxes = screen.getAllByRole('checkbox');

	expect(root).not.toHaveAttribute('foo');

	checkboxes.forEach((checkbox) => {
		expect(checkbox).not.toHaveAttribute('foo');
	});
});

it('should retain the role', () => {
	render(<CheckboxGroup role="presentation" />);

	// Role "presentation" does not override the role "group".
	expect(screen.getByRole('group')).toBeInTheDocument();
});

it('should be disabled', () => {
	render(<CheckboxGroup isDisabled />);

	const checkboxes = screen.getAllByRole('checkbox');

	checkboxes.forEach((checkbox) => {
		expect(checkbox).toBeDisabled();
	});
});

it('should be readonly', () => {
	render(<CheckboxGroup isReadOnly />);

	const checkboxes = screen.getAllByRole('checkbox');

	checkboxes.forEach((checkbox) => {
		expect(checkbox).toHaveAttribute('aria-readonly', 'true');
	});
});

it('should be marked as invalid', () => {
	render(<CheckboxGroup isInvalid />);

	const checkboxes = screen.getAllByRole('checkbox');

	checkboxes.forEach((checkbox) => {
		expect(checkbox).toBeInvalid();
	});
});

it('should be marked as invalid and render the error message', () => {
	render(
		<CheckboxGroup errorMessage="Please select on of the options" isInvalid />
	);

	const checkboxes = screen.getAllByRole('checkbox');

	checkboxes.forEach((checkbox) => {
		expect(checkbox).toBeInvalid();
	});

	expect(screen.getByRole('group')).toHaveAccessibleDescription(
		'Please select on of the options'
	);
});

it('should be marked as required', () => {
	render(<CheckboxGroup isRequired />);

	expect(screen.getByRole('group')).toHaveAccessibleName('Hide on screen *');

	const checkboxes = screen.getAllByRole('checkbox');

	checkboxes.forEach((checkbox) => {
		expect(checkbox).toHaveAttribute('aria-required', 'true');
	});
});
