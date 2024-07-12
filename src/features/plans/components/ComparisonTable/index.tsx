import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui'
import { cn } from '@/lib'
import { CheckCircle2Icon } from 'lucide-react'
import { data } from './ComparisonTable.data'

export const ComparisonTable = () => {
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow className="h-[94px] bg-tw-blue-200 text-white font-bold font-noto-sans  text-base sm:text-lg lg:text-2xl">
					<TableHead className="p-2 xs:p-4 rounded-tl-3xl  pr-0 sm:pr-0 sm:p-6 text-center">
						Compare plans
					</TableHead>
					<TableHead className="text-center">
						<span className="sm:hidden block">Free</span>
						<span className="sm:block hidden">Free plan</span>
					</TableHead>
					<TableHead className="p-2 xs:p-4 rounded-tr-3xl  pl-0 sm:pl-0 sm:p-6 text-center">
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
						<TableCell className="p-4 pr-0">{el.cellName}</TableCell>
						<TableCell className="text-center">
							{el.freePlan ? (
								<div className="w-full flex items-center justify-center">
									<CheckCircle2Icon
										width={28}
										height={28}
										stroke="var(--tw-purple-400)"
									/>
								</div>
							) : (
								<span className="text-xs  sm:text-lg font-medium font-noto-sans ">
									Limited
								</span>
							)}
						</TableCell>
						<TableCell className="p-4 pl-0 sm:pl-0 sm:p-6">
							<div className="w-full flex items-center justify-center">
								<CheckCircle2Icon
									width={28}
									height={28}
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
