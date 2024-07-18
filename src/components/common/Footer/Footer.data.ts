import { Routes } from '@/shared/constants'
import { TypeFooterItem, TypeFooterKey, TypeMediaLink } from './Footer.types'

export const data: Record<TypeFooterKey, TypeFooterItem[]> = {
	QUICK_ACCESS: [
		{
			href: Routes.ROOT,
			text: 'Home'
		},
		{
			href: Routes.ABOUT_US,
			text: 'About Us'
		},
		{
			href: Routes.CONTACT_US,
			text: 'Contact Us'
		},
		{
			href: Routes.HELP,
			text: 'Help Center'
		}
	],
	VOCABULARY: [
		{
			href: Routes.VOCAB_LEVEL_BASED,
			text: 'Level-based'
		},
		{
			href: Routes.VOCAB_TOPIC_RELATED,
			text: 'Topic-related'
		},
		{
			href: Routes.VOCAB_PROFICIENCY_TESTS,
			text: 'Proficiency Tests'
		},
		{
			href: Routes.VOCAB_COMMON,
			text: 'Most Common'
		},
		{
			href: Routes.VOCABULARY,
			text: 'See more...'
		}
	],
	EXPRESSIONS: [
		{
			href: Routes.IDIOMS,
			text: 'English Idioms'
		},
		{
			href: Routes.COLLOCATIONS,
			text: 'English Collocations'
		},
		{
			href: Routes.PROVERBS,
			text: 'English Proverbs'
		},
		{
			href: Routes.PHRASAL_VERBS,
			text: 'Phrasal Verbs'
		},
		{
			href: Routes.EXPRESSIONS,
			text: 'See more...'
		}
	],
	PRONUNCIATION: [
		{
			href: Routes.ALPHABET,
			text: 'English Alphabet'
		},
		{
			href: Routes.MULTIGRAPHS,
			text: 'English Multigraphs'
		},
		{
			href: Routes.VOWELS,
			text: 'Vowels'
		},
		{
			href: Routes.CONSONANTS,
			text: 'Consonants'
		},
		{
			href: Routes.PRONUNCIATION,
			text: 'See more...'
		}
	]
}

export const titlesMap: Record<TypeFooterKey, string> = {
	QUICK_ACCESS: 'Quick access',
	VOCABULARY: 'Vocabulary',
	EXPRESSIONS: 'Expressions',
	PRONUNCIATION: 'Pronunciation'
}

export const mediaLinks: TypeMediaLink[] = [
	{
		href: 'https://www.instagram.com',
		iconPath: '/svgs/instagram.svg',
		alt: 'instagram'
	},
	{
		href: 'https://twitter.com',
		iconPath: '/svgs/twitter.svg',
		alt: 'twitter'
	},
	{
		href: 'https://ir.linkedin.com',
		iconPath: '/svgs/linkedin.svg',
		alt: 'linkedin'
	},
	{
		href: 'https://www.facebook.com',
		iconPath: '/svgs/facebook.svg',
		alt: 'facebook'
	},
	{
		href: 'https://t.me',
		iconPath: '/svgs/telegram.svg',
		alt: 'telegram'
	}
]
