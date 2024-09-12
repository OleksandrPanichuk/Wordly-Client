'use client'

import { useInfiniteWordsQuery } from '@/api'
import { WordCard } from '@/features/editing'
import { useAuth } from '@/providers'
import { useSearchParams } from 'next/navigation'

import { Text } from '@/components/ui'
import { Loader2 } from 'lucide-react'
import styles from './WordsFeed.module.scss'

export const WordsFeed = () => {
	const { user } = useAuth()
	const searchParams = useSearchParams()
	const searchValue = searchParams.get('q') ?? undefined

	const { data, ref, isFetching } = useInfiniteWordsQuery({
		searchValue,
		creatorId: searchValue ? undefined : user?.id,
		take: 24
	})

	return (
		<>
			<div className={styles.feed}>
				{data?.pages.map((page) =>
					page.words.map((el) => <WordCard ref={ref} key={el.id} word={el} />)
				)}
			</div>
			{!data?.pages.map((page) => page.words).flat().length && !isFetching && (
				<Text color="black" size="2xl">
					Nothing found
				</Text>
			)}
			{isFetching && (
				<div className="mx-auto ">
					<Loader2 className="size-10 animate-spin text-sky-600" />
				</div>
			)}
		</>
	)
}
