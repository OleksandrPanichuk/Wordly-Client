import { makeStore } from '@/store'
import {
	ActionCreator,
	ActionCreatorsMapObject,
	AsyncThunk
} from '@reduxjs/toolkit'

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export type BoundAsyncThunk<Action extends ActionCreator<any>> = (
	...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>

export type BoundActions<Actions extends ActionCreatorsMapObject> = {
	[key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
		? BoundAsyncThunk<Actions[key]>
		: Actions[key]
}
