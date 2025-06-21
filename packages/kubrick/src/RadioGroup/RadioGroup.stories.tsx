import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
	args: {
		children: [
			<Radio key="full-text" value="full-text">
				Full text
			</Radio>,
			<Radio key="excerpt" value="excerpt">
				Excerpt
			</Radio>,
		],
		label: 'For each post in a feed, include',
	},
	argTypes: {
		description: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
	},
	component: RadioGroup,
	parameters: {
		controls: {
			include: [
				'label',
				'description',
				'descriptionArea',
				'orientation',
				'isRequired',
				'isDisabled',
				'isReadOnly',
				'onChange',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/RadioGroup',
};

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const ReadOnly: Story = {
	args: {
		isReadOnly: true,
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
				return 'Please select a time format.';
			}
		},
	},
};

export const CheckedDefault: Story = {
	args: {
		defaultValue: 'excerpt',
	},
	name: 'Checked (default)',
};

export const CheckedControlled: Story = {
	args: {
		value: 'excerpt',
	},
	name: 'Checked (controlled)',
};

export const OrientationHorizontal: Story = {
	args: {
		defaultValue: 'full-text',
		orientation: 'horizontal',
	},
	name: 'Orientation (horizontal)',
	parameters: {
		controls: {
			exclude: ['orientation'],
		},
	},
};

export const WithDescription: Story = {
	args: {
		description: 'The time format will be used when displaying dates.',
	},
};

export const WithDescriptionBeforeInput: Story = {
	args: {
		description: 'The time format will be used when displaying dates.',
	},
	name: 'With Description (before-input)',
	parameters: {
		controls: {
			exclude: ['descriptionArea'],
		},
	},
};

export default meta;
