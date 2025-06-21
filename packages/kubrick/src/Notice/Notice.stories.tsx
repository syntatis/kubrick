import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notice } from './Notice';

const meta: Meta<typeof Notice> = {
	args: {
		children: 'Settings saved.',
	},
	argTypes: {
		children: {
			control: 'text',
		},
	},
	component: Notice,
	parameters: {
		controls: {
			include: [
				'children',
				'isDismissed',
				'isDismissable',
				'level',
				'onDismiss',
				'variant',
			],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Notice',
};

type Story = StoryObj<typeof Notice>;

export const Default: Story = {};

export const Dismissable: Story = {
	args: {
		isDismissable: true,
	},
};

export default meta;
