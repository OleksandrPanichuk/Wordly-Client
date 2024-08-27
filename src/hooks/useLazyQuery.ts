'use client'
import {
	EnsureQueryDataOptions,
	QueryKey,
	useQueryClient
} from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'

interface ILazyQueryHookProps<TQueryFnData, TData>
	extends Omit<
		EnsureQueryDataOptions<TQueryFnData, Error>,
		'queryFn' | 'queryKey'
	> {
	queryFn: (data: TQueryFnData) => TData
	onSuccess?: (data: TData) => void
	onError?: (error: unknown) => void
}

interface IFetchDataOptions {
	throwError?: boolean
}

export function useLazyQuery<
	TData = unknown,
	TQueryFnData = unknown,
	TQueryKey extends QueryKey = QueryKey
>(props: ILazyQueryHookProps<TQueryFnData, TData>) {
	const queryClient = useQueryClient()
	const { queryFn, onSuccess, onError, ...options } = props

	const [data, setData] = useState<TData>()
	const [isLoading, setIsLoading] = useState(false)

	const fetchData = useCallback(
		async (
			variables: TQueryFnData,
			queryKey: TQueryKey,
			{ throwError }: IFetchDataOptions = {}
		) => {
			setIsLoading(true)

			return await queryClient.ensureQueryData({
				queryFn: async () => {
					try {
						const res = await queryFn(variables)
						setData(res)

						if (res) {
							onSuccess?.(res)
						}

						return res
					} catch (err) {
						onError?.(err)
						if (throwError) {
							throw err
						}
					} finally {
						setIsLoading(false)
					}
				},
				queryKey
			})
		},
		[options, queryClient, queryFn]
	)

	const result = useMemo(
		() => ({
			fetchData,
			isLoading,
			data
		}),
		[data, isLoading, fetchData]
	)

	return result
}
