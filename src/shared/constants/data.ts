import { DictionaryMode } from "../types"

export const SESSION_NAME = 'wordly:session'


export const DictionaryModes: Record<DictionaryMode, string> = {
DICTIONARY:"DICTIONARY",
USER:"USER"

 } as const