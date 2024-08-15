import { Variant } from '@lemonsqueezy/lemonsqueezy.js'

type GetNextPaymentDateInput = {
	createdAt: Date
	interval: Variant['data']['attributes']['interval']
	intervalCount: number | null
}

export function getNextPaymentDate({
	createdAt,
	interval,
	intervalCount
}: GetNextPaymentDateInput): Date | null {
	const date = new Date(createdAt)

	if (!intervalCount) {
		return null
	}

	switch (interval) {
		case 'day':
			date.setDate(date.getDate() + intervalCount)
			break
		case 'week':
			date.setDate(date.getDate() + intervalCount * 7)
			break
		case 'month':
			date.setMonth(date.getMonth() + intervalCount)
			break
		case 'year':
			date.setFullYear(date.getFullYear() + intervalCount)
			break
		default:
			throw new Error(`Invalid interval: ${interval}`)
	}

	return date
}
