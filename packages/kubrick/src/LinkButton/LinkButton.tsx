import { mergeProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import { GlobalProps } from '../types';
import { useProps } from '../useProps';
import classes from './LinkButton.module.scss';

const DEFAULT_VARIANT = 'primary';

export interface LinkButtonProps
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
	/**
	 * The content to display inside the link.
	 */
	children?: ReactNode;
	/**
	 * The content displayed before the link label.
	 */
	prefix?: ReactNode;
	/**
	 * The size of the button.
	 */
	size?: 'hero' | 'large' | 'small';
	/**
	 * The content displayed after the link label.
	 */
	suffix?: ReactNode;
	/**
	 * Change the link variant.
	 *
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary';
}

/**
 * ```jsx
 * import { LinkButton } from '@syntatis/kubrick';
 * ```
 *
 * The `LinkButton` component is similar to the `Link` component. It creates an
 * anchor element but it will appear like the `Button` component where has the
 * same styles, variants, and sizes. It can also extended with a prefix or
 * suffix to provide additional context, such as an icon or a badge.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
	(props, forwardedRef) => {
		const { children, size, variant = DEFAULT_VARIANT } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('LinkButton', props);
		const { linkProps } = useLink(componentProps, ref);
		const { hoverProps } = useHover(componentProps);
		const { prefix, suffix } = props;
		const hasAffix = !!prefix || !!suffix;

		return (
			<a
				{...rootProps({
					classNames: [
						'button',
						`${size ? `button-${size}` : ''}`,
						`button-${variant}`,
						classes.root,
						{
							[classes.hasAffix]: hasAffix,
						},
					],
				})}
				{...mergeProps(linkProps, hoverProps)}
				ref={ref}
			>
				{prefix && (
					<span
						className={clsx({
							classNames: [classes.affix],
							prefixedNames: ['affix', 'prefix'],
						})}
					>
						{prefix}
					</span>
				)}
				{hasAffix ?
					<span
						className={clsx({
							classNames: [classes.affix],
							prefixedNames: ['affix', 'infix'],
						})}
					>
						{children}
					</span>
				:	children}
				{suffix && (
					<span
						className={clsx({
							classNames: [classes.affix],
							prefixedNames: ['affix', 'suffix'],
						})}
					>
						{suffix}
					</span>
				)}
			</a>
		);
	}
);

LinkButton.displayName = 'LinkButton';
