import { ApiRoutes } from '@/constants'
import { fetcher } from '@/lib'
import qs from 'query-string'
import {
	GetAllWordsInput,
	GetAllWordsResponse,
	getAllWordsSchema
} from './words.dto'

const getAll = async (dto: GetAllWordsInput) => {
	getAllWordsSchema.parse(dto)
	const url = qs.stringifyUrl({
		url: ApiRoutes.WORDS.ROOT,
		query: dto
	})
	return await fetcher.get<GetAllWordsResponse>(url)
}

const getByName = async () => {}

const create = async () => {}

const update = async () => {}

const deleteWord = async () => {}

export const WordsApi = {
	getAll,
	getByName,
	create,
	update,
	delete: deleteWord
} as const
