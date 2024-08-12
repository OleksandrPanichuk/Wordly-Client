import { Checkout } from '@lemonsqueezy/lemonsqueezy.js'

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
