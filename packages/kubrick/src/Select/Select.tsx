import { filterDOMProps } from '@react-aria/utils';
import { forwardRef, ReactElement, ReactNode } from 'react';
import { AriaSelectProps, useObjectRef, useSelect } from 'react-aria';
import { Item, useSelectState } from 'react-stately';
import { GlobalProps } from '../types';
import { useErrorMessage } from '../useErrorMessage';
import { useProps } from '../useProps';
import { Option, OptionProps } from './Option';
import classes from './Select.module.scss';

type ChildItem = ReactElement<OptionProps, typeof Option>;

interface SelectProps
	extends
		GlobalProps,
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
	/**
	 * Content or element to dis before the input.
	 */
	prefix?: ReactNode;
	selectedItem?: string;
	/**
	 * Content or element to display after the input.
	 */
	suffix?: ReactNode;
}

function determineKey(props: OptionProps) {
	const { children, value } = props;

	return typeof value === 'string' ? value : children;
}

function getKeys(children: Array<ChildItem> | ChildItem): Array<string> {
	return toChildArray(children).map((child) => determineKey(child.props));
}

function mapChildren(children: Array<ChildItem> | ChildItem) {
	return toChildArray(children).map((child) => {
		const key = determineKey(child.props);

		return <Item key={key} {...child.props} textValue={key} />;
	});
}

function toChildArray(
	children: Array<ChildItem> | ChildItem
): Array<ChildItem> {
	return Array.isArray(children) ? children : [children];
}

/**
 * ```jsx
 * import { Select } from '@syntatis/kubrick';
 * ```
 *
 * The `Select` component works like the standard HTML `select` element, allowing
 * you to create a dropdown menu with options for users to choose from. You can
 * organize the options into groups, making it easier to manage and display
 * related choices together, which is especially useful when you have
 * a long list of options and want to group similar ones for
 * a cleaner look.
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
			prefix,
			selectedItem,
			suffix,
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
				<div
					className={clsx({
						classNames: classes.inputWrapper,
						prefixedNames: 'input-wrapper',
					})}
				>
					{prefix && (
						<div
							className={clsx({
								classNames: classes.prefix,
								prefixedNames: 'prefix',
							})}
						>
							{prefix}
						</div>
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
						value={state.selectedKey !== null ? state.selectedKey : undefined}
					>
						{children}
					</select>
					{suffix && (
						<div
							className={clsx({
								classNames: classes.suffix,
								prefixedNames: 'suffix',
							})}
						>
							{suffix}
						</div>
					)}
				</div>
				{errorMessageList.length >= 1 && (
					<div
						{...errorMessageProps}
						className={clsx({
							classNames: classes.errorMessage,
							prefixedNames: 'error-message',
						})}
					>
						{errorMessageList.map((message) => {
							return <p key={String(message)}>{message}</p>;
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
