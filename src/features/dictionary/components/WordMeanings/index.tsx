import { SvgIcon } from '@/components/common'
import { IconButton } from '@/components/ui'
import { capitalize, cn } from '@/lib'
import type{  TypeDictionaryWord } from '@/features/dictionary'
import Image from 'next/image'
import { formatOrderNumber } from './WordMeanings.helpers'

import { WordExamples } from '@/features/dictionary'
import { PartOfSpeech } from '@/types'

interface IWordMeaningsProps {
	definitions: TypeDictionaryWord['meanings'][0]['definitions']
	partOfSpeech: PartOfSpeech
	name: string
}

// TODO: Meaning loading state
export const WordMeanings = ({
	definitions,
	partOfSpeech,
	name
}: IWordMeaningsProps) => {
	const title =
		partOfSpeech === 'VERB' ? `To ${name.toLowerCase()}` : capitalize(name)

	return (
		<div className="mt-8 " id={partOfSpeech.toLowerCase()}>
			<div className="flex justify-between bg-[#ebeeff] items-center py-4 pl-4 md:p-6 md:pr-0 rounded-t-3xl">
				<div className="flex md:space-x-6 md:items-center flex-col md:flex-row">
					<div className="font-medium md:text-2xl text-lg">{title}</div>
				</div>
				<div className="relative font-bold bg-[#1ABC9C] py-2 pr-4 h-10">
					<a id="noun" className="font-text-bold text-white text-base">
						{partOfSpeech}
					</a>
					<SvgIcon
						name="bookmark"
						width={32}
						height={40}
						className="absolute top-0 left-[-31px]"
					/>
				</div>
			</div>
			{definitions.map((meaning, index) => (
				<div
					key={meaning.id}
					className={cn(
						'mb-4 rounded-3xl shadow-lg border-tw-gray-200 md:p-6 p-4',
						index === 0 && 'rounded-t-none'
					)}
				>
					{/*Image*/}
					{meaning.image?.url && (
						<div>
							<Image src={meaning.image.url} alt={`definition-image`} />
						</div>
					)}
					{/*Info*/}
					<div>
						<div className={'flex gap-2 items-start '}>
							<div
								className={
									'text-tw-purple-400 text-xl rounded-lg bg-tw-blue-50 font-bold px-2 h-fot py-1'
								}
							>
								{formatOrderNumber(index + 1)}
							</div>
							<p className={'text-tw-black text-lg font-medium'}>
								{meaning.definition}
							</p>
						</div>
						{/*Action buttons*/}
						<div className={'mt-6 flex gap-4'}>
							<IconButton lname={'PackagePlus'} />
							<IconButton lname={'FolderInput'} />
						</div>
					</div>
					{/*Examples*/}
					{meaning.examples?.length > 0 && (
						<WordExamples
							data={meaning.examples}
							name={name}
							className="mt-4"
							variant="meaning"
						/>
					)}
				</div>
			))}
		</div>
	)
}
