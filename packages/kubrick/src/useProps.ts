import { CSSProperties } from 'react';
import { GlobalProps } from './types';
import { ClassNamesArgs, useClasses } from './useClasses';

interface RootPropsArgs {
	classNames?: ClassNamesArgs;
	prefixedNames?: string | string[];
	styles?: CSSProperties;
}

export function useProps<T>(name: string, props?: GlobalProps & T) {
	const {
		className,
		'data-testid': testId,
		id,
		style,
		...componentProps
	} = props || ({} as GlobalProps & T);
	const { clsx } = useClasses(name);

	return {
		clsx,
		componentProps: {
			...componentProps,
			id,
		},
		rootProps(args?: RootPropsArgs) {
			const { classNames, prefixedNames } = args || {};
			const rootStyle = {
				...style,
				...(args?.styles || {}),
			};

			return {
				className: clsx({
					classNames: [classNames, className],
					prefixedNames: prefixedNames || 'root',
				}),
				'data-testid': testId,
				id: id ? `${id}-${name}-root` : undefined,
				style: Object.keys(rootStyle).length >= 1 ? rootStyle : undefined,
			};
		},
	};
}
