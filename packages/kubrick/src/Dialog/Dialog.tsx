import { CSSProperties, forwardRef, ReactNode } from 'react';
import {
	AriaDialogProps,
	AriaModalOverlayProps,
	FocusScope,
	useDialog,
	useObjectRef,
} from 'react-aria';
import { Styleable, Testable } from '../types';
import { useProps } from '../useProps';
import { CloseButton } from './CloseButton';
import classes from './Dialog.module.scss';
import { useDialogContext } from './DialogProvider';

export interface DialogProps
	extends AriaModalOverlayProps,
		Omit<AriaDialogProps, 'role'>,
		Styleable,
		Testable {
	children?: ReactNode;
	/**
	 * Add the footer component on the dialog.
	 *
	 * This will be rendered at the bottom of the dialog. It can be added with anything,
	 * but typically contains an array of action buttons.
	 */
	footer: ReactNode;
	/**
	 * Set the maximum height of the dialog.
	 *
	 * If set as a number if will be treated as pixels.
	 * For example, `maxHeight={300}` will be equal
	 * to `300px`.
	 *
	 * @default 300px
	 */
	maxHeight?: number | string;
	/**
	 * Set the maximum width of the dialog.
	 *
	 * If set as a number if will be treated as pixels.
	 * For example, `maxWidth={50}` will be equal
	 * to `50px`.
	 *
	 * @default 50vw
	 */
	maxWidth?: number | string;
	/**
	 * The title of the dialog. If provided, it will renderred
	 * as the heading on the dialog.
	 */
	title: ReactNode;
}

/**
 * ```jsx
 * import { Dialog } from '@syntatis/kubrick';
 * ```
 *
 * The `Dialog` component is used to show a dialog window above the page. In
 * WordPress, you may see a modal window used on the Media Manager to upload
 * images. But, technically, you can use it to display any content that
 * should appear above of the main page content.
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
	(props, forwardedRef) => {
		const { children, footer, title } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('Dialog', props);
		const { dialogProps, titleProps } = useDialog(
			{
				...componentProps,
				role: 'dialog',
			},
			ref
		);
		const { state } = useDialogContext();

		return (
			<FocusScope autoFocus contain restoreFocus>
				<div
					{...rootProps({
						classNames: [classes.root],
						styles: {
							'--kubrick-dialog-max-height':
								typeof props.maxHeight === 'number' ?
									`${props.maxHeight}px`
								:	props.maxHeight || undefined,
							'--kubrick-dialog-max-width':
								typeof props.maxWidth === 'number' ?
									`${props.maxWidth}px`
								:	props.maxWidth || undefined,
						} as CSSProperties,
					})}
					{...dialogProps}
				>
					<header
						className={clsx({
							classNames: [classes.header],
							prefixedNames: 'header',
						})}
					>
						{title && (
							<h1
								{...titleProps}
								className={clsx({
									classNames: [classes.title, 'title'],
								})}
							>
								{title}
							</h1>
						)}
						<CloseButton onPress={state.close} />
					</header>
					<div
						className={clsx({
							prefixedNames: 'content',
						})}
					>
						{children}
					</div>
					{footer && (
						<footer
							className={clsx({
								classNames: ['footer'],
							})}
						>
							{footer}
						</footer>
					)}
				</div>
			</FocusScope>
		);
	}
);

Dialog.displayName = 'Dialog';
