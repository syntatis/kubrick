import { ReactNode, createContext, useContext } from 'react';

type Context = 'box' | 'settings';

interface TabsContextArgs {
	baseuri?: string;
	/**
	 * @default 'settings'
	 */
	context?: Context;
	navigate?: string;
}

interface TabsProviderProps {
	baseuri?: string;
	children: ReactNode;
	context?: Context;
	navigate?: boolean | string;
}

const Context = createContext<TabsContextArgs>({
	context: 'settings',
});

export const TabsProvider = (props: TabsProviderProps) => {
	const { baseuri, children, context } = props;
	let navigate = 'tab';

	if (typeof props.navigate === 'string') {
		navigate = props.navigate as string;
	}

	return (
		<Context.Provider value={{ baseuri, context, navigate }}>
			{children}
		</Context.Provider>
	);
};

export const useTabsProvider = () => {
	const context = useContext(Context);

	return context;
};
