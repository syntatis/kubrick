// eslint-disable-next-line import-x/no-named-as-default
import clsx from 'clsx';

export type ClassNamesArgs = Argument | ArgumentArray;
type Argument = ArgumentArray | Mapping | Value;
type ArgumentArray = Argument[];
type Mapping = Record<string, unknown>;

type Value = boolean | null | number | string | undefined;

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
