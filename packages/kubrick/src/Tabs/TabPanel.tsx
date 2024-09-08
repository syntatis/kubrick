import { useRef } from 'react';
import { AriaTabPanelProps, useTabPanel } from 'react-aria';
import { TabListState } from 'react-stately';
import { useProps } from '../useProps';
import styles from './Tabs.module.scss';

interface TabPanelProps extends AriaTabPanelProps {
	state: TabListState<object>;
}

export const TabPanel = (props: TabPanelProps) => {
	const { state } = props;
	const ref = useRef(null);
	const { tabPanelProps } = useTabPanel(props, state, ref);
	const { clsx } = useProps('Tabs', props);

	return (
		<div
			{...tabPanelProps}
			className={clsx({
				classNames: styles.tabPanel,
				prefixedNames: 'panel',
			})}
			ref={ref}
		>
			{state.selectedItem?.props.children}
		</div>
	);
};
