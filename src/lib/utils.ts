import { APP_URL } from '@/constants'
import { type ClassValue, clsx } from 'clsx'
import { formatDate, formatDistanceToNowStrict } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function capitalize(str: string): string {
	return str
		.split(' ')
		.map((el, i) => (i == 0 ? el.charAt(0).toUpperCase() + el.slice(1).toLowerCase() : el))
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

export function toDateString(date:Date) {
	return new Date(date).toDateString()
}

export function absoluteApiUrl(url: string = '') {
	return APP_URL + '/api' + url
}
