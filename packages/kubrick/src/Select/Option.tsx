import { forwardRef } from 'react';
import { useObjectRef } from 'react-aria';

export interface OptionProps {
	children: string;
	value?: string;
}

export const Option = forwardRef<HTMLOptionElement, OptionProps>(
	(props, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);
		const { children } = props;

		return (
			<option ref={ref} {...props}>
				{children}
			</option>
		);
	}
);

Option.displayName = 'Option';
