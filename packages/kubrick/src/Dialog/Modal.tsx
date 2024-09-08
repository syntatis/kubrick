import { ReactNode, useRef } from 'react';
import { AriaModalOverlayProps, Overlay, useModalOverlay } from 'react-aria';
import { useProps } from '../useProps';
import classes from './Dialog.module.scss';
import { useDialogContext } from './DialogProvider';

interface ModalProps extends AriaModalOverlayProps {
	children?: ReactNode;
}

export const Modal = (props: ModalProps) => {
	const { children, isDismissable = true } = props;
	const ref = useRef(null);
	const { portalContainer, state } = useDialogContext();
	const { clsx, componentProps, rootProps } = useProps('Dialog', props);
	const { modalProps, underlayProps } = useModalOverlay(
		{
			...componentProps,
			isDismissable,
		},
		state,
		ref
	);

	return (
		<Overlay portalContainer={portalContainer}>
			<div
				{...underlayProps}
				className={clsx({
					classNames: [classes.underlay, 'wp-core-ui'],
				})}
			>
				<div
					{...rootProps({
						classNames: classes.modal,
						prefixedNames: 'modal',
					})}
					{...modalProps}
					ref={ref}
				>
					{children}
				</div>
			</div>
		</Overlay>
	);
};
