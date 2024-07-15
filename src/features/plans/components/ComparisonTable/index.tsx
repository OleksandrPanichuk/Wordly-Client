import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui'
import { TableHint } from '@/features/plans'
import { cn } from '@/lib'
import { CheckCircle2Icon } from 'lucide-react'
import { data } from './ComparisonTable.data'

export const ComparisonTable = () => {
	return (
		<Table className="w-full mb-12">
			<TableHeader>
				<TableRow className="h-[94px] bg-tw-blue-200 text-white font-bold font-noto-sans  ">
					<TableHead className="p-2 xs:p-4 rounded-tl-3xl  pr-0 sm:pr-0 sm:p-6 text-center text-base sm:text-lg lg:text-2xl">
						Compare plans
					</TableHead>
					<TableHead className="text-center text-base sm:text-lg lg:text-2xl">
						<span className="sm:hidden block">Free</span>
						<span className="sm:block hidden">Free plan</span>
					</TableHead>
					<TableHead className="p-2 xs:p-4 rounded-tr-3xl  pl-0 sm:pl-0 sm:p-6 text-center text-base sm:text-lg lg:text-2xl">
						<span className="sm:hidden block">Premium</span>
						<span className="sm:block hidden">Premium plan</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((el, index) => (
					<TableRow
						key={el.id}
						className={cn(
							'h-20 p-4 sm:p-6 text-sm sm:text-base lg:text-lg font-noto-sans font-bold text-tw-black',
							index % 2 === 0 ? 'bg-white' : 'bg-tw-blue-75'
						)}
					>
						<TableCell
							className={cn(
								'p-4 pr-0 ',
								index === data.length - 1 && 'rounded-bl-3xl'
							)}
						>
							<span>{el.cellName}</span>
							{el.hint && <TableHint {...el.hint} />}
						</TableCell>
						<TableCell className="text-center">
							{el.freePlan ? (
								<div className="w-full flex items-center justify-center">
									<CheckCircle2Icon
										className="size-5 sm:size-7"
										stroke="var(--tw-purple-400)"
									/>
								</div>
							) : (
								<span className="text-xs  sm:text-lg font-medium font-noto-sans ">
									Limited
								</span>
							)}
						</TableCell>
						<TableCell
							className={cn(
								'p-4 pl-0 sm:pl-0 sm:p-6',
								index === data.length - 1 && 'rounded-br-3xl'
							)}
						>
							<div className="w-full flex items-center justify-center">
								<CheckCircle2Icon
									className="size-5 sm:size-7 "
									stroke="var(--tw-purple-400)"
								/>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableCaption>
				*Most of the features are currently in developing state
			</TableCaption>
		</Table>
	)
}
