'use client'

import { useGetWordQuery } from '@/api'
import { Button } from '@/components/ui'

import { Routes } from '@/constants/routes'
import {
	ModeTabs,
	WordExamples,
	WordMainInfo,
	WordMeanings
} from '@/features/dictionary'
import { DictionaryMode } from '@/features/dictionary'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

type Params = {
	word: string
}

// TODO: Show something when there is no word(Сторінку, де пропонуємо користувачу змінити mode, бо можливо там буде це слово)

const WordPage = () => {
	const [mode, setMode] = useState<DictionaryMode>('DICTIONARY')
	const params = useParams<Params>()

	const word = params.word.toLowerCase().trim()

	const { data, isFetching } = useGetWordQuery({ word, mode })

	return (
		<>
			<div className="mt-4 flex gap-4 justify-between max-w-[75rem] mx-auto">
				<Button asChild variant={'outline'}>
					<Link
						href={Routes.DICTIONARY}
						className="group  hover:gap-3  ease-linear transition-all duration-300"
					>
						<ArrowLeft className="w-[16px] h-[16px] group-hover:scale-[1.25] transition-all ease-linear  duration-300 " />
						Back to search
					</Link>
				</Button>
				<ModeTabs defaultValue={mode} onChange={setMode} />
			</div>
			<div className="mt-10 flex flex-col lg:flex-row gap-6 max-w-[75rem] mx-auto">
				<div className="lg:flex-[784]">
					{!isFetching ? (
						<>
							<WordMainInfo {...data} />
							{data?.meanings.map((meanings, index) => (
								<WordMeanings {...meanings} key={index} name={data.name} />
							))}
						</>
					) : (
						<>
							<WordMainInfo.Skeleton />
						</>
					)}
				</div>
				<div className="lg:flex-[392] relative ">
					<WordExamples
						data={data?.examples}
						name={data?.name}
						show={8}
						className="sticky top-[86px]"
					/>
				</div>
			</div>
		</>
	)
}

export default WordPage
