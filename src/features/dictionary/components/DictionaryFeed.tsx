'use client'

import { DictionaryCard } from '@/features/dictionary'
import { TypeSearchDictionaryWord } from '@/types'

interface IDictionaryFeedProps {
	data: TypeSearchDictionaryWord[]
}

export const DictionaryFeed = ({ data }: IDictionaryFeedProps) => {
	return (
		<div className="flex flex-col lg:grid lg:grid-cols-2 mt-10">
			{data.map((item, index) => (
				<DictionaryCard key={item.id} data={item} index={index} />
			))}
		</div>
	)
}

DictionaryFeed.Skeleton = function Skeleton() {
	const fakeArray = new Array(6).fill(0)
	return (
		<div className="flex flex-col lg:grid lg:grid-cols-2 mt-10">
			{fakeArray.map((_, index) => (
				<DictionaryCard.Skeleton key={index} />
			))}
		</div>
	)
}
