import { PartOfSpeech } from "@/types"

export type TypeSearchDictionaryWord = {
	id: string
	name: string
	image?: string
	meaning?: string
}

export type TypeLearningCategory = {
	title: string
	href: string
	description: string
	imageUrl: string
	rtl?: boolean
}

export type TypeDictionaryWord = {
	id: string
	type: DictionaryMode
	name: string
	partsOfSpeech: PartOfSpeech[]
	examples?: string[]

	phonetics: {
		en?: string
		us?: string
		general?: string
		audio?: string
	}

	meanings: {
		definitions: {
			definition: string
			examples: string[]
			id: string
			image?: {
				url: string
			}
		}[]
		partOfSpeech: PartOfSpeech
	}[]
}

export type DictionaryMode = 'USER' | 'DICTIONARY'
