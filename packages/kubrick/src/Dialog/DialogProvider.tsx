import { ReactNode, createContext, useContext } from 'react';
import {
	OverlayTriggerProps,
	OverlayTriggerState,
	useOverlayTriggerState,
} from 'react-stately';

interface DialogContextProps {
	portalContainer?: Element;
	state: OverlayTriggerState;
}

interface DialogProviderProps extends OverlayTriggerProps {
	children?: ReactNode;
	portalContainer?: Element;
}

const DialogContext = createContext<DialogContextProps>({
	state: {} as OverlayTriggerState,
});

export const DialogProvider = (props: DialogProviderProps) => {
	const { children, portalContainer } = props;
	const state = useOverlayTriggerState(props);

	return (
		<DialogContext.Provider value={{ portalContainer, state }}>
			{children}
		</DialogContext.Provider>
	);
};

export const useDialogContext = () => {
	return useContext(DialogContext);
};
