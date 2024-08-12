export const Routes = {
	ROOT: '/',

	PRIVACY_POLICY: '/privacy-policy',
	TERMS_OF_SERVICE: '/terms-of-service',

	ABOUT_US: '/about-us',
	CONTACT_US: '/contact-us',
	HELP: '/help',

	// Auth links
	SIGN_IN: '/sign-in',
	SIGN_UP: '/sign-up',
	RESET_PASSWORD: '/reset-password',

	// Vocabulary
	VOCABULARY: '/vocab',
	VOCAB_LEVEL_BASED: '/vocab/level-based',
	VOCAB_TOPIC_RELATED: '/vocab/topic-related',
	VOCAB_PROFICIENCY_TESTS: '/vocab/proficiency-tests',
	VOCAB_COMMON: '/vocab/most-common',

	// Expressions
	EXPRESSIONS: '/expressions',
	IDIOMS: '/expressions/idioms',
	COLLOCATIONS: '/expressions/collocations',
	PROVERBS: '/expressions/proverbs',
	PHRASAL_VERBS: '/expressions/phrasal-verbs',

	// Pronunciation
	PRONUNCIATION: '/pronunciation',
	ALPHABET: '/pronunciation/alphabet',
	MULTIGRAPHS: '/pronunciation/multigraphs',
	VOWELS: '/pronunciation/vowels',
	CONSONANTS: '/pronunciation/consonants',

	DICTIONARY: '/dictionary',
	DICTIONARY_WORD: (word: string) => `/dictionary/${word}`,

	PAYMENT: '/payment',
	PREMIUM: '/plans',

	// Dashboard
	PROFILE: '/dashboard/profile',
	EDIT_PROFILE: '/dashboard/profile/edit',
	SETTINGS: '/dashboard/settings',
	MY_LISTS: '/dashboard/my-lists',
	BOOKMARKS: '/dashboard/bookmarks',
	DASHBOARD_BILLING: '/dashboard/billing',
	DASHBOARD_PAYMENT: (id: string) => `/dashboard/payments/${id}`,
	TRAINING_SESSION: '/dashboard/training-sessions',
	STATS: '/dashboard/stats'
} as const
