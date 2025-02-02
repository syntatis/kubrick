import { forwardRef, OptgroupHTMLAttributes } from 'react';
import { useObjectRef } from 'react-aria';

export const SelectGroup = forwardRef<
	HTMLOptGroupElement,
	OptgroupHTMLAttributes<HTMLOptGroupElement>
>((props, forwardedRef) => {
	const ref = useObjectRef(forwardedRef);
	const { children } = props;

	return (
		<optgroup ref={ref} {...props}>
			{children}
		</optgroup>
	);
});

SelectGroup.displayName = 'SelectGroup';
