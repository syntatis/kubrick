import { mergeProps, useObjectRef } from '@react-aria/utils';
import { forwardRef, ReactNode } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import { Affixable, GlobalProps } from '../types';
import { useProps } from '../useProps';
import classes from './Link.module.scss';

export interface LinkProps
	extends Affixable,
		GlobalProps,
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
	children: ReactNode;
	/**
	 * Change the link variant.
	 */
	variant?: 'danger' | 'warning';
}

/**
 * ```jsx
 * import { Link } from '@syntatis/kubrick';
 * ```
 *
 * The `Link` component is used to create an anchor element that links to another
 * resource or page. It comes with a couple of variants. It can also be extended
 * with a prefix and suffix to provide additional context, such as an icon or
 * a badge.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	(props, forwardedRef) => {
		const { children, prefix, suffix, variant } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('Link', props);
		const { linkProps } = useLink(componentProps, ref);
		const { hoverProps } = useHover(componentProps);
		const hasAffix = !!prefix || !!suffix;

		return (
			<a
				{...rootProps({
					classNames: [
						classes.root,
						{
							[classes.hasAffix]: hasAffix,
							[classes.variantDanger]: variant === 'danger',
							[classes.variantWarning]: variant === 'warning',
						},
					],
				})}
				{...mergeProps(linkProps, hoverProps)}
				ref={ref}
			>
				{prefix && (
					<span
						className={clsx({
							classNames: [classes.prefix, classes.affix],
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
							classNames: [classes.suffix, classes.affix],
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

Link.displayName = 'Link';
