import type { Meta, StoryObj } from '@storybook/react-vite';
import { Option, Select } from '../Select';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
	args: {
		label: 'WordPress should correct invalidly nested XHTML automatically',
	},
	argTypes: {
		children: {
			control: 'text',
		},
	},
	component: Checkbox,
	parameters: {
		controls: {
			include: [
				'label',
				'excludeFromTabOrder',
				'isDisabled',
				'isReadOnly',
				'isSelected',
				'onChange',
				'onFocusChange',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Checkbox',
};

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const ReadOnly: Story = {
	args: {
		defaultSelected: true,
		isReadOnly: true,
	},
	name: 'ReadOnly',
};

export const SelectedDefault: Story = {
	args: {
		defaultSelected: true,
	},
	name: 'Selected (default)',
};

/**
 * Use `isSelected` prop to control the selected state of the checkbox.
 * This prop is useful when you want to manage the checkbox state from
 * a parent component, external or global state, or context
 */
export const SelectedControlled: Story = {
	args: {
		isSelected: true,
	},
	name: 'Selected (controlled)',
};

export const WithDescription: Story = {
	args: {
		description:
			'When enabled, the editor will attempt to correct invalidly nested XHTML automatically. For example, if you open a `<strong>` tag but forget to close it, the editor will automatically close it for you.',
	},
};

export const WithAffix: Story = {
	args: {
		description:
			'Enable and set the frequency of API requests on the admin pages.',
		label: 'Enable once every',
		prefix: <strong>On admin pages:</strong>,
		suffix: (
			<Select name="frequency">
				<Option value="1">1 minute</Option>
			</Select>
		),
	},
};

export default meta;
