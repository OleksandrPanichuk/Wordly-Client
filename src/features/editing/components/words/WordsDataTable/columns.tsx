'use client'
import { GetAllWordsResponse } from '@/api'
import { Button, Text } from '@/components/ui'
import { Images } from '@/constants'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'

import { WordActions, WordsPartOfSpeech } from '@/features/editing'
import styles from './WordsDataTable.module.scss'

export const columns: ColumnDef<GetAllWordsResponse['words'][0] & {index: number}>[] = [
	{
		id: 'number',
		header: () => (
			<Text size="sm" className={styles.headerText} weight={500}>
				№
			</Text>
		),
		cell: ({ row, table }) => {
			return row.original.index + 1
		}
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
			return <Text color={'black'}>{row.original.name}</Text>
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
			if (!phonetics.en && !phonetics.us) {
				return <>No transcription</>
			}

			return (
				<div className={styles.phonetics}>
					{phonetics?.en && (
						<div className={styles.phoneticsImageWrapper}>
							<Image
								width={24}
								height={24}
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
								width={24}
								height={24}
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

			return <WordsPartOfSpeech partsOfSpeech={partsOfSpeech} />
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
		cell: ({ row }) => {
			return (
				<WordActions
					wordId={row.original.id}
					creatorId={row.original.creatorId}
				/>
			)
		}
	}
]
