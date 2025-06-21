import type { Meta, StoryObj } from '@storybook/react-vite';
import { external, Icon } from '@wordpress/icons';
import { LinkButton } from './LinkButton';

const meta: Meta<typeof LinkButton> = {
	args: {
		children: 'Go to WordPress',
		href: 'https://wordpress.org',
	},
	argTypes: {
		children: {
			control: {
				type: 'text',
			},
		},
		target: {
			control: {
				type: 'select',
			},
			options: ['_self', '_blank'],
		},
	},
	component: LinkButton,
	parameters: {
		controls: {
			include: [
				'children',
				'excludeFromTabOrder',
				'href',
				'size',
				'target',
				'variant',
				'onFocusChange',
				'onHoverChange',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/LinkButton',
};

type Story = StoryObj<typeof LinkButton>;

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

export const WithPrefix: Story = {
	args: {
		suffix: <Icon icon={external} />,
	},
};

export const WithSuffix: Story = {
	args: {
		suffix: <Icon icon={external} />,
	},
};

export default meta;
