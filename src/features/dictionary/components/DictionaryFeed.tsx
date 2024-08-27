'use client'

import {
	DictionaryCard,
	DictionaryCardSkeleton,
	type TypeSearchDictionaryWord
} from '@/features/dictionary'

interface IDictionaryFeedProps {
	data: TypeSearchDictionaryWord[][]
	ref: (node: HTMLDivElement) => void
}

export const DictionaryFeed = ({ data, ref }: IDictionaryFeedProps) => {
	return (
		<div className="flex flex-col lg:grid lg:grid-cols-2 mt-10">
			{data.map((words) =>
				words.map((item, index) => (
					<DictionaryCard key={item.id} data={item} index={index} ref={ref} />
				))
			)}
		</div>
	)
}

DictionaryFeed.Skeleton = function Skeleton() {
	const fakeArray = new Array(6).fill(0)
	return (
		<div className="flex flex-col lg:grid lg:grid-cols-2 mt-10">
			{fakeArray.map((_, index) => (
				<DictionaryCardSkeleton key={index} />
			))}
		</div>
	)
}
