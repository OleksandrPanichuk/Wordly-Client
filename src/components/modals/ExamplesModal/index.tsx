import { useExamplesModal } from './ExamplesModal.store'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Text
} from '@/components/ui'
import { BrainIcon } from 'lucide-react'
import { capitalizeOnlyFirstLetter, highlightWordInExample } from '@/lib'

const ExamplesModal = () => {
	const { isOpen, data, word, close } = useExamplesModal()

	if (!data || !word) return null

	return (
		<Dialog open={isOpen} onOpenChange={(opn) => !opn && close()}>
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

export { useExamplesModal, ExamplesModal }
