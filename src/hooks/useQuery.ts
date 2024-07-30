'use client'
import {
	QueryFunction,
	UseQueryOptions,
	useQuery as useQueryDefault
} from '@tanstack/react-query'

interface IQueryHookProps<T>
	extends Omit<UseQueryOptions<T | undefined, Error>, 'queryFn'> {
	onSuccess?: (data: T) => void
	onError?: (error: Error) => void
	queryFn?: QueryFunction<T>
}

export type UseQueryHookProps<T> = Omit<
	IQueryHookProps<T>,
	'queryFn' | 'queryKey'
>

export const useQuery = <T>({
	queryFn,
	onSuccess,
	onError,
	...rest
}: IQueryHookProps<T>) => {
	return useQueryDefault({
		queryFn: async (ctx) => {
			try {
				const response = await queryFn?.(ctx)

				if (response) {
					onSuccess?.(response)
				}

				return response
			} catch (err) {
				onError?.(err as Error)
				throw err
			}
		},
		...rest
	})
}
