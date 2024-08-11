import { ApiRoutes } from '@/constants'
import { axios } from '@/lib'
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
	return (await axios.get<TypeSearchDictionaryWord[]>(url)).data
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
	return (await axios.get<TypeDictionaryWord>(url)).data
}

export const DictionaryApi = {
	searchWords,
	getWordByName
} as const
