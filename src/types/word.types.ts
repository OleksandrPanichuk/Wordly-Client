import type { PartOfSpeech } from './common.types'

export type TypeTranscription = {
	en?: string
	us?: string
}


export type TypeWord = {
	id: string
	name: string
	partsOfSpeech: PartOfSpeech[]
	transcription: TypeTranscription
	creatorId: string
	createdAt: Date
	updatedAt: Date
}
