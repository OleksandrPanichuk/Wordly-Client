import { Images, Routes } from '@/constants'
import { TypeLearningCategory } from '@/features/dictionary'

export const learningCategories = [
	{
		title: 'Vocabulary',
		description:
			'Wordly actively engages you in thinking about word meanings, the related words, and how you can use words based on your need. Whether you want to learn it by topics, level-based, or for test preparation. Learn vocabulary with clear definitions, fun pictures, and example sentences.',
		href: Routes.VOCABULARY,

		imageUrl: Images.DICTIONARY_VOCABULARY
	},
	{
		title: 'Expressions',
		description:
			'Wordly immerses you in the world of idiomatic phrases, colloquialisms, and commonly used expressions, encouraging deeper understanding and usage in context. Tailor your exploration by themes, proficiency levels, or exam readiness. Delve into expressions with concise explanations, engaging visuals, and contextual usage examples to enhance your language proficiency',
		href: Routes.EXPRESSIONS,
		imageUrl: Images.DICTIONARY_EXPRESSIONS,
		rtl: true
	}
] satisfies TypeLearningCategory[]
