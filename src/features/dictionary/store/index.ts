import { create } from 'zustand'

interface IDictionaryStore {
	searchValue: string
	setSearchValue: (val: string) => void
}

export const useDictionaryStore = create<IDictionaryStore>((set) => ({
	searchValue: '',
	setSearchValue: (searchValue) => set({ searchValue })
}))
