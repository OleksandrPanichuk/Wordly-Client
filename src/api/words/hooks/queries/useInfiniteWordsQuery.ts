'use client'

import { GetAllWordsInput, WordsApi } from '@/api'
import { useInfiniteQueryRef } from '@/hooks'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useInfiniteWordsQuery = (
	dto: Omit<GetAllWordsInput, 'cursor'>
) => {
	const queryClient = useQueryClient()
	const state = useInfiniteQuery({
		queryFn: () => WordsApi.getAll(dto),
		queryKey: ['words', 'all', dto],
		getNextPageParam: (prevPage) => prevPage.nextCursor,
		getPreviousPageParam: (firstPage) => firstPage.nextCursor,
		initialPageParam: undefined
	})

	const {fetchNextPage, hasNextPage, isFetching, isLoading, isPlaceholderData} = state

	const ref = useInfiniteQueryRef({
		fetchNextPage,
		hasNextPage,
		isFetching,
		isLoading
	})

	useEffect(() => {
		if (!isPlaceholderData && hasNextPage  && !dto?.searchValue) {
			queryClient.prefetchInfiniteQuery({
				queryKey: ['words','all', dto],
				queryFn: () =>
					WordsApi.getAll({}),
				initialPageParam: undefined,
				getNextPageParam:(lastPage) => lastPage.nextCursor,
				pages: 2,
				retry: false,
				staleTime: 1000 * 60 * 30,
			})
		}
	}, [
		isPlaceholderData,
		queryClient,
		dto,
		hasNextPage
	])

	return { ...state, ref }
}
