import { createContext, ReactNode, useContext } from 'react';

type Context = 'box' | 'settings';

interface TabsContextArgs {
	/**
	 * @default 'settings'
	 */
	context?: Context;
	navigate?: string;
	url?: string;
}

interface TabsProviderProps {
	children: ReactNode;
	context?: Context;
	navigate?: boolean | string;
	url?: string;
}

const Context = createContext<TabsContextArgs>({
	context: 'settings',
});

export const TabsProvider = (props: TabsProviderProps) => {
	const { children, context, url } = props;
	let navigate = 'tab';

	if (typeof props.navigate === 'string') {
		navigate = props.navigate as string;
	}

	return (
		<Context.Provider value={{ context, navigate, url }}>
			{children}
		</Context.Provider>
	);
};

export const useTabsProvider = () => {
	const context = useContext(Context);

	return context;
};
