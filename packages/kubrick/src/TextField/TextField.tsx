import { useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import { GlobalProps, Styleable } from '../types';
import { useErrorMessage } from '../useErrorMessage';
import { useProps } from '../useProps';
import classes from './TextField.module.scss';

interface TextFieldProps extends GlobalProps, AriaTextFieldProps, Styleable {
	/**
	 * Where to place the description.
	 *
	 * @default after-input
	 */
	descriptionArea?: 'after-input' | 'before-input';
	/**
	 * Whether to allow or disallow 1Password helper.
	 *
	 * @default false
	 * @see https://developer.1password.com/docs/web/compatible-website-design/
	 */
	ignore1Password?: boolean;
	/**
	 * The maximum value that the input can accept.
	 */
	max?: number;
	/**
	 * The minimum value that the input can accept.
	 */
	min?: number;
	/**
	 * Content or element to dis before the input.
	 */
	prefix?: ReactNode;
	/**
	 * Specifies the granularity that the value must adhere to.
	 */
	step?: number;
	/**
	 * Content or element to display after the input.
	 */
	suffix?: ReactNode;
	/**
	 * The input type.
	 *
	 * @default text
	 */
	type?: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';
}

/**
 * ```jsx
 * import { TextField } from '@syntatis/kubrick';
 * ```
 *
 * The `TextField` component works like a standard HTML `input` element. It
 * allows users to enter and edit plain text. This component is useful for
 * collecting user input in forms.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	(props, forwardedRef) => {
		const {
			description,
			descriptionArea,
			errorMessage,
			isDisabled,
			isRequired,
			label,
			max,
			min,
			prefix,
			step,
			suffix,
		} = props;
		let className = props.className;
		const isCode = props.className?.includes('code');
		const isRegularText = props.className?.includes('regular-text');
		const isSmallText = props.className?.includes('small-text');

		if (isRegularText) {
			className = props.className?.replace('regular-text', '');
		}

		if (isSmallText) {
			className = props.className?.replace('small-text', '');
		}

		if (isCode) {
			className = props.className?.replace('code', '');
		}
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('TextField', {
			...props,
			className,
		});
		const {
			descriptionProps,
			errorMessageProps,
			inputProps,
			isInvalid,
			labelProps,
			validationDetails,
			validationErrors,
		} = useTextField(componentProps, ref);
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
					<input
						{...inputProps}
						className={clsx({
							classNames: {
								[classes.input]: true,
								['code']: isCode,
								['regular-text']: isRegularText,
								['small-text']: isSmallText,
							},
							prefixedNames: 'input',
						})}
						max={max}
						min={min}
						ref={ref}
						step={step}
					/>
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

TextField.displayName = 'TextField';
