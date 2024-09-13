import '../scss/preview.scss';
import { useClasses } from './useClasses';

interface AdminPreviewProviderProps {
	children: React.ReactNode;
	className?: string;
}

export const AdminPreviewProvider = ({
	children,
	className,
}: AdminPreviewProviderProps) => {
	const { clsx } = useClasses('AdminPreviewProvider');

	return (
		<div className={clsx({ classNames: ['__wp-core-body__', className] })}>
			<div className="wp-core-ui">{children}</div>
		</div>
	);
};
