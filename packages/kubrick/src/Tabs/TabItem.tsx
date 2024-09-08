import { useRef } from 'react';
import { FocusRingProps, useFocusRing, useTab } from 'react-aria';
import { Node, TabListState } from 'react-stately';
import { useProps } from '../useProps';
import styles from './Tabs.module.scss';

interface TabItemProps extends Omit<FocusRingProps, 'children'> {
	item: Node<object>;
	state: TabListState<object>;
}

export const TabItem = (props: TabItemProps) => {
	const { item, state } = props;
	const { key, rendered } = item;
	const ref = useRef(null);
	const { componentProps, rootProps } = useProps('Tabs', props);
	const { isDisabled, isSelected, tabProps } = useTab({ key }, state, ref);
	const { focusProps, isFocusVisible } = useFocusRing(componentProps);

	return (
		<div
			{...rootProps({
				classNames: styles.tabItem,
				prefixedNames: 'item',
			})}
			{...tabProps}
			{...focusProps}
			data-disabled={isDisabled || undefined}
			data-focus-visible={isFocusVisible || undefined}
			data-selected={isSelected || undefined}
			ref={ref}
		>
			{rendered}
		</div>
	);
};
