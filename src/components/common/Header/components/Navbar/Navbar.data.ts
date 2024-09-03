import { Routes } from '@/constants/routes'

type NavLink = {
	href: string
	label: string
	id: number
}

export const links: NavLink[] = [
	{
		href: Routes.VOCABULARY,
		label: 'Vocabulary',
		id: 1
	},
	{
		href: Routes.EXPRESSIONS,
		label: 'Expressions',
		id: 2
	},
	{
		href: Routes.DICTIONARY,
		label: 'Dictionary',
		id: 3
	},
	{
		href: Routes.PREMIUM,
		label: 'Premium',
		id: 4
	}
]
