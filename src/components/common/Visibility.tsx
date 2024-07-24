'use client'
import { useMediaQuery } from '@/hooks'
import { breakpoints } from '@/shared/constants'
import { BreakpointsType } from '@/shared/types'

type VisibilityProps = {
	ssr?: boolean
	hide?: boolean
	children: React.ReactNode
	fallback?: boolean[] | boolean
} & ({ breakpoint: string } | { bp: BreakpointsType | BreakpointsType[] })

export function Visibility(props: VisibilityProps) {
	const { hide, children, ssr = true, fallback = [true] } = props

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
