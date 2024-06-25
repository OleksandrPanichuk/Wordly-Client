'use client'

import {
	Examples,
	MainInfo,
	Meanings,
	ModeTabs,
} from '@/components/screens/dictionary-word'
import { Button } from '@/components/ui'
import { DictionaryApi } from '@/services'
import { Routes } from '@/shared/constants'
import { DictionaryMode, TypeDictionaryWord } from '@/shared/types'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { useState } from 'react'

type Params = {
	word: string
}

const WordPage = () => {
	const [mode, setMode] = useState<DictionaryMode>('DICTIONARY')
	const params = useParams<Params>()

	const { data, isError, isFetching } = useQuery({
		queryKey: ['dictionary-word', mode, params.word.toLowerCase().trim()],
		queryFn: async () =>
			(
				await DictionaryApi.getWordByName(
					params.word.toLowerCase().trim(),
					mode
				)
			).data,
		retry: false,

		enabled: !!params.word,
	})

	if (!data && isError) notFound()

 
	return (
		<>
			<div className='mt-4 flex gap-4 justify-between max-w-[75rem] mx-auto'>
				<Button asChild variant={'outline'}>
					<Link
						href={Routes.DICTIONARY}
						className='group  hover:gap-3  ease-linear transition-all duration-300'
					>
						<ArrowLeft className='w-[16px] h-[16px] group-hover:scale-[1.25] transition-all ease-linear  duration-300 ' />
						Back to search
					</Link>
				</Button>
				<ModeTabs value={mode} onChange={setMode} />
			</div>
			<div className='mt-10 flex flex-col md:flex-row gap-6 max-w-[75rem] mx-auto'>
				<div className='md:flex-[784]'>
					{!isFetching ? (
						<>
							<MainInfo {...data} />
							{data?.meanings.map((meanings, index) => (
								<Meanings {...meanings}  key={index} name={data.name} />
							))}
						</>
					) : (
						<>
							<MainInfo.Skeleton />
						</>
					)}
				</div>
				<div className='md:flex-[392] '>
					<Examples data={data?.examples} />
				</div>
			</div>
		</>
	)
}

export default WordPage
