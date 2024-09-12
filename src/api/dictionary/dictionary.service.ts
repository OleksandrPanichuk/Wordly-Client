import { ApiRoutes } from '@/constants/api-routes'
import { fetcher } from '@/lib'
import type { DictionaryMode, TypeDictionaryWord } from '@/features/dictionary'
import qs from 'query-string'
import type { SearchWordsInput, SearchWordsResponse } from './dictionary.dto'

const searchWords = async (query: SearchWordsInput) => {
	const url = qs.stringifyUrl({
		url: ApiRoutes.DICTIONARY.ROOT,
		query
	})
	return await fetcher.get<SearchWordsResponse>(url)
}

const getWordByName = async (
	word: string,
) => {
	return await fetcher.get<TypeDictionaryWord>(ApiRoutes.DICTIONARY.WORD(word))
}

export const DictionaryApi = {
	searchWords,
	getWordByName
} as const
