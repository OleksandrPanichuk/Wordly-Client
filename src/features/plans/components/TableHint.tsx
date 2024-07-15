import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	Text,
	Title
} from '@/components/ui'
import { HelpCircle } from 'lucide-react'
// TODO:
interface ITableHintProps {
	title: string
	text: string
}

export const TableHint = ({ title, text }: ITableHintProps) => {
	return (
		<Popover>
			<PopoverTrigger className="align-middle">
				<HelpCircle className="size-5 sm:size-auto cursor-pointer ml-4 stroke-zinc-500" />
			</PopoverTrigger>
			<PopoverContent>
				<Title variant={'h5'} className="mb-2">
					{title}
				</Title>
				<Text size="sm" color="gray-400">
					{text}
				</Text>
			</PopoverContent>
		</Popover>
	)
}
