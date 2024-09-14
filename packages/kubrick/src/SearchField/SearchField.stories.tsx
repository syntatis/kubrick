import type { Meta, StoryObj } from '@storybook/react';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
	argTypes: {
		description: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
	},
	args: {
		label: 'Search',
	},
	component: SearchField,
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
				'onSubmit',
				'onClear',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/SearchField',
};

type Story = StoryObj<typeof SearchField>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const ReadOnly: Story = {
	args: {
		isReadOnly: true,
		value: 'How to...',
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
				return 'Search query is invalid.';
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
		defaultValue: 'WooCommerce',
	},
	name: 'Value (default)',
};

export const ValueControlled: Story = {
	args: {
		value: 'WooCommerce',
	},
	name: 'Value (controlled)',
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: 'e.g. How to create a block?',
	},
};

export const WithDescription: Story = {
	args: {
		description: 'Search the post, pages, and other post types.',
	},
};

export const WithDescriptionBeforeInput: Story = {
	args: {
		description: 'Search the post, pages, and other post types.',
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
