import { LearnType, PartOfSpeech, TypeUploadedFile } from './common.types'

type MeaningCommon = {
	id: string
	image: TypeUploadedFile
	definition:string
	examples: string[]
	partOfSpeech: PartOfSpeech
	creatorId?: string
	createdAt: Date
	updatedAt: Date
}

export type TypeWordMeaning = MeaningCommon & {
	type: LearnType.VOCABULARY
	wordId: string
}

export type TypeExpressionMeaning = MeaningCommon & {
	type: LearnType.EXPRESSIONS
	expressionId: string
}