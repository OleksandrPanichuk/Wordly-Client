'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui'
import { type PropsWithChildren } from 'react'
import { useModalStore } from './CreateWordModal.store'
import {
	MeaningForm,
	WordNameForm,
	WordTranscriptionForm
} from '@/features/editing'

import { Status } from './CreateWordModal.types'

export const CreateWordModal = ({ children }: PropsWithChildren) => {
	const { isOpen, toggle, status } = useModalStore()

	return (
		<Dialog open={isOpen} onOpenChange={toggle}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="overflow-x-hidden max-h-[600px]  pt-8">
				{status === Status.NAME_CHECK && <WordNameForm />}
				{status === Status.WORD_INFO && <WordTranscriptionForm />}
				{status === Status.MEANINGS && <MeaningForm />}
			</DialogContent>
		</Dialog>
	)
}
