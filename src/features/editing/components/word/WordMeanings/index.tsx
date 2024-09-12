'use client'

import { useGetWordMeaningsQuery } from '@/api'

interface IWordMeaningsProps {
	wordId: string
}

export const WordMeanings = ({ wordId }: IWordMeaningsProps) => {
	const { data } = useGetWordMeaningsQuery({ wordId })

	if (!data) {
		return null
	}

	return <div>
		
	</div>
}
