import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface DictionaryState {
	searchValue: string
}

const initialState: DictionaryState = {
	searchValue: ''
}

export const dictionarySlice = createSlice({
	name: 'dictionary',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		}
	}
})

export * from './store.selectors'
export const dictionaryActions = dictionarySlice.actions
export const dictionaryReducer = dictionarySlice.reducer
