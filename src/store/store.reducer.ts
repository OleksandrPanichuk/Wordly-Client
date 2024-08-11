import { combineReducers } from "@reduxjs/toolkit"
import {authReducer} from "@/features/auth/store"
import { dictionaryReducer } from "@/features/dictionary"


export const rootReducer = combineReducers({
	auth: authReducer,
	dictionary: dictionaryReducer
})