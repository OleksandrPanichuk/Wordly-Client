'use client'
import { breakpoints } from '@/constants'
import { useMediaQuery } from '@/hooks'
import { BreakpointsType } from '@/types'

type VisibilityProps = {
	ssr?: boolean
	hide?: boolean
	children: React.ReactNode
	fallback?: boolean[] | boolean
} & ({ breakpoint: string } | { bp: BreakpointsType | BreakpointsType[] })

export function Visibility(props: VisibilityProps) {
	const { hide, children, ssr = true, fallback } = props

	const show = useMediaQuery(
		'bp' in props ? getBreakpoints(props.bp) : [props.breakpoint],
		{ ssr, fallback }
	)
	const isVisible = hide
		? !show.every((el) => el === true)
		: show.every((el) => el === true)

	const rendered = isVisible ? children : null
	return rendered as React.ReactElement
}

function getBreakpoints(bp: BreakpointsType | BreakpointsType[]): string[] {
	if (Array.isArray(bp)) {
		const result: string[] = []

		bp.forEach((el) => {
			result.push(breakpoints[el])
		})

		return result
	}
	return [breakpoints[bp]]
}
