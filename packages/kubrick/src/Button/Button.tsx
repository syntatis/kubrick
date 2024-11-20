import { mergeProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import {
	AriaButtonProps,
	HoverProps,
	useButton,
	useFocusRing,
	useHover,
} from 'react-aria';
import { Affixable, GlobalProps } from '../types';
import { useProps } from '../useProps';
import classes from './Button.module.scss';

interface ButtonProps
	extends AriaButtonProps,
		GlobalProps,
		Affixable,
		HoverProps {
	children?: ReactNode;
	/**
	 * The size of the button.
	 */
	size?: 'hero' | 'large' | 'small';
	/**
	 * The variant of the button.
	 *
	 * @default 'primary'
	 */
	variant?: 'link' | 'link-danger' | 'primary' | 'secondary';
}

/**
 * ```jsx
 * import { Button } from '@syntatis/kubrick';
 * ```
 *
 * The `Button` component represents the HTML `button` element to trigger an action
 * or event with mouse, touch, or keyboard. It comes in different styles and sizes
 * that you can choose from. You can also add icons or other type of content
 * before or after the button label.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, forwardedRef) => {
		const {
			autoFocus,
			children,
			prefix,
			role,
			size,
			suffix,
			variant = 'primary',
		} = props;
		const ref = useObjectRef(forwardedRef);
		const { buttonProps } = useButton(props, ref);
		const { hoverProps } = useHover(props);
		const { focusProps } = useFocusRing({ autoFocus });
		const { clsx, rootProps } = useProps('Button', props);
		const hasAffix = !!prefix || !!suffix;

		return (
			<button
				{...rootProps({
					classNames: [
						'button',
						`${size ? `button-${size}` : ''}`,
						`button-${variant === 'link-danger' ? 'link' : variant}`,
						{
							'button-link-delete': variant === 'link-danger',
							[classes.hasAffix]: hasAffix,
						},
						classes.root,
					],
				})}
				{...mergeProps(buttonProps, hoverProps, focusProps)}
				ref={ref}
				role={role}
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
			</button>
		);
	}
);

Button.displayName = 'Button';
