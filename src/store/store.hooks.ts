"use client"
import type { AppDispatch, AppStore, BoundActions, RootState } from '@/store'
import { type ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()


export const useAppActions = <
	Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject
>(
	actions: Actions
): BoundActions<Actions> => {
	const dispatch = useDispatch<AppDispatch>()

	return bindActionCreators(actions, dispatch)
}
