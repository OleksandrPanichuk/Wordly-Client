'use client'

import { useDeleteWordMutation } from '@/api'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui'
import { Routes } from '@/constants'
import { useConfirm } from '@/hooks'
import { useAuth } from '@/providers'
import { UserRole } from '@/types'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { EditIcon, MoreHorizontal, TrashIcon } from 'lucide-react'
import Link from 'next/link'

interface IWordActionsProps {
	wordId: string
	creatorId?: string
}

export const WordActions = ({ wordId, creatorId }: IWordActionsProps) => {
	const { user } = useAuth()
	const { mutate: deleteWord, isPending } = useDeleteWordMutation()

	const [ConfirmDialog, confirm] = useConfirm({
		loading: isPending
	})

	const handleDelete = async () => {
		const ok = await confirm()

		if (!ok) {
			return
		}

		deleteWord({
			id: wordId,
			isAdmin: user?.role === UserRole.ADMIN
		})
	}

	return (
		<>
			<ConfirmDialog />
			<DropdownMenu>
				<DropdownMenuTrigger autoFocus={false} asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align={'end'}
					autoFocus={false}
					className={'min-w-[200px] space-y-2'}
				>
					<DropdownMenuItem asChild>
						<Link href={Routes.EDIT_WORD(wordId)}>
							<EditIcon className="mr-2" />
							Edit
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					{(user?.id === creatorId || user?.role === UserRole.ADMIN) && (
						<DropdownMenuItem
							onClick={handleDelete}
							className="hover:!bg-red-200 hover:!text-red-700"
						>
							<TrashIcon className="mr-2" />
							Delete
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
