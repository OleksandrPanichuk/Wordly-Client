import { BreakpointsType, DictionaryMode } from '../types'

export const SESSION_COOKIE_NAME = 'wordly:session'

export const DictionaryModes: Record<DictionaryMode, string> = {
	DICTIONARY: 'DICTIONARY',
	USER: 'USER'
} as const

export const breakpoints: Record<BreakpointsType, string> = {
	lg: '(min-width: 1024px)',
	'max-lg': '(max-width: 1023.98px)',
	md: '(min-width: 768px)',
	'max-md': '(max-width: 767.98px)',
	sm: '(min-width: 640px)',
	'max-sm': '(max-width: 639.98px)',
	xs: '(min-width: 440px)',
	'max-xs': '(max-width: 439.98px)'
}
