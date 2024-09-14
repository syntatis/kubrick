import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Select } from '../Select';
import { Option } from '../Select/Option';
import { Tabs } from '../Tabs';
import { Tab } from '../Tabs/Tab';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
	argTypes: {
		children: {
			control: 'text',
		},
		collapsible: {
			control: 'boolean',
		},
		title: {
			control: 'text',
		},
	},
	args: {
		children:
			'Your site has critical issues that should be addressed as soon as possible to improve its performance and security.',
	},
	component: Box,
	parameters: {
		controls: {
			include: ['title', 'children', 'collapsible', 'footer'],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Box',
};

type Story = StoryObj<typeof Box>;

export const Default: Story = {};

export const Collapsible: Story = {
	args: {
		collapsible: true,
	},
};

export const WithTitle: Story = {
	args: {
		title: 'Site Health',
	},
	name: 'With Title (as string)',
};

export const WithAdvancedTitle: Story = {
	args: {
		collapsible: true,
		title: (
			<>
				<h2>Site Health</h2> &mdash;{' '}
				<Select name="site">
					<Option value="blog">Blog</Option>
					<Option value="shop">Shop</Option>
				</Select>
			</>
		),
	},
	name: 'With Title (as element)',
};

export const WithFooter: Story = {
	args: {
		footer: <Button variant="secondary">Check again</Button>,
	},
};

export const WithTabs: Story = {
	render(props) {
		return (
			<Box {...props} title="Site Health">
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
			</Box>
		);
	},
};

export const WithTabsVertical: Story = {
	name: 'With Tabs (vertical)',
	render(props) {
		return (
			<Box {...props} title="Site Health">
				<Tabs orientation="vertical">
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
			</Box>
		);
	},
};

export default meta;
