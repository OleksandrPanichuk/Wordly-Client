import {
	type CreateWordInput,
	createWordSchemaWithRefinement,
	type DeleteWordInput,
	deleteWordSchema,
	type GetAllWordsInput,
	type GetAllWordsResponse,
	getAllWordsSchema,
	type GetWordByNameInput,
	getWordByNameSchema
} from '@/api'
import { ApiRoutes } from '@/constants/api-routes'
import { axios, fetcher } from '@/lib'
import { TypeUploadedFile, TypeUser, TypeWord } from '@/types'
import qs from 'query-string'

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

const create = async ({ isAdmin, ...dto }: CreateWordInput) => {
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

	const url = isAdmin ? ApiRoutes.WORDS.ADMIN : ApiRoutes.WORDS.ROOT

	try {
		return await axios.post<TypeUser>(url, {
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

const deleteWord = async ({ isAdmin, ...dto }: DeleteWordInput) => {
	deleteWordSchema.parse(dto)
	const url = isAdmin
		? ApiRoutes.WORDS.ADMIN_BY_ID(dto.id)
		: ApiRoutes.WORDS.BY_ID(dto.id)
	return await axios.delete<TypeWord>(url)
}

export const WordsApi = {
	getAll,
	getByName,
	create,
	update,
	delete: deleteWord
} as const
