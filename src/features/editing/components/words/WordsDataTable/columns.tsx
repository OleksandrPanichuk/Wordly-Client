import { GetAllWordsResponse } from '@/api'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Text,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui'
import { Images } from '@/constants'
import { selectAuthUser } from '@/features/auth'
import { useAppSelector } from '@/store'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, EditIcon, MoreHorizontal, TrashIcon } from 'lucide-react'
import Image from 'next/image'

import styles from './WordsDataTable.module.scss'

export const columns: ColumnDef<GetAllWordsResponse['words'][0]>[] = [
	{
		id: 'number',
		header: () => (
			<Text size="sm" className={styles.headerText} weight={500}>
				№
			</Text>
		),
		cell: ({ row }) => row.index + 1
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			return <Text>{row.original.name}</Text>
		}
	},
	{
		accessorKey: 'transcription',
		header: () => (
			<Text size="sm" className={styles.headerText} weight={500}>
				Transcription
			</Text>
		),
		cell: ({ row }) => {
			const phonetics = row.original.transcription
			if (!phonetics.en || !phonetics.us) {
				return <>No transcription</>
			}

			return (
				<div>
					{phonetics?.en && (
						<div className={styles.phoneticsImageWrapper}>
							<Image
								width={30}
								height={30}
								src={Images.EN_FLAG}
								alt="en-pronunciation"
								className={styles.phoneticsImage}
							/>
							{phonetics.en}
						</div>
					)}
					{phonetics?.us && (
						<div className={styles.phoneticsImageWrapper}>
							<Image
								width={30}
								height={30}
								src={Images.US_FLAG}
								alt="us-pronunciation"
								className={styles.phoneticsImage}
							/>
							{phonetics.us}
						</div>
					)}
				</div>
			)
		}
	},
	{
		accessorKey: 'partsOfSpeech',
		header: () => (
			<Text size={'sm'} className={styles.headerText} weight={500}>
				Parts of speech
			</Text>
		),
		cell: ({ row }) => {
			const partsOfSpeech = row.original.partsOfSpeech

			return (
				<div className={styles.partsOfSpeechWrapper}>
					{partsOfSpeech.slice(0, 2).map((el) => (
						<button key={el} className={styles.partsOfSpeechItem}>
							{el}
						</button>
					))}
					{partsOfSpeech.slice(2).length > 1 && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button className={styles.partsOfSpeechItem}>
										+{partsOfSpeech.slice(2).length} more
									</button>
								</TooltipTrigger>
								<TooltipContent className={styles.partsOfSpeechTooltip}>
									{partsOfSpeech.slice(2).map((el) => (
										<button key={el} className={styles.partsOfSpeechItem}>
											{el}
										</button>
									))}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
				</div>
			)
		}
	},
	{
		accessorKey: '_count',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Total Meanings
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			return <Text>{row.original._count.meanings}</Text>
		}
	},
	{
		id: 'options',
		cell: function Options({ row }) {
			const user = useAppSelector(selectAuthUser)

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<EditIcon className="mr-2" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						{user?.id === row.original.creatorId && (
							<DropdownMenuItem className="hover:bg-red-200 hover:text-red-700">
								<TrashIcon className="mr-2" />
								Delete
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	}
]
