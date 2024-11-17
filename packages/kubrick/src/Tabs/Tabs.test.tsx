import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Meta, { Default } from './Tabs.stories';
import { TabsProvider } from './TabsProvider';

const Tabs = composeStory(Default, Meta);

it('should render the component', () => {
	render(<Tabs />);

	const tabList = screen.queryByRole('tablist');
	const tabItems = screen.queryAllByRole('tab');

	expect(tabList).toBeInTheDocument();
	expect(tabList).toHaveAttribute('aria-orientation', 'horizontal');

	tabItems.forEach((tabItem) => {
		expect(tabList).toContainElement(tabItem);
	});

	expect(tabItems[0]).toHaveAttribute('aria-selected', 'true');
	expect(tabItems[1]).toHaveAttribute('aria-selected', 'false');
	expect(tabItems[2]).toHaveAttribute('aria-selected', 'false');
});

it('should be disabled', () => {
	render(<Tabs isDisabled />);

	const tabItems = screen.queryAllByRole('tab');

	tabItems.forEach((tabItem) => {
		expect(tabItem).toHaveAttribute('aria-disabled', 'true');
	});
});

it('should disable selected key', () => {
	render(<Tabs disabledKeys={['shipping']} />);

	const shipping = screen.queryByText('Shipping');

	expect(shipping).toHaveAttribute('aria-disabled', 'true');

	const general = screen.queryByText('General');
	const payments = screen.queryByText('Payments');

	expect(general).not.toHaveAttribute('aria-disabled');
	expect(payments).not.toHaveAttribute('aria-disabled');
});

it('should select selected key', () => {
	render(<Tabs defaultSelectedKey="shipping" />);

	const shipping = screen.queryByText('Shipping');

	expect(shipping).toHaveAttribute('aria-selected', 'true');

	const general = screen.queryByText('General');
	const payments = screen.queryByText('Payments');

	expect(general).toHaveAttribute('aria-selected', 'false');
	expect(payments).toHaveAttribute('aria-selected', 'false');
});

it('should retain orientation', () => {
	render(<Tabs orientation="vertical" />);

	const tabList = screen.queryByRole('tablist');

	expect(tabList).toHaveAttribute('aria-orientation', 'horizontal');
});

it('should render item as link', () => {
	render(
		<TabsProvider navigate url="http://localhost/app">
			<Tabs />
		</TabsProvider>
	);

	const general = screen.queryByText('General');
	const shipping = screen.queryByText('Shipping');
	const payments = screen.queryByText('Payments');

	expect(general).toHaveRole('link');
	expect(general).toHaveAttribute('href', 'http://localhost/app?tab=general');
	expect(shipping).toHaveRole('link');
	expect(shipping).toHaveAttribute('href', 'http://localhost/app?tab=shipping');
	expect(payments).toHaveRole('link');
	expect(payments).toHaveAttribute('href', 'http://localhost/app?tab=payments');
});
