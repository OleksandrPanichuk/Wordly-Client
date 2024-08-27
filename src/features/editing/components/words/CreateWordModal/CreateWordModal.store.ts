import { create } from 'zustand'
import { type ICreateWordModalStore, Status } from './CreateWordModal.types'

export const useModalStore = create<ICreateWordModalStore>((set) => ({
	status: Status.NAME_CHECK,
	setStatus: (status) => set({ status }),

	isOpen: false,
	close: () => set({ isOpen: false, status: Status.NAME_CHECK, values: {} }),
	open: () => set({ isOpen: true }),
	toggle: () => set((state) => ({ isOpen: !state.isOpen, status: state.isOpen ? Status.NAME_CHECK : state.status, values: state.isOpen ? {} : state.values })),

	values: {},
	resetValues:( ) => set({ values: {} }),
	setValues: (values) =>
		set((state) => ({
			values: {
				...state.values,
				...values
			}
		})),
}))
