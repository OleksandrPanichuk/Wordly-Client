import { SvgIcon } from '@/components/common'
import { useExamplesModal } from '@/components/modals'
import { IconButton } from '@/components/ui'
import { capitalize, cn } from '@/lib'
import { PartOfSpeech, TypeDictionaryWord } from '@/shared/types'
import Image from 'next/image'
import { formatOrderNumber } from './Meanings.helpers'

import { Examples } from '@/features/dictionary-word'

interface IMeaningsProps {
	definitions: TypeDictionaryWord['meanings'][0]['definitions']
	partOfSpeech: PartOfSpeech
	name: string
}

// TODO: Meaning loading state
export const Meanings = ({
	definitions,
	partOfSpeech,
	name
}: IMeaningsProps) => {
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
									'text-tw-purple text-xl rounded-lg bg-tw-blue-50 font-bold px-2 h-fot py-1'
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
						<Examples
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
