import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Text
} from '@/components/ui'
import { capitalizeOnlyFirstLetter, highlightWordInExample } from '@/lib'
import { BrainIcon } from 'lucide-react'
import { PropsWithChildren } from 'react'

interface IExamplesModalProps {
	data: string[]
	word: string
}

const ExamplesModal = ({
	data,
	word,
	children
}: PropsWithChildren<IExamplesModalProps>) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent
				className={
					'md:h-[90vh] w-[95vw] sm:w-[80vw]  p-0 flex flex-col rounded-3xl'
				}
			>
				<DialogHeader
					className={
						'flex items-center justify-between bg-white rounded-t-3xl pt-4'
					}
				>
					<div className={'flex items-center gap-4'}>
						<BrainIcon width={32} height={32} color={'var(--tw-blue-450)'} />
						<DialogTitle asChild>
							<Text size={'lg'} color={'blue-450'} weight={700}>
								Examples
							</Text>
						</DialogTitle>
					</div>
					<DialogClose />
				</DialogHeader>
				<div
					className={
						'h-[90%] md:p-6 p-4 flex flex-col gap-4 overflow-auto bg-tw-gray-25 text-black rounded-b-3xl'
					}
				>
					{data?.map((example, i) => (
						<div
							key={i}
							className={
								'bg-white shadow-lg rounded-2xl p-4 font-medium text-lg highlight-example'
							}
						>
							{highlightWordInExample(capitalizeOnlyFirstLetter(example), word)}
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export { ExamplesModal }
