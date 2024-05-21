import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function capitalize(str: string): string {
	const words = str.split(' ')
	const result: string[] = []

	words.forEach(word => {
		result.push(word.charAt(0).toUpperCase() + word.slice(1))
	})
	return result.join(' ')
}
