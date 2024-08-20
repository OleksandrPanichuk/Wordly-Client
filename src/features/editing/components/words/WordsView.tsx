'use client'

import { LayoutTypes, WordsDataTable, WordsFeed } from '@/features/editing'
import { useSearchParams } from 'next/navigation'

export const WordsView = () => {
	const searchParams = useSearchParams()
	const layoutType =
		(searchParams.get('layout') as LayoutTypes | null) ?? LayoutTypes.TABLE

	if (layoutType === LayoutTypes.FEED) {
		return <WordsFeed />
	}

	return <WordsDataTable />
}
