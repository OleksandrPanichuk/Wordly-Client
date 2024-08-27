import { APP_URL } from '@/constants'
import { type ClassValue, clsx } from 'clsx'
import { formatDate, formatDistanceToNowStrict } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import nlp from 'compromise'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function capitalize(str: string): string {
	return str
		.split(' ')
		.map((el, i) =>
			i == 0 ? el.charAt(0).toUpperCase() + el.slice(1).toLowerCase() : el
		)
		.join(' ')
}

export function formatCurrency(num: number) {
	return Intl.NumberFormat('de-DE', {
		currency: 'EUR',
		style: 'currency'
	}).format(num)
}
export function formatRelativeDate(from: Date) {
	const currentDate = new Date()
	if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
		return formatDistanceToNowStrict(from, { addSuffix: true })
	} else {
		if (currentDate.getFullYear() === from.getFullYear()) {
			return formatDate(from, 'MMM d')
		} else {
			return formatDate(from, 'MMM d, yyyy')
		}
	}
}

export function toDateString(date: Date) {
	return new Date(date).toDateString()
}

export function absoluteApiUrl(url: string = '') {
	return APP_URL + '/api' + url
}

export function splitSentence(sentence: string): string[] {
	const wordPattern = /[\w\u0400-\u04FF]+|[.,!?]|[\s]+/g
	const words = sentence.match(wordPattern)
	return words ? words : []
}

export function compareWords(word1: string, word2: string): boolean {
	const doc1 = nlp(word1.toLowerCase())
	const doc2 = nlp(word2.toLowerCase())

	if (word1.toLowerCase() === word2.toLowerCase()) {
		return true
	}

	const lemma1 =
		doc1.verbs().toInfinitive().out('text') ||
		doc1.nouns().toSingular().out('text')
	const lemma2 =
		doc2.verbs().toInfinitive().out('text') ||
		doc2.nouns().toSingular().out('text')

	if (!!lemma1 && !!lemma2 && lemma1.toLowerCase() === lemma2.toLowerCase()) {
		return true
	}

	const positive1 = doc1.verbs().toPositive().out('text')
	const positive2 = doc2.verbs().toPositive().out('text')

	return (
		positive1 &&
		positive2 &&
		positive1.toLowerCase() === positive2.toLowerCase()
	)
}

export function testSentenceOnWord(
	sentence: string,
	wordToSearch: string
): boolean {
	let includes = false
	const words = splitSentence(sentence.toLowerCase())

	for (const word of words) {
		const areEqual = compareWords(word, wordToSearch)
		if (areEqual) {
			includes = true
			break
		}
	}

	return includes
}
