'use client'
import { DictionaryApi, SearchWordsInput } from '@/api'
import { useInfiniteQueryRef } from '@/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDictionarySearchQuery = (
	query: Omit<SearchWordsInput, 'cursor'>
) => {
	const state = useInfiniteQuery({
		enabled: !!query.q,
		initialPageParam: undefined,
		queryKey: ['dictionary-search', query],
		queryFn: async () => {
			try {
				return await DictionaryApi.searchWords(query)
			} catch (err) {
				toast.error('Failed to get words from dictionary')
				throw err
			}
		},
		getNextPageParam: (prevPage) => prevPage.nextCursor!
	})

	const ref = useInfiniteQueryRef({
		fetchNextPage: state.fetchNextPage,
		hasNextPage: state.hasNextPage,
		isFetching: state.isFetching,
		isLoading: state.isLoading
	})

	return {
		...state,
		ref
	}
}
