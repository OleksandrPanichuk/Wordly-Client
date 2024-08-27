import { UpdateProfileInput } from '@/api'
import { AuthStore } from '@/providers'
import { StoreApi } from 'zustand'

export const getDefaultValues = (
	store: StoreApi<AuthStore>
): Partial<UpdateProfileInput> => {
	const user = store.getState().user

	return {
		gender: user?.gender ?? undefined,
		nativeLanguage: user?.nativeLanguage ?? undefined,
		username: user?.username ?? '',
		avatar: undefined
	}
}
