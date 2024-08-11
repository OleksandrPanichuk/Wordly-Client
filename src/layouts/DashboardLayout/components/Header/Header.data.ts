import { Routes } from '@/constants'

export const headerContentMap: {
	title: string
	pathname: Routes
	subtitle?: string
}[] = [
	{
		pathname: Routes.PROFILE,
		title: 'User Profile',
		subtitle: 'Dashboard / Profile'
	},
	{
		pathname: Routes.MY_LISTS,
		title: 'My Wordlists'
	},
	{
		pathname: Routes.BOOKMARKS,
		title: 'Bookmarks'
	},
	{
		pathname: Routes.BILLING,
		title: 'Billing'
	},
	{
		pathname: Routes.STATS,
		title: 'Stats'
	},
	{
		pathname: Routes.SETTINGS,
		title: 'Settings'
	}
]
