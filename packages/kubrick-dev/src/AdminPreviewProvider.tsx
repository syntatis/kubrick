// eslint-disable-next-line import-x/no-named-as-default
import clsx from 'clsx';
import '../scss/preview.scss';

interface AdminPreviewProviderProps {
	children: React.ReactNode;
	className?: string;
}

export const AdminPreviewProvider = ({
	children,
	className,
}: AdminPreviewProviderProps) => {
	return (
		<div className={clsx(['__wp-core-body__', className])}>
			<div className="wp-core-ui">{children}</div>
		</div>
	);
};
