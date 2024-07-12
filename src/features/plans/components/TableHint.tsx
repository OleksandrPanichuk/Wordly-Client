import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	Text,
	Title
} from '@/components/ui'
import { PropsWithChildren } from 'react'

interface ITableHintProps {
	title: string
	text: string
}

export const TableHint = ({
	children,
	title,
	text
}: PropsWithChildren<ITableHintProps>) => {
	return (
		<Popover>
			<PopoverTrigger>{children}</PopoverTrigger>
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
