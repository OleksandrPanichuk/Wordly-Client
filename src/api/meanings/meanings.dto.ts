import { zMongoId } from '@/lib'
import { z } from 'zod'

export const getWordMeaningsSchema = z.object({
	wordId: zMongoId()
})

export type GetWordMeaningsInput = z.infer<typeof getWordMeaningsSchema>

export const getExpressionMeaningsSchema = z.object({
	expressionId: zMongoId()
})

export type GetExpressionMeaningsInput = z.infer<
	typeof getExpressionMeaningsSchema
>
