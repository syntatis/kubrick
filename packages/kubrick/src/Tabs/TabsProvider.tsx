import { ReactNode, createContext, useContext } from 'react';

type Context = 'box' | 'settings';

interface TabsContextArgs {
	/**
	 * @default 'settings'
	 */
	context?: Context;
}

interface TabsProviderProps {
	children: ReactNode;
	context: Context;
}

const Context = createContext<TabsContextArgs>({
	context: 'settings',
});

export const TabsProvider = (props: TabsProviderProps) => {
	const { children, context } = props;

	return <Context.Provider value={{ context }}>{children}</Context.Provider>;
};

export const useTabsProvider = () => {
	const context = useContext(Context);

	return context;
};
