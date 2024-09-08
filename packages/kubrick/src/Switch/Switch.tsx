import { ReactNode, forwardRef } from 'react';
import {
	AriaSwitchProps,
	VisuallyHidden,
	useFocusRing,
	useId,
	useObjectRef,
	useSwitch,
} from 'react-aria';
import { useToggleState } from 'react-stately';
import { GlobalProps } from '../types';
import { useProps } from '../useProps';
import classes from './Switch.module.scss';

interface SwitchProps extends GlobalProps, Omit<AriaSwitchProps, 'children'> {
	/**
	 * A description for the field. Provides a hint such for what the input is more about.
	 */
	description?: ReactNode;
	/**
	 * The content to render as the label.
	 */
	label: ReactNode;
}

/**
 * ```jsx
 * import { Switch } from '@syntatis/kubrick';
 * ```
 *
 * The `Switch` component is a visual representation of a switch that can be toggled
 * on or off. It is similar to a checkbox but represents on/off values instead
 * of selection. Users can interact with the switch using either the mouse
 * or keyboard.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	(props, forwardedRef) => {
		const { description, label } = props;
		const ref = useObjectRef(forwardedRef);
		const state = useToggleState(props);
		const { clsx, componentProps, rootProps } = useProps('Switch', props);
		const { inputProps, isDisabled, labelProps } = useSwitch(
			componentProps,
			state,
			ref
		);
		const { focusProps, isFocusVisible } = useFocusRing();
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const descriptionId = description ? useId() : undefined;

		return (
			<>
				<label
					{...rootProps({
						classNames: [
							classes.root,
							{
								[classes.isDisabled]: isDisabled,
								[classes.isSelected]: state.isSelected,
							},
						],
					})}
					{...labelProps}
				>
					<VisuallyHidden>
						<input
							{...inputProps}
							{...focusProps}
							aria-describedby={descriptionId}
							ref={ref}
						/>
					</VisuallyHidden>
					<div
						className={clsx({
							classNames: [classes.input],
							prefixedNames: 'input',
						})}
					>
						<svg aria-hidden="true" height={28} width={44}>
							<rect
								className={clsx({
									classNames: [classes.track],
								})}
								height={20}
								rx={10}
								width={36}
								x={4}
								y={4}
							/>
							<circle
								className={clsx({
									classNames: [classes.thumb],
								})}
								cx={state.isSelected ? 30 : 14}
								cy={14}
								r={8}
							/>
							{isFocusVisible && (
								<rect
									className={clsx({
										classNames: [classes.focusRing],
										prefixedNames: 'focusRing',
									})}
									fill="none"
									height={26}
									rx={14}
									strokeWidth={2}
									width={42}
									x={1}
									y={1}
								/>
							)}
						</svg>
						<span
							className={clsx({
								prefixedNames: 'label',
							})}
						>
							{label}
						</span>
					</div>
				</label>
				{description && (
					<p
						className={clsx({
							classNames: ['description'],
							prefixedNames: 'description',
						})}
						id={descriptionId}
					>
						{description}
					</p>
				)}
			</>
		);
	}
);

Switch.displayName = 'Switch';
