import { axios } from '@/lib'
import { ApiRoutes } from '@/shared/constants'
import {
	DictionaryMode,
	TypeDictionaryWord,
	TypeSearchDictionaryWord
} from '@/shared/types'
import qs from 'query-string'

export class DictionaryApi {
	public static async searchWords(q: string) {
		const url = qs.stringifyUrl({
			url: ApiRoutes.DICTIONARY.ROOT,
			query: {
				q
			}
		})
		return (await axios.get<TypeSearchDictionaryWord[]>(url)).data
	}

	public static async getWordByName(
		word: string,
		mode: DictionaryMode = 'DICTIONARY'
	) {
		const url = qs.stringifyUrl({
			url: ApiRoutes.DICTIONARY.WORD(word),
			query: {
				mode
			}
		})
		return (
			await axios.get<TypeDictionaryWord>(url)
		).data
	}
}
