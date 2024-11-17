import { ReactElement, forwardRef, useEffect } from 'react';
import { AriaTabListOptions, useObjectRef, useTabList } from 'react-aria';
import { useTabListState } from 'react-stately';
import { GlobalProps } from '../types';
import { useProps } from '../useProps';
import { TabProps } from './Tab';
import { TabItem } from './TabItem';
import { TabPanel } from './TabPanel';
import styles from './Tabs.module.scss';
import { useTabsProvider } from './TabsProvider';

interface TabsProps
	extends GlobalProps,
		Omit<AriaTabListOptions<object>, 'items'> {
	children: Array<ReactElement<TabProps>> | ReactElement<TabProps>;
}

/**
 * ```jsx
 * import { Tabs } from '@syntatis/kubrick';
 * ```
 *
 * A `Tabs` component is used to organize content. It consists a series of tabs,
 * each representing a section of content. When a tab is clicked or selected,
 * the corresponding content associated with the tab is displayed while
 * hiding the content of the other section. This is useful when
 * you have a long list of content to display in a limited
 * space.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
	(props: TabsProps, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);
		const { context, navigate } = useTabsProvider();
		const { clsx, componentProps, rootProps } = useProps('Tabs', props);
		const state = useTabListState(componentProps);
		let { orientation } = props;

		orientation = context === 'settings' ? 'horizontal' : orientation;
		const { tabListProps } = useTabList(
			{
				...componentProps,
				keyboardActivation: navigate ? 'manual' : undefined,
				orientation,
			},
			state,
			ref
		);

		return (
			<div
				{...rootProps({
					classNames: styles.root,
				})}
				data-context={context}
				data-orientation={orientation}
			>
				<div
					{...tabListProps}
					className={clsx({
						classNames: styles.tabItems,
						prefixedNames: 'items',
					})}
					ref={ref}
				>
					{[...state.collection].map((item) => {
						return <TabItem item={item} key={item.key} state={state} />;
					})}
				</div>
				<TabPanel key={state.selectedItem?.key} state={state} />
			</div>
		);
	}
);

Tabs.displayName = 'Tabs';
