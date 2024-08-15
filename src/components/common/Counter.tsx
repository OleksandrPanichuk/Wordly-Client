'use client'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'

interface ICounterProps  {
	value: number
	direction?: 'up' | 'down'
	className?: string
	delay?: number
}

export function Counter({
	value,
	direction = 'up',
	className,
	delay = 0
}: ICounterProps) {
	const ref = useRef<HTMLSpanElement>(null)
	const startValue = useMemo(() => direction === 'down' ? value : 0, [direction, value])
	const motionValue = useMotionValue(startValue)
	const springValue = useSpring(motionValue, {
		damping: 100,
		stiffness: 100
	})
	const isInView = useInView(ref, { once: true })

	useEffect(() => {
		if (isInView) {
			const timer = setTimeout(() => {
				motionValue.set(direction === 'down' ? 0 : value)
			}, delay)

			return () => clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [motionValue, isInView])

	useEffect(
		() =>
			springValue.on('change', (latest) => {
				if (ref.current) {
					ref.current.textContent = Intl.NumberFormat('en-US').format(
						+latest.toFixed(0)
					)
				}
			}),
		[springValue]
	)

	return <span className={className} ref={ref}>{startValue}</span>
}
