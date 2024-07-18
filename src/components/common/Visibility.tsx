'use client'
import { useMediaQuery } from '@/hooks'
import { breakpoints } from '@/shared/constants'
import { BreakpointsType } from '@/shared/types'

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
