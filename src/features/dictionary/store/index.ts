import { create } from 'zustand'

interface DictionaryState {
	searchValue: string
	setSearchValue: (value: string) => void
}

export const useDictionaryStore = create<DictionaryState>((set) => ({
	searchValue: '',
	setSearchValue: (value) => set({ searchValue: value })
}))
