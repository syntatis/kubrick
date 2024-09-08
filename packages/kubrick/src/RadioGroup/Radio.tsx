import { useObjectRef } from '@react-aria/utils';
import {
	ReactNode,
	createContext,
	forwardRef,
	useContext,
	useRef,
} from 'react';
import { AriaRadioProps, useRadio } from 'react-aria';
import { RadioGroupState } from 'react-stately';
import { GlobalProps } from '../types';
import { useProps } from '../useProps';
import classes from './Radio.module.scss';

export const RadioContext = createContext<RadioGroupState | null>(null);

export interface RadioProps extends GlobalProps, AriaRadioProps {
	children: ReactNode;
}

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(
	(props, forwardedRef) => {
		const { children, className } = props;
		const {
			clsx,
			componentProps: restProps,
			rootProps,
		} = useProps('Radio', props);
		const ref = useObjectRef(forwardedRef);
		const inputRef = useRef<HTMLInputElement>(null);
		const state = useContext(RadioContext);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const radioProps = state ? useRadio(restProps, state, inputRef) : null;

		if (!radioProps) {
			throw new Error('"Radio" input must be added as a group');
		}

		const { inputProps, isDisabled, labelProps } = radioProps;

		return (
			<label
				{...rootProps({
					classNames: [
						classes.root,
						className,
						{
							[classes.disabled]: isDisabled,
						},
					],
				})}
				ref={ref}
			>
				<input
					{...inputProps}
					className={clsx({
						classNames: classes.input,
						prefixedNames: 'input',
					})}
					ref={inputRef}
				/>
				<span {...labelProps}>{children}</span>
			</label>
		);
	}
);

Radio.displayName = 'Radio';
