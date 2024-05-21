'use client'

import { TypeSearchDictionaryWord } from '@/shared/types'
import { Card } from './Card'

interface IFeedProps {
	data: TypeSearchDictionaryWord[]
}

export const Feed = ({ data }: IFeedProps) => {
	return (
		<div className='flex flex-col lg:grid lg:grid-cols-2 mt-10'>
			{data.map((item, index) => (
				<Card key={item.id} data={item} index={index} />
			))}
		</div>
	)
}

Feed.Skeleton = function Skeleton() {
	const fakeArray = new Array(6).fill(0)
	return <div className='flex flex-col lg:grid lg:grid-cols-2 mt-10'>{fakeArray.map((_,index) => (
		<Card.Skeleton key={index} />
	))}</div>
}
