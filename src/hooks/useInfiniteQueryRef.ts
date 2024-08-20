'use client'

import { useCallback, useRef } from 'react'

type Props = {
	hasNextPage: boolean
	isLoading: boolean
	isFetching: boolean
	fetchNextPage: () => void
}

export const useInfiniteQueryRef = ({
	fetchNextPage,
	hasNextPage,
	isFetching,
	isLoading
}: Props) => {
	const observer = useRef<IntersectionObserver>()

	const lastElementRef = useCallback(
		(node: HTMLDivElement) => {
			if (isLoading) return

			if (observer.current) observer.current.disconnect()

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetching) {
					fetchNextPage()
				}
			})

			if (node) observer.current.observe(node)
		},
		[fetchNextPage, hasNextPage, isFetching, isLoading]
	)

	return lastElementRef
}
