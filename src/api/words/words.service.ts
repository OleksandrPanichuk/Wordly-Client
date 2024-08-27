import { ApiRoutes } from '@/constants'
import { axios, fetcher } from '@/lib'
import qs from 'query-string'
import {
	CreateWordInput,
	createWordSchemaWithRefinement,
	type GetAllWordsInput,
	type GetAllWordsResponse,
	getAllWordsSchema,
	type GetWordByNameInput,
	getWordByNameSchema
} from '@/api'
import { TypeUploadedFile, TypeUser, TypeWord } from '@/types'

const getAll = async (dto: GetAllWordsInput) => {
	getAllWordsSchema.parse(dto)
	const url = qs.stringifyUrl({
		url: ApiRoutes.WORDS.ROOT,
		query: dto
	})
	return await fetcher.get<GetAllWordsResponse>(url)
}

const getByName = async (dto: GetWordByNameInput) => {
	getWordByNameSchema.parse(dto)
	return await fetcher.getOrNull<TypeWord>(ApiRoutes.WORDS.BY_NAME(dto.name))
}

const create = async (dto: CreateWordInput) => {
	createWordSchemaWithRefinement.parse(dto)

	let image: TypeUploadedFile | undefined = undefined
	if (dto.meaning.image) {
		const formData = new FormData()
		formData.append('file', dto.meaning.image)

		const { data } = await axios.post<TypeUploadedFile>(
			ApiRoutes.STORAGE.UPLOAD,
			formData
		)
		image = data
	}

	try {
		return await axios.post<TypeUser>(ApiRoutes.WORDS.ROOT, {
			...dto,
			meaning: {
				...dto.meaning,
				image
			}
		})
	} catch (err) {
		if (image?.key) {
			await axios.delete(ApiRoutes.STORAGE.DELETE(image?.key))
		}
		throw err
	}
}

const update = async () => {}

const deleteWord = async () => {}

export const WordsApi = {
	getAll,
	getByName,
	create,
	update,
	delete: deleteWord
} as const
