import type { Meta, StoryObj } from '@storybook/react-vite';
import { download, Icon } from '@wordpress/icons';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
	args: {
		children: <Icon icon={download} />,
		label: 'Download',
	},
	component: IconButton,
	parameters: {
		controls: {
			include: [
				'label',
				'size',
				'variant',
				'type',
				'isDisabled',
				'excludeFromTabOrder',
				'onPress',
				'onHoverChange',
				'onFocusChange',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/IconButton',
};

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const VariantSecondary: Story = {
	args: {
		variant: 'secondary',
	},
	name: 'Variant (secondary)',
	parameters: {
		controls: {
			exclude: ['variant'],
		},
	},
};

export const SizeSmall: Story = {
	args: {
		size: 'small',
	},
	name: 'Size (small)',
	parameters: {
		controls: {
			exclude: ['size'],
		},
	},
};

export const SizeLarge: Story = {
	args: {
		size: 'large',
	},
	name: 'Size (large)',
	parameters: {
		controls: {
			exclude: ['size'],
		},
	},
};

export default meta;
