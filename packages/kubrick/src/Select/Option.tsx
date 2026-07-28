import { forwardRef } from 'react';
import { useObjectRef } from 'react-aria';

export interface OptionProps {
	children: string;
	value?: string;
}

export const Option = forwardRef<HTMLOptionElement, OptionProps>(
	(props, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);
		const { children, ...restProps } = props;

		return (
			<option ref={ref} {...restProps}>
				{children}
			</option>
		);
	}
);

Option.displayName = 'Option';
