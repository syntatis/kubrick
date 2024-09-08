import { PartialNode } from '@react-stately/collections';
import { ReactNode } from 'react';
import { Key } from 'react-aria';
import { GlobalProps } from '../types';

export interface TabProps extends GlobalProps {
	children: ReactNode;
	key?: Key;
	title: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Tab = (props: TabProps) => {
	return null;
};

Tab.getCollectionNode = function* getCollectionNode<T>(
	props: TabProps
): Generator<PartialNode<T>> {
	const { title } = props;

	yield {
		props: props,
		rendered: title,
		type: 'item',
	};
};
