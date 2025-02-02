import { closeSmall, Icon } from '@wordpress/icons';
import { useRef } from 'react';
import { AriaButtonProps, useButton, useFocusRing } from 'react-aria';
import { useProps } from '../useProps';
import classes from './CloseButton.module.scss';

export const CloseButton = (
	props: Omit<AriaButtonProps, 'elementType' | 'target'>
) => {
	const { componentProps, rootProps } = useProps('Dialog', props);
	const ref = useRef<HTMLButtonElement>(null);
	const { buttonProps } = useButton(componentProps, ref);
	const { focusProps, isFocusVisible } = useFocusRing(componentProps);

	return (
		<button
			{...rootProps({
				classNames: [
					classes.root,
					{
						[classes.focusRing]: isFocusVisible,
					},
				],
				prefixedNames: 'close-button',
			})}
			{...buttonProps}
			{...focusProps}
		>
			<Icon icon={closeSmall} />
		</button>
	);
};
