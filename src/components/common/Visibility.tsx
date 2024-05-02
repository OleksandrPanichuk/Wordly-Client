'use client'
import { useMediaQuery } from '@/hooks'

type BreakpointsType =
	| 'lg'
	| 'max-lg'
	| 'md'
	| 'max-md'
	| 'sm'
	| 'max-sm'
	| 'xs'
	| 'max-xs'

const breakPointsMap: BreakpointsType[] = [
	'lg',
	'max-lg',
	'md',
	'max-md',
	'sm',
	'max-sm',
	'xs',
	'max-xs',
] as const

const breakpoints: Record<BreakpointsType, string> = {
	lg: '(min-width: 1024px)',
	'max-lg': '(max-width: 1023.98px)',
	md: '(min-width: 768px)',
	'max-md': '(max-width: 767.98px)',
	sm: '(min-width: 640px)',
	'max-sm': '(max-width: 639.98px)',
	xs: '(min-width: 480px)',
	'max-xs': '(max-width: 479.98px)',
}

type VisibilityProps = {
	ssr?: boolean
	hide?: boolean
	children: React.ReactNode
	fallback?: boolean[] | boolean
} & ({ breakpoint: string } | { bp: BreakpointsType })

export function Visibility(props: VisibilityProps) {
	const { hide, children, ssr = true, fallback = [true] } = props

	const [show] = useMediaQuery(
		'bp' in props ? breakpoints[props.bp] : props.breakpoint,
		{ ssr, fallback }
	)
	const isVisible = hide ? !show : show

	const rendered = isVisible ? children : null
	return rendered as React.ReactElement
}
