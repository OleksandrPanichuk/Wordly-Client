'use client'

import { Hint } from '@/components/common'
import { Button } from '@/components/ui'
import { PlusIcon } from 'lucide-react'
import { CreateWordModal } from '@/features/editing'

export const CreateWordButton = () => {
	return (
		<Hint label="Add new word" side="bottom">
			<CreateWordModal>
				<Button variant={'ghost'} size="icon">
					<PlusIcon />
				</Button>
			</CreateWordModal>
		</Hint>
	)
}
