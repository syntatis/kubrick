import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { SelectGroup } from './SelectGroup';
import { SelectItem } from './SelectItem';

const meta: Meta<typeof Select> = {
	argTypes: {
		description: {
			control: 'text',
		},
		label: {
			control: 'text',
		},
		name: {
			control: 'text',
		},
	},
	args: {
		label: 'Site Language',
		name: 'site_language',
	},
	component: Select,
	parameters: {
		controls: {
			include: [
				'description',
				'descriptionArea',
				'isDisabled',
				'isInvalid',
				'isRequired',
				'label',
				'name',
				'onSelectionChange',
				'onFocusChange',
				'name',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Select',
};

type Story = StoryObj<typeof Select>;

export const Default: Story = {
	render(props) {
		return (
			<Select {...props}>
				<SelectItem value="">— Select —</SelectItem>
				<SelectGroup label="Installed">
					<SelectItem value="en_US">English (United State)</SelectItem>
					<SelectItem>Bahasa Indonesia</SelectItem>
				</SelectGroup>
				<SelectGroup label="Available">
					<SelectItem value="af">Afrikaans</SelectItem>
					<SelectItem value="an">Aragonés</SelectItem>
				</SelectGroup>
			</Select>
		);
	},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
	render: Default.render,
};

/**
 * Use the `isRequired` props to mark the select component as required. This will add an asterisk to the label.
 */
export const Required: Story = {
	args: {
		isRequired: true,
	},
	render: Default.render,
};

/**
 * Use the `selectedItem` prop to set the selected option. The `selectedItem` prop may be the value as passed
 * in the `value` prop of the `SelectItem` component, or the label if the `value` prop is not set.
 */
export const Selected: Story = {
	args: {
		selectedItem: 'id_ID',
	},
	render: Default.render,
};

/**
 * Use the `validate` prop to define custom validation logic for the selected item. If the value is considered
 * invalid, the `validate` prop should return a string. When an error message is provided, the component will
 * automatically be marked as invalid and display the error message. If the `validationBehavior` is set to
 * `native`, the error message will be shown to the user whenthe form is submitted.
 */
export const Validated: Story = {
	args: {
		selectedItem: 'Indonesian',
		validate(value) {
			if (
				![
					'Afrikaans',
					'Aragonés',
					'Bahasa Indonesia',
					'English (United State)',
					'አማርኛ',
				].includes(value as string)
			) {
				return 'Please select a valid language.';
			}
		},
	},
	render: Default.render,
};

/**
 * Use `isInvalid` prop to mark the select component as invalid. Unlike the `validate` that will mark the component
 * invalid, as well as display an error message, the `isInvalid` prop will only mark the component as invalid.
 * This is useful when you want to control the invalid state of the component from outside of the component.
 * If you'd like to display an error message, you can use the `errorMessage` prop.
 */
export const Invalid: Story = {
	args: {
		isInvalid: true,
	},
	name: 'Invalid (controlled)',
	render: Default.render,
};

export const WithErrorMessage: Story = {
	args: {
		errorMessage: 'An unexpected error occurred.',
	},
	name: 'With Error Message (controlled)',
	render: Default.render,
};

export const WithDescription: Story = {
	args: {
		description: 'Select the language for the site.',
	},
	render: Default.render,
};

export const WithDescriptionBeforeInput: Story = {
	args: {
		description: 'Select the language for the site.',
		descriptionArea: 'before-input',
	},
	name: 'With Description (before-input)',
	render: Default.render,
};

export default meta;
