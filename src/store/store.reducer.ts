import {authReducer} from "@/features/auth/store"
import { dictionaryReducer } from "@/features/dictionary/store"
import { combineReducers } from "@reduxjs/toolkit"


export const rootReducer = combineReducers({
	auth: authReducer,
	dictionary: dictionaryReducer
})