import { mergeProps, useObjectRef } from '@react-aria/utils';
import { Icon } from '@wordpress/icons';
import { IconProps } from '@wordpress/icons/build-types/icon';
import { forwardRef, ReactElement } from 'react';
import {
	AriaButtonProps,
	HoverProps,
	useButton,
	useFocusRing,
	useHover,
} from 'react-aria';
import { GlobalProps } from '../types';
import { useProps } from '../useProps';
import classes from './IconButton.module.scss';

interface IconButtonProps
	extends GlobalProps,
		HoverProps,
		Omit<AriaButtonProps, 'aria-label' | 'elementType' | 'label' | 'target'> {
	children: ReactElement<IconProps, typeof Icon>;
	/**
	 * The button label.
	 *
	 * Since the button will only display an icon, it is required to provide the `aria-label`.
	 * This label will be used to give the button an accessible label.  Similar to a regular
	 * button It is highly recommended to provide the label that describes the action that
	 * the button will perform, such as 'Close dialog' or 'Download'.
	 * See [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label).
	 */
	label: string;
	/**
	 * The size of the button.
	 */
	size?: 'large' | 'small';
	/**
	 * The variant of the button.
	 *
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary';
}

/**
 * ```jsx
 * import { IconButton } from '@syntatis/kubrick';
 * ```
 *
 * The `IconButton` component is used to render a button with an icon as the
 * content. It works like to the `Button` component. It has the variations
 * and the sizes, except the size will always has a 1:1 ratio. It is
 * typically used when space is or may be limited such as in
 * a toolbar, a dialog, or a navigation.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(props, forwardedRef) => {
		const {
			autoFocus,
			children,
			label,
			role,
			size,
			variant = 'primary',
		} = props;
		const ref = useObjectRef(forwardedRef);
		const { buttonProps } = useButton(props, ref);
		const { hoverProps } = useHover(props);
		const { focusProps } = useFocusRing({ autoFocus });
		const { rootProps } = useProps('IconButton', props);

		return (
			<button
				{...rootProps({
					classNames: [
						'button',
						`${size ? `button-${size}` : ''}`,
						`button-${variant}`,
						classes.root,
					],
				})}
				{...mergeProps(buttonProps, hoverProps, focusProps)}
				aria-label={label}
				ref={ref}
				role={role}
			>
				{children}
			</button>
		);
	}
);

IconButton.displayName = 'IconButton';
