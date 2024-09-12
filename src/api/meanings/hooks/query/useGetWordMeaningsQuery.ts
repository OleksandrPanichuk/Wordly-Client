'use client'

import { type GetWordMeaningsInput, MeaningsApi } from '@/api'
import { useQuery } from '@tanstack/react-query'

export const useGetWordMeaningsQuery = (dto: GetWordMeaningsInput) => {
	return useQuery({
		queryKey: ['word-meanings', dto],
		queryFn: () => MeaningsApi.getWordMeanings(dto)
	})
}
