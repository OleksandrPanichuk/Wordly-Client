'use client'

import { GetAllWordsInput, WordsApi } from '@/api'
import { useInfiniteQueryRef } from '@/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useInfiniteWordsQuery = (
	dto: Omit<GetAllWordsInput, 'cursor'>
) => {
	const state = useInfiniteQuery({
		queryFn: ({ pageParam }) =>
			WordsApi.getAll({ ...dto, cursor: pageParam || undefined }),
		queryKey: ['words', 'all', dto],
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		initialPageParam: ''
	})

	const { fetchNextPage, hasNextPage, isFetching, isLoading } = state

	const ref = useInfiniteQueryRef({
		fetchNextPage,
		hasNextPage,
		isFetching,
		isLoading
	})

	return { ...state, ref }
}
