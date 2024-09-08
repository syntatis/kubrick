import { ReactElement, cloneElement, useEffect, useState } from 'react';
import { useOverlayTrigger } from 'react-aria';
import { OverlayTriggerProps } from 'react-stately';
import { Dialog, DialogProps } from './Dialog';
import { DialogProvider, useDialogContext } from './DialogProvider';
import { Modal } from './Modal';

interface DialogTriggerProps extends OverlayTriggerProps {
	children: ReactElement;
	portalSelector?: string;
	render: (close: () => void) => ReactElement<DialogProps, typeof Dialog>;
}

const Trigger = (props: DialogTriggerProps) => {
	const { children, render } = props;
	const { state } = useDialogContext();
	const { overlayProps, triggerProps } = useOverlayTrigger(
		{ type: 'dialog' },
		state
	);
	const modalElement = cloneElement(render(state.close), overlayProps);

	return (
		<>
			{cloneElement(children, triggerProps)}
			{state.isOpen && <Modal>{modalElement}</Modal>}
		</>
	);
};

export const DialogTrigger = (props: DialogTriggerProps) => {
	const { children, portalSelector, render, ...rest } = props;
	const [portalContainer, setPortalContainer] = useState<Element | undefined>();

	useEffect(() => {
		if (!portalSelector) {
			return;
		}

		const portalElement = document.querySelector(portalSelector);

		if (portalElement) {
			setPortalContainer(portalElement);
		}
	}, [portalSelector]);

	return (
		<DialogProvider {...rest} portalContainer={portalContainer}>
			<Trigger render={render}>{children}</Trigger>
		</DialogProvider>
	);
};
