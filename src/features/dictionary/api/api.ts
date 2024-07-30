import { axios } from '@/lib'
import {
	DictionaryMode,
	TypeDictionaryWord,
	TypeSearchDictionaryWord
} from '@/shared/types'
import qs from 'query-string'

export class DictionaryApi {
	public static async searchWords(q: string) {
		const url = qs.stringifyUrl({
			url: '/dictionary',
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
		return (
			await axios.get<TypeDictionaryWord>(`/dictionary/${word}?mode=${mode}`)
		).data
	}
}
