'use client'
import { DictionaryApi } from '@/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

type Props = {
	word: string
}

export const useGetWordQuery = ({ word }: Props) => {
	const queryClient = useQueryClient()
	return useQuery({
		queryKey: ['dictionary-word', word],
		queryFn: async () => {
			try {
				const data = await DictionaryApi.getWordByName(word)

				queryClient.invalidateQueries({
					queryKey: ['words', 'all']
				})

				return data
			} catch {
				throw new Error('Failed to get word from dictionary')
			}
		},
		retry: false,
		enabled: !!word
	})
}
