import { FocusableProvider } from '@react-aria/focus';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { FocusableElement } from '@react-types/shared';
import { ReactNode, forwardRef, useRef } from 'react';
import {
	AriaTooltipProps,
	Overlay,
	useOverlayPosition,
	useTooltip,
	useTooltipTrigger,
} from 'react-aria';
import { TooltipTriggerProps, useTooltipTriggerState } from 'react-stately';
import { GlobalProps } from '../types';
import { useProps } from '../useProps';
import styles from './Tooltip.module.scss';

export const DEFAULT_DELAY = 200;
export const DEFAULT_CLOSE_DELAY = 100;
export const DEFAULT_OFFSET = 5;

interface TooltipProps
	extends GlobalProps,
		AriaTooltipProps,
		TooltipTriggerProps {
	children: ReactNode;
	content: ReactNode;
	/**
	 * The additional offset applied along the main axis between the element and its anchor element.
	 *
	 * @default 5
	 */
	offset?: number;
}

/**
 * ```js
 * import { Tooltip } from '@syntatis/kubrick';
 * ```
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
	(props, forwardedRef) => {
		const {
			children,
			closeDelay,
			content,
			delay,
			offset = DEFAULT_OFFSET,
			role,
		} = props;
		const tooltipRef = useObjectRef(forwardedRef);
		const triggerRef = useRef<FocusableElement>(null);
		const { componentProps, rootProps } = useProps('Tooltip', props);
		const state = useTooltipTriggerState({
			...componentProps,
			closeDelay:
				typeof closeDelay !== 'number' ? DEFAULT_CLOSE_DELAY : closeDelay,
			delay: typeof delay !== 'number' ? DEFAULT_DELAY : delay,
		});
		const { overlayProps } = useOverlayPosition({
			isOpen: state.isOpen,
			offset,
			overlayRef: tooltipRef,
			placement: 'left',
			targetRef: triggerRef,
		});
		const { tooltipProps: triggerTooltipProps, triggerProps } =
			useTooltipTrigger(componentProps, state, triggerRef);
		const { tooltipProps } = useTooltip(
			{
				...mergeProps(componentProps, overlayProps),
				...triggerTooltipProps,
			},
			state
		);

		return (
			<>
				<FocusableProvider {...triggerProps} ref={triggerRef}>
					{children}
				</FocusableProvider>
				{state.isOpen && (
					<Overlay>
						<div
							{...rootProps({
								classNames: styles.root,
							})}
							{...tooltipProps}
							ref={tooltipRef}
							role={role}
							style={overlayProps.style}
						>
							{content}
						</div>
					</Overlay>
				)}
			</>
		);
	}
);

Tooltip.displayName = 'Tooltip';
