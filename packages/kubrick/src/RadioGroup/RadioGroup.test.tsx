import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Radio } from './Radio';
import Meta, { Default } from './RadioGroup.stories';

const RadioGroup = composeStory(Default, Meta);

it('should render the component', () => {
	render(<RadioGroup />);

	const firstRadio = screen.queryByRole('radio', { name: 'Full text' });

	expect(firstRadio).toBeInTheDocument();
	expect(firstRadio).toBeEnabled();
	expect(firstRadio).toHaveAttribute('type', 'radio');

	const secondRadio = screen.queryByRole('radio', { name: 'Excerpt' });

	expect(secondRadio).toBeInTheDocument();
	expect(secondRadio).toBeEnabled();
	expect(secondRadio).toHaveAttribute('type', 'radio');
});

it('should have description', () => {
	render(
		<RadioGroup description="The length of text to display on the feed" />
	);

	const group = screen.getByRole('radiogroup', {
		name: 'For each post in a feed, include',
	});

	expect(group).toHaveAccessibleDescription(
		'The length of text to display on the feed'
	);
});

it('should have static class', () => {
	render(
		<RadioGroup description="The length of text to display on the feed" />
	);

	const group = screen.getByRole('radiogroup', {
		name: 'For each post in a feed, include',
	});

	expect(group).toHaveClass('kubrick-RadioGroup-root');

	screen.getAllByRole('radio').forEach((radio) => {
		expect(radio).toHaveClass('kubrick-Radio-input');
		expect(radio.parentNode).toHaveClass('kubrick-Radio-root');
	});
});

it('should have custom class', () => {
	render(
		<RadioGroup className="radio-group-class">
			<Radio className="radio-item-class" value="full-text">
				Full text
			</Radio>
		</RadioGroup>
	);

	const group = screen.getByRole('radiogroup', {
		name: 'For each post in a feed, include',
	});

	expect(group).toHaveClass('radio-group-class');

	screen.getAllByRole('radio').forEach((radio) => {
		expect(radio.parentNode).toHaveClass('radio-item-class');
	});
});

it('should have inline style', () => {
	render(
		<RadioGroup style={{ margin: 15 }}>
			<Radio style={{ padding: 10 }} value="excerpt">
				Excerpt
			</Radio>
		</RadioGroup>
	);

	const group = screen.getByRole('radiogroup', {
		name: 'For each post in a feed, include',
	});

	expect(group).toHaveStyle({ margin: '15px' });

	screen.getAllByRole('radio').forEach((radio) => {
		expect(radio.parentNode).toHaveStyle({
			padding: '10px',
		});
	});
});

it('should have "id" attribute', async () => {
	render(<RadioGroup id="radio-group-1" />);

	const group = screen.getByRole('radiogroup', {
		name: 'For each post in a feed, include',
	});

	expect(group).toHaveAttribute('id', 'radio-group-1');
});

it('should not have with invalid html attribute', async () => {
	render(
		// @ts-expect-error
		<RadioGroup foo="bar" />
	);

	const group = screen.getByRole('radiogroup', {
		name: 'For each post in a feed, include',
	});

	expect(group).not.toHaveAttribute('foo');

	screen.getAllByRole('radio').forEach((radio) => {
		expect(radio.parentNode).not.toHaveAttribute('foo');
	});
});

it('should retain the role', () => {
	render(<RadioGroup role="presentation" />);

	const group = screen.getByRole('radiogroup');

	// Role "presentation" does not override the role "radiogroup".
	expect(group).toBeInTheDocument();
});

it('should have default orientation', () => {
	render(<RadioGroup />);

	expect(screen.getByRole('radiogroup')).toHaveAttribute(
		'aria-orientation',
		'vertical'
	);
});

it('should set orientation to horizontal', () => {
	render(<RadioGroup orientation="horizontal" />);

	expect(screen.getByRole('radiogroup')).toHaveAttribute(
		'aria-orientation',
		'horizontal'
	);
});

it('should be checked', async () => {
	const user = userEvent.setup();

	render(<RadioGroup label="For each post in a feed, include" />);

	const firstRadio = screen.getByRole('radio', { name: 'Full text' });
	const secondRadio = screen.getByRole('radio', { name: 'Excerpt' });

	expect(firstRadio).not.toBeChecked();
	expect(secondRadio).not.toBeChecked();

	await user.click(firstRadio);

	expect(firstRadio).toBeChecked();
	expect(secondRadio).not.toBeChecked();
});

it('should be checked (by default)', async () => {
	const user = userEvent.setup();

	render(<RadioGroup defaultValue="full-text"></RadioGroup>);

	const fullText = screen.getByRole('radio', { name: 'Full text' });
	const excerpt = screen.getByRole('radio', { name: 'Excerpt' });

	expect(fullText).toBeChecked();
	expect(excerpt).not.toBeChecked();

	await user.click(excerpt);

	expect(fullText).not.toBeChecked();
	expect(excerpt).toBeChecked();
});

it('should be checked (controlled)', async () => {
	const user = userEvent.setup();

	render(<RadioGroup value="full-text" />);

	const fullText = screen.getByRole('radio', { name: 'Full text' });
	const excerpt = screen.getByRole('radio', { name: 'Excerpt' });

	expect(fullText).toBeChecked();
	expect(excerpt).not.toBeChecked();

	await user.click(excerpt);

	expect(fullText).toBeChecked(); // Remains to be checked.
	expect(excerpt).not.toBeChecked();
});

it('should be disabled', () => {
	render(<RadioGroup isDisabled />);

	screen.getAllByRole('radio').forEach((radio) => {
		expect(radio).toBeDisabled();
	});
});

it('should be readonly', async () => {
	const user = userEvent.setup();

	render(<RadioGroup defaultValue="full-text" isReadOnly />);

	const group = screen.getByRole('radiogroup', {
		name: 'For each post in a feed, include',
	});

	expect(group).toHaveAttribute('aria-readonly', 'true');

	const fullText = screen.getByRole('radio', { name: 'Full text' });
	const excerpt = screen.getByRole('radio', { name: 'Excerpt' });

	expect(fullText).toBeChecked();
	expect(excerpt).not.toBeChecked();

	await user.click(excerpt);

	expect(excerpt).not.toBeChecked();
});

it('should be marked as invalid and show error message', () => {
	render(
		<RadioGroup
			label="For each post in a feed, include"
			validate={() => 'Please select one of the options!'}
			value=""
		>
			<Radio value="full-text">Full text</Radio>
			<Radio value="excerpt">Excerpt</Radio>
		</RadioGroup>
	);

	expect(
		screen.getByRole('radiogroup', {
			name: 'For each post in a feed, include',
		})
	).toBeInvalid();

	expect(
		screen.getByRole('radiogroup', {
			name: 'For each post in a feed, include',
		})
	).toHaveAccessibleDescription('Please select one of the options!');
});

it('should be marked as required', () => {
	render(
		<RadioGroup isRequired label="For each post in a feed, include">
			<Radio value="full-text">Full text</Radio>
			<Radio value="excerpt">Excerpt</Radio>
		</RadioGroup>
	);

	expect(
		screen.getByRole('radiogroup', {
			// Has the asterisk.
			name: 'For each post in a feed, include *',
		})
	).toHaveAttribute('aria-required', 'true');
});

it('should call the "onChange" callback', async () => {
	const fn = vi.fn();
	const user = userEvent.setup();

	render(<RadioGroup defaultValue="full-text" onChange={fn} />);

	const fullText = screen.getByRole('radio', { name: 'Full text' });
	const excerpt = screen.getByRole('radio', { name: 'Excerpt' });

	expect(fullText).toBeChecked();
	expect(excerpt).not.toBeChecked();

	await user.click(excerpt);

	expect(fullText).not.toBeChecked();
	expect(excerpt).toBeChecked();
	expect(fn).toBeCalledTimes(1);
	expect(fn).toBeCalledWith('excerpt');
});
