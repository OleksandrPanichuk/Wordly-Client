import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './store.reducer'


export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production'
})

export * from './store.hooks'
export * from './store.reducer'
export * from './store.types'
