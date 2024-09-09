import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Tabs } from '../Tabs';
import { Tab } from '../Tabs/Tab';
import { Dialog } from './Dialog';
import { DialogTrigger } from './DialogTrigger';

const meta: Meta<typeof Dialog> = {
	args: {
		title: 'Dialog',
	},
	component: Dialog,
	parameters: {
		controls: {
			include: ['title', 'maxWidth', 'maxHeight'],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Dialog',
};

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
	render(props) {
		return (
			<DialogTrigger
				render={() => (
					<Dialog {...props}>
						<div
							style={{
								boxSizing: 'border-box',
								height: '100%',
								padding: 20,
								width: '100%',
							}}
						>
							<p>Hello World</p>
						</div>
					</Dialog>
				)}
			>
				<Button>Open Dialog</Button>
			</DialogTrigger>
		);
	},
};

export const WithTabs: Story = {
	render(props) {
		return (
			<DialogTrigger
				portalSelector=".portal"
				render={() => (
					<Dialog {...props}>
						<Tabs>
							<Tab key="general" title="General">
								<p>
									Contains all the information you need to know about your site
									health.
								</p>
							</Tab>
							<Tab key="test" title="Tests">
								<p>Perform tests to check your site health.</p>
							</Tab>
							<Tab key="other" title="Other">
								<p>
									Contains all the information you need to know about your site
									health.
								</p>
							</Tab>
						</Tabs>
					</Dialog>
				)}
			>
				<Button>Open Dialog</Button>
			</DialogTrigger>
		);
	},
};

export const WithFooter: Story = {
	decorators: [],
	render(props) {
		return (
			<DialogTrigger
				portalSelector=".portal"
				render={() => (
					<Dialog
						{...props}
						footer={
							<div
								style={{ display: 'flex', justifyContent: 'end', padding: 10 }}
							>
								<Button>Save changes</Button>
							</div>
						}
					>
						<Tabs>
							<Tab key="general" title="General">
								<p>
									Contains all the information you need to know about your site
									health.
								</p>
							</Tab>
							<Tab key="test" title="Tests">
								<p>Perform tests to check your site health.</p>
							</Tab>
							<Tab key="other" title="Other">
								<p>
									Contains all the information you need to know about your site
									health.
								</p>
							</Tab>
						</Tabs>
					</Dialog>
				)}
			>
				<Button>Open Dialog</Button>
			</DialogTrigger>
		);
	},
};

export default meta;
