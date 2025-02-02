import { useObjectRef } from '@react-aria/utils';
import { forwardRef, ReactElement } from 'react';
import { AriaRadioGroupProps, useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';
import { GlobalProps } from '../types';
import { useProps } from '../useProps';
import { Radio, RadioContext, RadioProps } from './Radio';
import classes from './RadioGroup.module.scss';

interface RadioGroupProps extends AriaRadioGroupProps, GlobalProps {
	children:
		| Array<ReactElement<RadioProps, typeof Radio>>
		| ReactElement<RadioProps, typeof Radio>;
	/**
	 * Where to place the description.
	 *
	 * @before 'after-input'
	 */
	descriptionArea?: 'after-input' | 'before-input';
	/**
	 * The orientation of the checkbox group.
	 *
	 * @default 'vertical'
	 */
	orientation?: 'horizontal' | 'vertical';
}

/**
 * ```jsx
 * import { RadioGroup } from '@syntatis/kubrick';
 * ```
 *
 * The `RadioGroup` component helps manage a group of `Radio` buttons. It handles
 * the state for the group and provides the necessary accessibility features.
 * This component is useful when you need to show multiple options, but
 * the user should only pick one.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
	(props, forwardedRef) => {
		const { children, isRequired, label } = props;
		const { description, descriptionArea } = props;
		const { clsx, componentProps, rootProps } = useProps('RadioGroup', props);
		const ref = useObjectRef(forwardedRef);
		const state = useRadioGroupState(componentProps);
		const {
			descriptionProps,
			errorMessageProps,
			isInvalid,
			labelProps,
			radioGroupProps,
			validationErrors,
		} = useRadioGroup(componentProps, state);

		return (
			<div
				{...rootProps({
					classNames: [
						classes.root,
						{
							[classes.descriptionBeforeInput]:
								descriptionArea === 'before-input',
						},
					],
				})}
				{...radioGroupProps}
				data-description-area={descriptionArea}
				ref={ref}
			>
				{label && (
					<span
						{...labelProps}
						className={clsx({
							classNames: classes.label,
							prefixedNames: 'label',
						})}
					>
						{label}
						{isRequired ?
							<span
								className={clsx({
									classNames: classes.markedRequired,
									prefixedNames: 'marked-required',
								})}
							>
								*
							</span>
						:	''}
					</span>
				)}
				<RadioContext.Provider value={state}>
					<div
						className={clsx({
							classNames: classes.items,
							prefixedNames: 'items',
						})}
					>
						{children}
					</div>
				</RadioContext.Provider>
				{isInvalid && (
					<div
						{...errorMessageProps}
						className={clsx({
							classNames: classes.errorMessage,
							prefixedNames: 'error-message',
						})}
					>
						{validationErrors.join(' ')}
					</div>
				)}
				{description && (
					<div
						{...descriptionProps}
						className={clsx({
							classNames: classes.description,
							prefixedNames: 'description',
						})}
					>
						{description}
					</div>
				)}
			</div>
		);
	}
);

RadioGroup.displayName = 'RadioGroup';
