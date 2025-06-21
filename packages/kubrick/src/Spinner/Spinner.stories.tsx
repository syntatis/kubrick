import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
	args: {},
	component: Spinner,
	parameters: {
		controls: {
			include: ['size', 'aria-valuetext'],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Spinner',
};

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export default meta;
