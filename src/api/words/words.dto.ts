import { FormErrors } from '@/constants'
import { testSentenceOnWord, zRequired } from '@/lib'
import { PartOfSpeech, SortByOptions, TypeWord } from '@/types'
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

export const getWordByNameSchema = z.object({
	name: zRequired()
})

export type GetWordByNameInput = z.infer<typeof getWordByNameSchema>

export const wordTranscriptionSchema = z
	.object({
		en: z
			.string()
			.refine(
				(value) => !value || (!!value && value.length > 3),
				FormErrors.length.word.transcription
			)
			.optional(),
		us: z
			.string()
			.refine(
				(value) => !value || (!!value && value.length > 3),
				FormErrors.length.word.transcription
			)
			.optional()
	})
	.refine((value) => !!value.en || !!value.us, {
		message: FormErrors.invalid.word.transcription
	})

export const createWordSchema = z.object({
	name: zRequired(FormErrors.required.word.name).refine(
		(value) => !/\s/.test(value),
		FormErrors.invalid.wordName
	),
	transcription: wordTranscriptionSchema,
	meaning: z.object({
		definition: zRequired(FormErrors.required.meaning.definition).min(
			3,
			FormErrors.length.meaning.definition
		),
		partOfSpeech: z.nativeEnum(PartOfSpeech, {
			message: FormErrors.invalid.partOfSpeech
		}),
		examples: z.array(zRequired()).optional(),
		image: z.instanceof(File).optional()
	})
})

export const createWordSchemaWithRefinement = createWordSchema.refine(
	({ meaning, name }) => {
		if (!meaning.examples) {
			return true
		}

		return meaning.examples?.every((example) =>
			testSentenceOnWord(example, name)
		)
	},
	{
		message: FormErrors.invalid.meaning.examples.word,
		path: ['meaning.examples']
	}
)

export type CreateWordInput = z.infer<typeof createWordSchema>

export const updateWordSchema = z.object({})
