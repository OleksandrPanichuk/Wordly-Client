'use client'

import { useGetWordQuery } from '@/api'

import { WordExamples, WordMainInfo, WordMeanings } from '@/features/dictionary'

import { useParams } from 'next/navigation'

type Params = {
	word: string
}

// TODO: Show something when there is no word(Сторінку, де пропонуємо користувачу змінити mode, бо можливо там буде це слово)

const WordPage = () => {
	const params = useParams<Params>()

	const word = params.word.toLowerCase().trim()

	const { data, isFetching } = useGetWordQuery({ word })

	return (
		<>
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
				{!!data?.examples?.length && (
					<div className="lg:flex-[392] relative ">
						<WordExamples
							data={data?.examples}
							name={data?.name}
							show={8}
							className="sticky top-[86px]"
						/>
					</div>
				)}
			</div>
		</>
	)
}

export default WordPage
