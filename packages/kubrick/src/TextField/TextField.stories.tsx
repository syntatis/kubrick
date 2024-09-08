import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
	argTypes: {
		description: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
	},
	args: {
		id: 'site-name',
		label: 'Site Name',
	},
	component: TextField,
	parameters: {
		controls: {
			include: [
				'label',
				'type',
				'description',
				'descriptionArea',
				'isDisabled',
				'isReadOnly',
				'isRequired',
				'onChange',
				'className',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/TextField',
};

type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const ReadOnly: Story = {
	args: {
		isReadOnly: true,
		value: 'Hello World',
	},
	name: 'ReadOnly',
};

export const Required: Story = {
	args: {
		isRequired: true,
	},
};

export const Validated: Story = {
	args: {
		validate(value) {
			if (!value) {
				return 'This field is required.';
			}
		},
	},
};

export const Invalid: Story = {
	args: {
		isInvalid: true,
	},
	name: 'Invalid (controlled)',
};

export const ValueDefault: Story = {
	args: {
		defaultValue: 'Hello World',
	},
	name: 'Value (default)',
};

export const ValueControlled: Story = {
	args: {
		value: 'Hello World',
	},
	name: 'Value (controlled)',
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: 'e.g. WordPress',
	},
};

export const WithDescription: Story = {
	args: {
		description: 'In a few words, explain what this site is about.',
	},
};

export const WithAffix: Story = {
	args: {
		description:
			'The number of posts displayed on your selected posts page. Displaying 10 or less can improve usability, SEO, and page speed. May not apply to themes with infinite scrolling.',
		label: 'Posts per page',
		prefix: 'Show at most',
		suffix: 'posts.',
		type: 'number',
	},
};

export const WithDescriptionBeforeInput: Story = {
	args: {
		description: 'In a few words, explain what this site is about.',
		descriptionArea: 'before-input',
	},
	name: 'With Description (before-input)',
	parameters: {
		controls: {
			exclude: ['descriptionArea'],
		},
	},
};

export const WithErrorMessageControlled: Story = {
	args: {
		errorMessage: 'An unexpected error occurred!',
	},
	name: 'With Error Message (controlled)',
};

export default meta;
