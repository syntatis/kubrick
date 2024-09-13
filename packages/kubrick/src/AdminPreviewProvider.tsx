import '../scss/preview.scss';
import { useClasses } from './useClasses';

interface PreviewProviderProps {
	children: React.ReactNode;
	className?: string;
}

export const PreviewProvider = ({
	children,
	className,
}: PreviewProviderProps) => {
	const { clsx } = useClasses('PreviewProvider');

	return (
		<div className={clsx({ classNames: ['__wp-core-body__', className] })}>
			<div className="wp-core-ui">{children}</div>
		</div>
	);
};
