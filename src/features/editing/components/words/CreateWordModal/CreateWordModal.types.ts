import { CreateWordInput } from '@/api'

export enum Status {
	NAME_CHECK = 'name-check',
	WORD_INFO = 'word-info',
	MEANINGS = 'meanings'
}

export interface ICreateWordModalStore {
	status: Status
	setStatus: (status: Status) => void

	isOpen: boolean
	open: () => void
	close: () => void
	toggle: () => void

	values: Partial<CreateWordInput>
	setValues: (values: Partial<CreateWordInput>) => void
	resetValues: () => void
}
