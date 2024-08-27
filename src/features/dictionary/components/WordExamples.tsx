import { SvgIcon } from '@/components/common'
import { ExamplesModal } from '@/components/modals'
import type { TypeDictionaryWord } from '@/features/dictionary'
import { capitalize, cn, highlightWordInExample } from '@/lib'
import { BrainIcon } from 'lucide-react'

interface IWordExamplesProps {
	data: TypeDictionaryWord['examples']
	name?: string
	show?: number
	className?: string

	variant?: 'default' | 'meaning'
}
// TODO: Examples loading state
export const WordExamples = ({
	data,
	name,
	show,
	className,
	variant = 'default'
}: IWordExamplesProps) => {
	if (!data?.length || !name) return null

	const examplesToShow = show ? [...data].splice(0, show) : data

	return (
		<div
			className={cn(
				'rounded-3xl bg-tw-blue-50 pt-3 pb-4   md:py-6  px-4 md:px-6',
				className
			)}
		>
			{variant === 'default' && (
				<div className="flex justify-between content-center w-4/5 px-2 h-0 top-0 pb-0">
					<div className="text-center">
						<div className="absolute top-[-13px] flex justify-between w-16">
							<div className="relative flex flex-col items-center">
								<div className="bg-[#E0E0E0] h-4 w-4 rounded-full border-2 border-[#E0E0E0] absolute bottom-[-4px]"></div>
								<div className="bg-tw-gray-75 h-7  w-3.5 rounded-2xl relative z-100"></div>
							</div>
							<div className="relative flex flex-col items-center">
								<div className="bg-[#E0E0E0] h-4 w-4 rounded-full border-2 border-[#E0E0E0] absolute bottom-[-4px]"></div>
								<div className="bg-tw-gray-75 h-7  w-3.5 rounded-2xl relative z-100"></div>
							</div>
						</div>
					</div>
					<div className="text-center">
						<div className="absolute top-[-13px] flex justify-between w-16">
							<div className="relative flex flex-col items-center">
								<div className="bg-[#E0E0E0] h-4 w-4 rounded-full border-2 border-[#E0E0E0] absolute bottom-[-4px]"></div>
								<div className="bg-tw-gray-75 h-7 bg-gray-1 w-3.5 rounded-2xl relative z-100"></div>
							</div>
							<div className="relative flex flex-col items-center">
								<div className="bg-[#E0E0E0] h-4 w-4 rounded-full border-2 border-[#E0E0E0] absolute bottom-[-4px]"></div>
								<div className="bg-tw-gray-75 h-7 bg-gray-1 w-3.5 rounded-2xl relative z-100"></div>
							</div>
						</div>
					</div>
				</div>
			)}
			<div
				className={cn(
					'flex items-center justify-between',
					variant === 'default' && 'mt-3'
				)}
			>
				<div className={'text-lg font-semibold flex gap-2 items-center'}>
					<SvgIcon name="message-question" stroke="var(--gray-400)" />
					Examples
				</div>
				<ExamplesModal data={data} word={name}>
					<button>
						<BrainIcon className={'text-blue-400'} />
					</button>
				</ExamplesModal>
			</div>
			<ul className={'mt-4 flex flex-col gap-4'}>
				{examplesToShow.map((example, index) => (
					<ExamplesModal key={index} word={name} data={data}>
						<li
							className={
								'text-black/90 pl-6 relative text-base line-clamp-1 font-semibold before:absolute before:left-0 before:w-2 before:h-2 before:top-[50%] before:rounded-full before:bg-orange-300 before:translate-y-[-50%] highlight-example'
							}
						>
							{highlightWordInExample(capitalize(example), name)}
						</li>
					</ExamplesModal>
				))}
			</ul>
		</div>
	)
}
