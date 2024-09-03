'use client'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'

interface IUseConfirmProps {
	title?: string
	message?: string
	loading?: boolean
}

export const useConfirm = ({
	title = 'Are you absolutely sure?',
	message = 'This action cannot be undone',
	loading
}: IUseConfirmProps = {}): [() => JSX.Element, () => Promise<boolean>] => {
	const [promise, setPromise] = useState<{
		resolve: (value: boolean) => void
	} | null>(null)

	const confirm = () =>
		new Promise((resolve, reject) => {
			setPromise({ resolve })
		})

	const handleClose = () => {
		setPromise(null)
	}

	const handleConfirm = () => {
		promise?.resolve(true)
		handleClose()
	}

	const handleCancel = () => {
		promise?.resolve(false)
		handleClose()
	}

	const ConfirmationDialog = () => (
		<Dialog open={promise !== null} onOpenChange={handleCancel}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{message}</DialogDescription>
				</DialogHeader>
				<DialogFooter className="pt-2  max-sm:gap-2">
					<Button variant={'ghost'} onClick={handleCancel} disabled={loading}>
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

	return [ConfirmationDialog, confirm as () => Promise<boolean>]
}
