import { OptgroupHTMLAttributes, forwardRef } from 'react';
import { useObjectRef } from 'react-aria';

export interface SelectGroupProps
	extends OptgroupHTMLAttributes<HTMLOptGroupElement> {}

export const SelectGroup = forwardRef<HTMLOptGroupElement, SelectGroupProps>(
	(props, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);
		const { children } = props;

		return (
			<optgroup ref={ref} {...props}>
				{children}
			</optgroup>
		);
	}
);

SelectGroup.displayName = 'SelectGroup';
