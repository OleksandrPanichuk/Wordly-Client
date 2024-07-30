'use client'
import { DictionaryApi } from '@/features/dictionary'
import { DictionaryMode } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'

type Props = {
	mode: DictionaryMode
	word: string
}

export const useGetWord = ({ mode, word }: Props) => {
	return useQuery({
		queryKey: ['dictionary-word', mode, word],
		queryFn: async () => {
			try {
				return await DictionaryApi.getWordByName(word, mode)
			} catch {
				throw new Error('Failed to get word from dictionary')
			}
		},
		retry: false,
		enabled: !!word
	})
}
