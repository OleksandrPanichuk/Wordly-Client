'use client'

import { type GetWordByIdInput, WordsApi } from '@/api'
import { type UseQueryHookProps } from '@/hooks'
import { TypeWord } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useGetWordByIdQuery = (
	data: GetWordByIdInput,
	options?: UseQueryHookProps<TypeWord | null>
) => {
	return useQuery({
		queryKey: ['word-by-id', data],
		queryFn: () => WordsApi.getById(data),
		...options
	})
}
