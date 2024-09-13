import { LinkButton } from '@syntatis/kubrick';
import { Icon, arrowRight } from '@wordpress/icons';

export const Actions = () => {
	return (
		<div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center w-full sm:w-auto">
			<LinkButton
				href="/guides/overview"
				size="hero"
				suffix={<Icon icon={arrowRight} />}
			>
				Get started
			</LinkButton>
			<div className="max-w-max flex">
				<pre>
					<code className="py-4 px-6 rounded-md">
						<span className="select-none mr-2">$</span>npm i @syntatis/kubrick
					</code>
				</pre>
			</div>
		</div>
	);
};
