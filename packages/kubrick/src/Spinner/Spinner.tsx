import { HTMLAttributes, forwardRef } from 'react';
import { VisuallyHidden, useObjectRef } from 'react-aria';
import src from '../../../../wordpress/wp-admin/images/spinner-2x.gif';
import { GlobalProps } from '../types';
import { useProps } from '../useProps';

const DEFAULT_SIZE = 24;

interface SpinnerProps extends GlobalProps, HTMLAttributes<HTMLSpanElement> {
	/**
	 * Defines the text to announce to screen reader.
	 *
	 * @default Loading
	 */
	label?: string;
	/**
	 * Defines the size, the width and the height, of the spinner.
	 *
	 * @default 24
	 */
	size?: number;
}

/**
 * ```jsx
 * import { Spinner } from '@syntatis/kubrick';
 * ```
 *
 * The `Spinner` component is is a visual indicator that shows the user that something
 * is loading. You can customize the size of the spinner as well as the text that
 * will be announced to screen readers.
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
	(props, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);
		const { componentProps, rootProps } = useProps('Spinner', props);
		const { role = 'status', size = DEFAULT_SIZE } = componentProps;

		return (
			<span ref={ref} role={role} {...rootProps()}>
				<VisuallyHidden>{componentProps.label || 'Loading'}</VisuallyHidden>
				<img aria-hidden="true" height={size} src={src} width={size} />
			</span>
		);
	}
);

Spinner.displayName = 'Spinner';
