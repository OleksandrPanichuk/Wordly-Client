'use client'

import { type GetExpressionMeaningsInput, MeaningsApi } from '@/api'
import { useQuery } from '@tanstack/react-query'

export const useGetExpressionMeaningsQuery = (
	dto: GetExpressionMeaningsInput
) => {
	return useQuery({
		queryKey: ['expression-meanings', dto],
		queryFn: () => MeaningsApi.getExpressionMeanings(dto)
	})
}
