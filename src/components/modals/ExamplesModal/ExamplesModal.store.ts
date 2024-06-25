import { create } from 'zustand'

interface IUseExamplesModal {
	isOpen: boolean
	open: (data: string[], word: string) => void
	close: () => void
	data: string[] | undefined
	word: string | undefined
}

export const useExamplesModal = create<IUseExamplesModal>((set) => ({
	data: undefined,
	word: undefined,
	isOpen: false,

	open: (data, word) => set({ data, isOpen: true, word }),
	close: () => set({ data: undefined, isOpen: false, word: undefined })
}))
