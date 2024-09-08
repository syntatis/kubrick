import type { Meta, StoryObj } from '@storybook/react';
import { Icon, external, wordpress } from '@wordpress/icons';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
	argTypes: {
		children: {
			control: 'text',
		},
		target: {
			control: 'select',
			options: ['_blank', '_parent', '_self', '_top'],
		},
	},
	args: {
		children: 'WordPress',
		href: 'https://wordpress.org',
	},
	component: Link,
	parameters: {
		controls: {
			include: ['children', 'href', 'target', 'onFocusChange', 'onHoverChange'],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Link',
};

type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const VariantDanger: Story = {
	args: {
		variant: 'danger',
	},
	name: 'Variant (danger)',
};

export const VariantWarning: Story = {
	args: {
		variant: 'warning',
	},
	name: 'Variant (warning)',
};

export const WithPrefix: Story = {
	args: {
		prefix: <Icon icon={wordpress} />,
	},
};

export const WithSuffix: Story = {
	args: {
		suffix: <Icon icon={external} />,
	},
};

export default meta;
