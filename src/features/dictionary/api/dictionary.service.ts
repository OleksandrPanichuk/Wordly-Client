import { ApiRoutes } from '@/constants'
import { fetcher } from '@/lib'
import {
	DictionaryMode,
	TypeDictionaryWord,
	TypeSearchDictionaryWord
} from '@/types'
import qs from 'query-string'

const searchWords = async (q: string) => {
	const url = qs.stringifyUrl({
		url: ApiRoutes.DICTIONARY.ROOT,
		query: {
			q
		}
	})
	return await fetcher.get<TypeSearchDictionaryWord[]>(url)
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
