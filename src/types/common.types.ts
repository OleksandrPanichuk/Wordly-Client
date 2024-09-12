import { Checkout } from '@lemonsqueezy/lemonsqueezy.js'
import { LucideIcon } from 'lucide-react'

export enum PartOfSpeech {
	VERB = 'VERB',
	NOUN = 'NOUN',
	PRONOUN = 'PRONOUN',
	ADJECTIVE = 'ADJECTIVE',
	ADVERB = 'ADVERB',
	INTERJECTION = 'INTERJECTION',
	PREPOSITION = 'PREPOSITION',
	CONJUNCTION = 'CONJUNCTION'
}

export type BreakpointsType =
	| 'lg'
	| 'max-lg'
	| 'md'
	| 'max-md'
	| 'sm'
	| 'max-sm'
	| 'xs'
	| 'max-xs'

export type TypeUploadedFile = {
	url: string
	key: string
}

export type TypeCountryCode =
	Checkout['data']['attributes']['checkout_data']['billing_address']['country']

export type TypeSidebarLink = {
	href: string
	text: string
	icon: LucideIcon
}

export enum SortByOptions {
	ASC = 'asc',
	DESC = 'desc'
}

export enum LearnType {
	VOCABULARY = 'VOCABULARY',
	EXPRESSIONS = 'EXPRESSIONS'
}
