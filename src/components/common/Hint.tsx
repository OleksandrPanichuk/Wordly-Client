import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui'
import { PropsWithChildren } from 'react'

interface IHintProps {
	label: string
	delay?: number
	className?: string
	side?: 'top' | 'bottom' | 'left' | 'right'
}

export const Hint = ({
	children,
	label,
	delay = 300,
	className,
	side = 'top'
}: PropsWithChildren<IHintProps>) => {
	return (
		<TooltipProvider delayDuration={delay}>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side={side} className={className}>
					{label}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
