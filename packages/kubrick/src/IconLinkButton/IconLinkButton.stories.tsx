import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, wordpress } from '@wordpress/icons';
import { IconLinkButton } from './IconLinkButton';

const meta: Meta<typeof IconLinkButton> = {
	args: {
		'aria-label': 'WordPress',
		children: <Icon data-testid="icon" icon={wordpress} />,
		href: 'https://wordpress.org',
	},
	argTypes: {
		target: {
			control: 'select',
			options: ['_blank', '_parent', '_self', '_top'],
		},
	},
	component: IconLinkButton,
	parameters: {
		controls: {
			include: [
				'aria-label',
				'excludeFromTabOrder',
				'href',
				'isDisabled',
				'size',
				'target',
				'variant',
				'onPress',
				'onHoverChange',
				'onFocusChange',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/IconLinkButton',
};

type Story = StoryObj<typeof IconLinkButton>;

export const Default: Story = {};

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
