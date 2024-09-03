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
	mode: DictionaryMode = 'DICTIONARY'
) => {
	const url = qs.stringifyUrl({
		url: ApiRoutes.DICTIONARY.WORD(word),
		query: {
			mode
		}
	})
	return await fetcher.get<TypeDictionaryWord>(url)
}

export const DictionaryApi = {
	searchWords,
	getWordByName
} as const
