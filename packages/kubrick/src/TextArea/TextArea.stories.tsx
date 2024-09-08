import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
	argTypes: {
		description: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
	},
	args: {
		label: 'Tagline',
	},
	component: TextArea,
	parameters: {
		controls: {
			include: [
				'label',
				'description',
				'descriptionArea',
				'rows',
				'cols',
				'isCode',
				'isDisabled',
				'isReadOnly',
				'isRequired',
				'onChange',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/TextArea',
};

type Story = StoryObj<typeof TextArea>;

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
	parameters: {
		controls: {
			exclude: ['isRequired'],
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
		placeholder: 'e.g. A tagline for your site.',
	},
};

export const WithDescription: Story = {
	args: {
		description: 'In a few words, explain what this site is about.',
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

export default meta;
