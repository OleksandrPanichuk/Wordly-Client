import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function capitalize(str: string): string {
	const words = str.split(' ')
	const result: string[] = []

	words.forEach((word) => {
		result.push(word.charAt(0).toUpperCase() + word.slice(1))
	})
	return result.join(' ')
}

export function capitalizeOnlyFirstLetter(str: string): string {
	return str
		.split(' ')
		.map((el, i) => (i == 0 ? el.charAt(0).toUpperCase() + el.slice(1) : el))
		.join(' ')
}
