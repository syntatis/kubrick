import { ReactNode } from 'react';

interface UseErrorMessageArgs {
	errorMessage?:
		| ((args: {
				isInvalid: boolean;
				validationDetails: ValidityState;
				validationErrors: string[];
		  }) => ReactNode)
		| ReactNode;
	isInvalid: boolean;
	validationDetails: ValidityState;
	validationErrors: string[];
}

interface UseErrorMessageReturn {
	errorMessageList: Array<ReactNode>;
}

export function useErrorMessage(
	props: UseErrorMessageArgs
): UseErrorMessageReturn {
	const errorMessageList: Array<ReactNode> = [];
	const { isInvalid, validationDetails, validationErrors } = props;
	const { errorMessage: errorMessageProps } = props;
	const errorMessageRendered =
		typeof errorMessageProps === 'function' ?
			errorMessageProps({
				isInvalid,
				validationDetails,
				validationErrors,
			})
		:	errorMessageProps;

	if (errorMessageRendered) {
		errorMessageList.push(errorMessageRendered);
	}
	errorMessageList.push(...validationErrors);

	return {
		errorMessageList: errorMessageList || [],
	};
}
