import { mergeProps, useObjectRef } from '@react-aria/utils';
import { Icon } from '@wordpress/icons';
import { IconProps } from '@wordpress/icons/build-types/icon';
import { forwardRef, ReactElement } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import { GlobalProps } from '../types';
import { useProps } from '../useProps';
import classes from './IconLinkButton.module.scss';

export interface IconLinkButtonProps
	extends GlobalProps,
		Omit<HoverProps, 'isDisabled'>,
		Omit<
			AriaLinkOptions,
			| 'isDisabled'
			| 'onKeyDown'
			| 'onKeyUp'
			| 'onPress'
			| 'onPressChange'
			| 'onPressEnd'
			| 'onPressStart'
			| 'onPressUp'
		> {
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
 * import { IconLinkButton } from '@syntatis/kubrick';
 * ```
 *
 * The `IconLinkButton` component is a special link that appears like the `IconButton`
 * component. It's a mix of the `LinkButton` and `IconButton` components, so it
 * shares similar styles, sizes, and props like `href`, `target`, and `rel`.
 * One thing that sets it apart, since it will display an icon is that it
 * always keeps the 1:1 ratio. For the icon, we recommend using the official WordPress icon component [@wordpress/icons](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/).
 */
export const IconLinkButton = forwardRef<
	HTMLAnchorElement,
	IconLinkButtonProps
>((props, forwardedRef) => {
	const { children, size, variant = 'primary' } = props;
	const ref = useObjectRef(forwardedRef);
	const { componentProps, rootProps } = useProps('IconLinkButton', props);
	const { linkProps } = useLink(componentProps, ref);
	const { hoverProps } = useHover(componentProps);

	return (
		<a
			{...rootProps({
				classNames: [
					'button',
					`${size ? `button-${size}` : ''}`,
					`button-${variant}`,
					classes.root,
				],
			})}
			{...mergeProps(linkProps, hoverProps)}
			ref={ref}
		>
			{children}
		</a>
	);
});

IconLinkButton.displayName = 'IconLinkButton';
