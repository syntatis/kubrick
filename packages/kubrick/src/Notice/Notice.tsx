import { useObjectRef } from '@react-aria/utils';
import { forwardRef, ReactNode } from 'react';
import { useButton } from 'react-aria';
import { GlobalProps } from '../types';
import { useProps } from '../useProps';
import classes from './Notice.module.scss';

const DEFAULT_LEVEL = 'info';
const DEFAULT_VARIANT = 'default';

interface NoticeProps extends GlobalProps {
	/**
	 * The content to display inside the notice.
	 */
	children: ReactNode;
	/**
	 * Determines whether the notice can be dismissed. You can customize the label
	 * of the dismiss button by passing an object, which is useful for
	 * translating the label.
	 *
	 * @default false
	 */
	isDismissable?: boolean | { label: string };
	/**
	 * Whether the notice should be dismissed. When it is set to `true`, the notice
	 * will be hidden. This is useful when the notice "dismissed" state should be
	 * controlled by an external source like a parent component, global state,
	 * or a context.
	 *
	 * @default false
	 */
	isDismissed?: boolean;
	/**
	 * The severity level of the notice.
	 *
	 * @default 'info'
	 */
	level?: 'error' | 'info' | 'success' | 'warning';
	/**
	 * The callback to call when the notice is dismissed.
	 */
	onDismiss?: () => void;
	/**
	 * The notice style variations.
	 *
	 * @default 'default'
	 */
	variant?: 'alt' | 'default';
}

/**
 * ```jsx
 * import { Notice } from '@syntatis/kubrick';
 * ```
 *
 * The `Notice` component is used to display a message to the user. It can be used
 * to provide feedback, warnings, errors, or success message. You can also choose
 * if users can dismiss it.
 *
 * Not that when a user dismisses the notice, developers need to decide what
 * happens next. If you want it to stay hidden after dismissal, you might
 * save that choice in the [WordPress option](https://developer.wordpress.org/plugins/settings/options-api/)
 * or [WordPress transient](https://developer.wordpress.org/apis/transients/).
 */
export const Notice = forwardRef<HTMLDivElement, NoticeProps>(
	(props, forwardedRef) => {
		const {
			children,
			isDismissable = false,
			isDismissed,
			level = DEFAULT_LEVEL,
			onDismiss,
			variant = DEFAULT_VARIANT,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const buttonRef = useObjectRef<HTMLButtonElement>(null);
		const { clsx, rootProps } = useProps('Notice', props);
		const { buttonProps } = useButton(
			{
				onPress: () => onDismiss?.(),
			},
			buttonRef
		);

		return (
			!isDismissed && (
				<div
					{...rootProps({
						classNames: [
							'notice',
							`notice-${level}`,
							classes.root,
							{ 'notice-alt': variant === 'alt' },
						],
					})}
					ref={ref}
				>
					<div
						className={clsx({
							classNames: classes.content,
							prefixedNames: 'content',
						})}
					>
						{children}
					</div>
					{isDismissable && (
						<button
							{...buttonProps}
							aria-label={
								typeof isDismissable === 'object' ?
									isDismissable.label
								:	'Dismiss notice'
							}
							className={clsx({
								classNames: ['notice-dismiss'],
								prefixedNames: 'dismiss-button',
							})}
							type="button"
						/>
					)}
				</div>
			)
		);
	}
);

Notice.displayName = 'Notice';
