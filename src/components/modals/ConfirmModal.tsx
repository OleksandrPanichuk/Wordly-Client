'use client'

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui'
import { useDisclosure } from '@/hooks'
import { Loader2Icon } from 'lucide-react'
import { PropsWithChildren } from 'react'

interface IConfirmModalProps {
	title?: string
	description?: string
	loading?: boolean
	onConfirm?: () => void | Promise<void>
	onReject?: () => void | Promise<void>
}

export const ConfirmModal = ({
	children,
	title = 'Are you absolutely sure?',
	description = 'This action cannot be undone',
	loading,
	onConfirm,
	onReject
}: PropsWithChildren<IConfirmModalProps>) => {
	const { isOpen, close, toggle } = useDisclosure()

	const handleReject = async () => {
		await onReject?.()
		close()
	}

	const handleConfirm = async () => {
		await onConfirm?.()
		close()
	}

	const handleOpenChange = () => {
		if (loading) {
			return
		}

		toggle()
	}


	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter className='space-y-1'>
					<Button variant={'ghost'} onClick={handleReject} disabled={loading}>
						Cancel
					</Button>
					<Button
						variant={'primary'}
						className="rounded-md"
						onClick={handleConfirm}
						disabled={loading}
					>
						{loading ? <Loader2Icon className="animate-spin" /> : 'Confirm'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
