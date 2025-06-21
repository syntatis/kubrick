import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab } from './Tab';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
	component: Tabs,
	parameters: {
		controls: {
			include: ['isDisabled', 'defaultSelectedKey'],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Tabs',
};

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	render(props) {
		return (
			<Tabs {...props}>
				<Tab key="general" title="General">
					<h2>Business</h2>
					<p>
						This is where your business is located. Tax rates and shipping rates
						will use this address.
					</p>
				</Tab>
				<Tab key="shipping" title="Shipping">
					<h2>Shipping zones</h2>
					<p>
						A shipping zone consists of the region(s) you&apos;d like to ship to
						and the shipping method(s) offered. A shopper can only be matched to
						one zone, and we&apos;ll use their shipping address to show them the
						methods available in their area.
					</p>
				</Tab>
				<Tab key="payments" title="Payments">
					<h2>Payment Methods</h2>
					<p>
						Installed payment methods are listed below and can be sorted to
						control their display order on the frontend.
					</p>
				</Tab>
			</Tabs>
		);
	},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
	render: Default.render,
};

export const WithDisabledKeys: Story = {
	args: {
		disabledKeys: ['payments'],
	},
	render: Default.render,
};

export const WithDefaultSelected: Story = {
	args: {
		defaultSelectedKey: 'shipping',
	},
	render: Default.render,
};

export default meta;
