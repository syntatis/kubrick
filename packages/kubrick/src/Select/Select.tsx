import { filterDOMProps } from '@react-aria/utils';
import { Children, ReactElement, ReactNode, forwardRef } from 'react';
import { AriaSelectProps, useObjectRef, useSelect } from 'react-aria';
import { Item, useSelectState } from 'react-stately';
import { GlobalProps } from '../types';
import { useErrorMessage } from '../useErrorMessage';
import { useProps } from '../useProps';
import classes from './Select.module.scss';
import { SelectItem, SelectItemProps } from './SelectItem';

type ChildItem = ReactElement<SelectItemProps, typeof SelectItem>;

interface SelectProps
	extends GlobalProps,
		Omit<
			AriaSelectProps<object>,
			| 'defaultSelectedKey'
			| 'disabledKeys'
			| 'items'
			| 'onOpenChange'
			| 'selectedKey'
		> {
	children: Array<ChildItem> | ChildItem;
	/**
	 * Provide hint for the select input.
	 */
	description?: ReactNode;
	/**
	 * Where to place the description.
	 *
	 * @default after-input
	 */
	descriptionArea?: 'after-input' | 'before-input';
	label?: ReactNode;
	name: string;
	selectedItem?: string;
}

function determineKey(props: SelectItemProps) {
	const { children, value } = props;

	return typeof value === 'string' ? value : children;
}

function getKeys(
	children: Array<ChildItem> | ChildItem
): Array<string> | undefined {
	return Children.map(children, (child) => {
		const { props } = child as ChildItem;

		return determineKey(props);
	});
}

function mapChildren(children: Array<ChildItem> | ChildItem) {
	return Children.map(children, (child) => {
		const { props } = child as ChildItem;
		const key = determineKey(props);

		return <Item {...props} key={key} textValue={key} />;
	});
}

/**
 * ```jsx
 * import { Select } from '@syntatis/kubrick';
 * ```
 *
 * The `Select` component represents the HTML select element. It allows you to create
 * a dropdown of options that users can select from. You can also group the options
 * if needed.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(props, forwardedRef) => {
		const {
			children,
			description,
			descriptionArea,
			errorMessage,
			isDisabled,
			isRequired,
			label,
			name,
			selectedItem,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('Select', props);
		const state = useSelectState({
			...props,
			children: mapChildren(children),
			defaultSelectedKey: selectedItem || getKeys(children)?.at(0),
		});
		const {
			descriptionProps,
			errorMessageProps,
			isInvalid,
			labelProps,
			triggerProps: selectProps,
			validationDetails,
			validationErrors,
		} = useSelect(props, state, ref);
		const { errorMessageList } = useErrorMessage({
			errorMessage,
			isInvalid,
			validationDetails,
			validationErrors,
		});

		return (
			<div
				{...rootProps({
					classNames: [
						classes.root,
						{
							[classes.descriptionBeforeInput]:
								descriptionArea === 'before-input',
							[classes.invalid]: isInvalid,
						},
					],
				})}
			>
				{label && (
					<label
						{...labelProps}
						className={clsx({
							classNames: [classes.label],
							prefixedNames: 'label',
						})}
						htmlFor={selectProps.id}
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
					</label>
				)}
				<select
					{...filterDOMProps(componentProps, { labelable: true })}
					aria-describedby={selectProps['aria-describedby']}
					aria-invalid={isInvalid || undefined}
					aria-labelledby={selectProps['aria-labelledby']}
					className={clsx({
						classNames: {
							[classes.input]: true,
						},
						prefixedNames: 'input',
					})}
					disabled={isDisabled}
					id={selectProps.id}
					name={name}
					onBlur={selectProps.onBlur}
					onChange={(e) => state.setSelectedKey(e.target.value)}
					onFocus={selectProps.onFocus}
					ref={ref}
					required={componentProps.isRequired}
					tabIndex={componentProps.excludeFromTabOrder ? -1 : undefined}
					value={state.selectedKey}
				>
					{children}
				</select>
				{errorMessageList.length >= 1 && (
					<div
						{...errorMessageProps}
						className={clsx({
							classNames: classes.errorMessage,
							prefixedNames: 'error-message',
						})}
					>
						{errorMessageList.map((message, index) => {
							return <p key={`error-message-${index}`}>{message}</p>;
						})}
					</div>
				)}
				{description && (
					<p
						{...descriptionProps}
						className={clsx({
							classNames: [classes.description, 'description'],
							prefixedNames: 'description',
						})}
					>
						{description}
					</p>
				)}
			</div>
		);
	}
);

Select.displayName = 'Select';
