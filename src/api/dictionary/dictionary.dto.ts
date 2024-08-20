import { TypeDictionaryWord } from '@/types'
import { z } from 'zod'

export const searchWordsSchema = z.object({
	take: z.number().positive().optional(),
	cursor: z.string().optional(),
	q: z.string().min(1)
})

export type SearchWordsInput = z.infer<typeof searchWordsSchema>

export type SearchWordsResponse = {
	words: TypeDictionaryWord[]
	nextCursor?: string
}
