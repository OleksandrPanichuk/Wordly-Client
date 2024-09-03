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
		SUBSCRIPTION: '/subscription',
		PAYMENTS: '/payments',
		PAYMENT: (id: string) => `/payments/${id}`
	},
	DICTIONARY: {
		ROOT: '/dictionary',
		WORD: (word: string) => `/dictionary/${word}`
	},
	STATISTICS: {
		EDITING: '/statistic/editing'
	},
	WORDS: {
		ROOT: '/words',
		ADMIN: '/words/admin',
		BY_NAME: (name: string) => `/words/name/${name}`,
		BY_ID: (id: string) => `/words/${id}`,
		ADMIN_BY_ID: (id: string) => `/words/admin/${id}`
	}
} as const
