import { ReactNode, createContext, useContext } from 'react';

type Context = 'box' | 'settings';

interface TabsContextArgs {
	/**
	 * @default 'settings'
	 */
	context?: Context;
	navigate?: string;
	url?: URL;
}

interface TabsProviderProps {
	children: ReactNode;
	context?: Context;
	navigate?: boolean | string;
}

const Context = createContext<TabsContextArgs>({
	context: 'settings',
});

export const TabsProvider = (props: TabsProviderProps) => {
	const { children, context } = props;
	const url = new URL(window.location.href);
	let navigate = 'tab';

	if (typeof props.navigate === 'string') {
		navigate = props.navigate as string;
	}

	if (navigate) {
		url.searchParams.delete(navigate);
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
