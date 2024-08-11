export const ApiRoutes = {
	USERS: {
		CURRENT: '/users/current'
	},
	STORAGE: {
		UPLOAD: '/storage/upload',
		DELETE: (key: string) => `/storage/delete/${key}`
	},
	AUTH: {
		SIGN_IN: '/auth/sign-in',
		SIGN_UP: '/auth/sign-up',
		SIGN_OUT: '/auth/sign-out',
		SIGN_IN_GOOGLE: '/auth/sign-in/google'
	},
	PASSWORD: {
		ROOT: '/auth/password',
		RESET: '/auth/password/reset'
	},
	BILLING_INFO: {
		ROOT: (userId: string) => `/users/${userId}/billing-info`,
		UPDATE: (userId: string, billingInfoId: string) =>
			`/users/${userId}/billing-info/${billingInfoId}`
	},
	BILLING: {
		SUBSCRIPTION: '/subscription'
	},
	DICTIONARY: {
		ROOT: '/dictionary',
		WORD: (word: string) => `/dictionary/${word}`
	}
} as const
