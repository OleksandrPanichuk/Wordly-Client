import { ApiRoutes } from '@/constants'
import { fetcher } from '@/lib'
import {
	LearnType,
	type TypeExpressionMeaning,
	type TypeWordMeaning
} from '@/types'
import qs from 'query-string'
import {
	type GetExpressionMeaningsInput,
	getExpressionMeaningsSchema,
	type GetWordMeaningsInput,
	getWordMeaningsSchema
} from './meanings.dto'

const getWordMeanings = async (dto: GetWordMeaningsInput) => {
	getWordMeaningsSchema.parse(dto)

	const url = qs.stringifyUrl({
		url: ApiRoutes.MEANINGS.ROOT,
		query: {
			itemId: dto.wordId,
			learnType: LearnType.VOCABULARY
		}
	})

	return await fetcher.getOrNull<TypeWordMeaning[]>(url)
}

const getExpressionMeanings = async (dto: GetExpressionMeaningsInput) => {
	getExpressionMeaningsSchema.parse(dto)

	const url = qs.stringifyUrl({
		url: ApiRoutes.MEANINGS.ROOT,
		query: {
			itemId: dto.expressionId,
			learnType: LearnType.EXPRESSIONS
		}
	})

	return await fetcher.getOrNull<TypeExpressionMeaning[]>(url)
}

export const MeaningsApi = {
	getWordMeanings,
	getExpressionMeanings
} as const
