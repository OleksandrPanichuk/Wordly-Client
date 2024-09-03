'use client'

import { GetAllWordsResponse } from '@/api'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui'
import { Images } from '@/constants'
import Image from 'next/image'
import { forwardRef } from 'react'
import { WordActions } from './WordActions'
import { WordsPartOfSpeech } from './WordsPartOfSpeech'

interface IWordCardProps {
	word: GetAllWordsResponse['words'][0]
}

export const WordCard = forwardRef<HTMLDivElement, IWordCardProps>(
	({ word }, ref) => {
		return (
			<Card ref={ref}>
				<CardHeader className="flex items-center justify-between">
					<CardTitle>{word.name}</CardTitle>
					<WordActions wordId={word.id} creatorId={word.creatorId} />
				</CardHeader>
				<CardContent>
					{word.transcription?.en && (
						<div className="text-gray-500 text-xl font-medium font-quicksand flex gap-4">
							<Image
								width={24}
								height={24}
								src={Images.EN_FLAG}
								alt="en-pronunciation"
								className="rounded-full"
							/>
							{word.transcription?.en}
						</div>
					)}
					{word.transcription?.us && (
						<div className="text-gray-500 text-xl font-medium font-quicksand flex gap-4">
							<Image
								width={24}
								height={24}
								src={Images.US_FLAG}
								alt="us-pronunciation"
								className="rounded-full"
							/>
							{word.transcription?.us}
						</div>
					)}
				</CardContent>
				<CardFooter>
					<WordsPartOfSpeech partsOfSpeech={word.partsOfSpeech} />
				</CardFooter>
			</Card>
		)
	}
)

WordCard.displayName = 'WordsCard'

export const WordCardSkeleton = () => {}
