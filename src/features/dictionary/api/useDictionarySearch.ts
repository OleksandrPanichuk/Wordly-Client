import { DictionaryApi } from '@/features/dictionary'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDictionarySearch = (searchValue: string) => {
	return useQuery({
		queryKey: ['dictionary-search', searchValue],
		enabled: !!searchValue,
		queryFn: async () => {
			try {
				return (await DictionaryApi.searchWords(searchValue)).data
			} catch (err) {
				toast.error('Failed to get words from dictionary')
			}
		}
	})
}
