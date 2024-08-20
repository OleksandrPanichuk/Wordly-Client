'use client'

import { Hint } from '@/components/common'
import { Button } from '@/components/ui'
import { PlusIcon } from 'lucide-react'

export const CreateWordButton = () => {
	return (
		<Hint label="Add new word" side='bottom'>
			<Button variant={'ghost'} size="icon">
				<PlusIcon />
			</Button>
		</Hint>
	)
}
