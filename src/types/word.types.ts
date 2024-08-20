import type { TypeTranscription } from './common.types'

export type PartOfSpeech =
	| 'VERB'
	| 'NOUN'
	| 'PRONOUN'
	| 'ADJECTIVE'
	| 'ADVERB'
	| 'INTERJECTION'
	| 'PREPOSITION'
	| 'CONJUNCTION'

export type TypeWord = {
	id: string
	name: string
	partsOfSpeech: PartOfSpeech[]
	transcription: TypeTranscription
	creatorId: string
	createdAt: Date
	updatedAt: Date
}
