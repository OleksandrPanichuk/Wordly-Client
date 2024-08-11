'use client'
import { DictionaryApi } from '@/features/dictionary'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDictionarySearchQuery = (searchValue: string) => {
	return useQuery({
		queryKey: ['dictionary-search', searchValue],
		enabled: !!searchValue,
		queryFn: async () => {
			try {
				return await DictionaryApi.searchWords(searchValue)
			} catch (err) {
				toast.error('Failed to get words from dictionary')
			}
		}
	})
}
