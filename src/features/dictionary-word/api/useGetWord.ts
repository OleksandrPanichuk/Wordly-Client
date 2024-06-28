import { DictionaryApi } from '@/services'
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
				return (await DictionaryApi.getWordByName(word, mode)).data
			} catch {
				throw new Error('Failed to get word from dictionary')
			}
		},
		retry: false,
		enabled: !!word
	})
}
