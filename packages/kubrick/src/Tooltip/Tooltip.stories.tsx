import type { Meta, StoryObj } from '@storybook/react';
import { Icon, wordpress } from '@wordpress/icons';
import { IconButton } from '../IconButton';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
	args: {
		content:
			'Do not put essential information in a tooltip. Tooltips have low discoverability and have usability issues on devices without hover interactions.',
	},
	argTypes: {
		content: {
			control: 'text',
		},
	},
	component: Tooltip,
	decorators: [
		(Story) => {
			return (
				<div
					style={{
						display: 'flex',
						height: 180,
						maxWidth: 240,
						position: 'relative',
						width: '100%',
					}}
				>
					<Story />
				</div>
			);
		},
	],
	parameters: {
		controls: {
			include: ['content'],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Tooltip',
};

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
	render: (args) => (
		<Tooltip {...args}>
			<IconButton label="Info">
				<Icon icon={wordpress} />
			</IconButton>
		</Tooltip>
	),
};

export default meta;
