import { TypeUser } from '@/shared/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
	user: TypeUser | null
}

const initialState: AuthState = {
	user: null
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		initializeUser: (state, action: PayloadAction<TypeUser | null>) => {
			if (!state.user && action.payload) {
				state.user = action.payload
			}
		},
		setUser: (state, action: PayloadAction<TypeUser>) => {
			state.user = action.payload
		},
		removeUser: (state) => {
			state.user = null
		}
	}
})

export * from './store.selectors'
export const authActions = authSlice.actions
export const authReducer =  authSlice.reducer
