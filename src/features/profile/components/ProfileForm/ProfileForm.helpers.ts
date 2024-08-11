import { UpdateProfileInput } from '@/features/profile'
import { store } from '@/store'

export const getDefaultValues = (
): Partial<UpdateProfileInput> => {
	const user = store.getState().auth.user
	
	return {
		gender: user?.gender ?? undefined,
		nativeLanguage: user?.nativeLanguage ?? undefined,
		username: user?.username ?? '',
		avatar: undefined
	}
}
