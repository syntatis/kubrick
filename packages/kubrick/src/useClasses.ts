// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx';

type Value = boolean | null | number | string | undefined;
type Mapping = Record<string, unknown>;
type Argument = ArgumentArray | Mapping | Value;
type ArgumentArray = Argument[];

export type ClassNamesArgs = Argument | ArgumentArray;

export function parsePrefixedNames(names: string | string[]): string[] {
	if (typeof names === 'string') {
		return names.split(' ');
	}

	return names.map((name) => name.split(' ')).flat();
}

export function useClasses(component: string) {
	const prefix = `kubrick-${component}-`;

	return {
		clsx: (args: {
			classNames?: ClassNamesArgs;
			prefixedNames?: string | string[];
		}) => {
			const { classNames = '', prefixedNames = '' } = args;
			const prefixed = parsePrefixedNames(prefixedNames).map(
				(name) => name && `${prefix}${name}`
			);
			const c = clsx(prefixed, classNames);

			return c.trim() !== '' ? c : undefined;
		},
	};
}
