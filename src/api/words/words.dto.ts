import { SortByOptions, TypeWord } from '@/types'
import { z } from 'zod'

export const getAllWordsSchema = z.object({
	take: z.number().positive().optional(),
	cursor: z.string().nullish(),
	searchValue: z.string().optional(),
	sortBy: z.enum(['name', 'createdAt', 'meanings-count']).optional(),
	sortOrder: z.nativeEnum(SortByOptions).optional(),
	creatorId: z.string().optional()
})

export type GetAllWordsInput = z.infer<typeof getAllWordsSchema>
export type GetAllWordsResponse = {
	words: (TypeWord & {
		_count: {
			meanings: number
		}
	})[]
	nextCursor?: string
	count: number
}

export const createWordSchema = z.object({})

export const updateWordSchema = z.object({})
