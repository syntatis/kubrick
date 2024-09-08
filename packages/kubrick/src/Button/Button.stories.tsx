import type { Meta, StoryObj } from '@storybook/react';
import { Icon, download, upload } from '@wordpress/icons';
import { Spinner } from '../Spinner';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
	argTypes: {
		children: {
			control: {
				type: 'text',
			},
		},
	},
	args: {
		children: 'Save changes',
	},
	component: Button,
	parameters: {
		controls: {
			include: [
				'children',
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
	title: 'Components/Button',
};

type Story = StoryObj<typeof Button>;

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

export const VariantLink: Story = {
	args: {
		variant: 'link',
	},
	name: 'Variant (link)',
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

export const SizeHero: Story = {
	args: {
		size: 'hero',
	},
	name: 'Size (hero)',
	parameters: {
		controls: {
			exclude: ['size'],
		},
	},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const WithPrefix: Story = {
	args: {
		children: 'Upload',
		suffix: <Icon icon={upload} />,
	},
};

export const WithSuffix: Story = {
	args: {
		children: 'Download',
		suffix: <Icon icon={download} />,
	},
};

export const WithSpinner: Story = {
	args: {
		children: 'Loading...',
		isDisabled: true,
		prefix: <Spinner />,
	},
};

export default meta;
