import { useObjectRef } from '@react-aria/utils';
import { forwardRef } from 'react';
import { AriaSearchFieldProps, useSearchField } from 'react-aria';
import { useSearchFieldState } from 'react-stately';
import { GlobalProps } from '../types';
import { useErrorMessage } from '../useErrorMessage';
import { useProps } from '../useProps';
import { ClearButton } from './ClearButton';
import classes from './SearchField.module.scss';

interface SearchFieldProps
	extends GlobalProps,
		Omit<AriaSearchFieldProps, 'type'> {
	/**
	 * Where to place the description.
	 *
	 * @default after-input
	 */
	descriptionArea?: 'after-input' | 'before-input';
}

/**
 * ```jsx
 * import { SearchField } from '@syntatis/kubrick';
 * ```
 *
 * The `SearchField` component is used to render a text input field for performing
 * search. It includes an input component with the type set to search and a clear
 * button to reset the search field.
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
	(props, forwardedRef) => {
		const {
			description,
			descriptionArea,
			errorMessage,
			isDisabled,
			isRequired,
			label,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('SearchField', props);
		const state = useSearchFieldState(props);
		const {
			clearButtonProps,
			descriptionProps,
			errorMessageProps,
			inputProps,
			isInvalid,
			labelProps,
			validationDetails,
			validationErrors,
		} = useSearchField(componentProps, state, ref);
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
							[classes.disabled]: isDisabled,
							[classes.invalid]: isInvalid,
						},
					],
				})}
			>
				{label && (
					<label
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
					</label>
				)}
				<div
					className={clsx({
						classNames: classes.inputWrapper,
						prefixedNames: 'input-wrapper',
					})}
				>
					<input
						{...inputProps}
						className={clsx({
							classNames: {
								[classes.input]: true,
							},
							prefixedNames: 'input',
						})}
						ref={ref}
						type="search"
					/>
					{state.value && <ClearButton {...clearButtonProps} />}
				</div>
				{errorMessageList.length >= 1 && (
					<div
						{...errorMessageProps}
						className={clsx({
							classNames: classes.errorMessage,
							prefixedNames: 'error-message',
						})}
					>
						{errorMessageList.map((message, index) => {
							return <p key={index}>{message}</p>;
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

SearchField.displayName = 'SearchField';
