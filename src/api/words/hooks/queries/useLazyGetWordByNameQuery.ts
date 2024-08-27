'use client'

import { useLazyQuery } from '@/hooks'
import { WordsApi } from '@/api'

export const useLazyGetWordByNameQuery = () => {
	return useLazyQuery({
		queryFn: WordsApi.getByName
	})
}
