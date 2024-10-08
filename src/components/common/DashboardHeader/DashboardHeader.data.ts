import { Routes } from '@/constants/routes'

export const headerContentMap: {
	title: string
	pathname: string
	subtitle?: string
}[] = [
	{
		pathname: Routes.PROFILE,
		title: 'User Profile',
		subtitle: 'Dashboard / Profile'
	},
	{
		pathname: Routes.DASHBOARD_PAYMENTS,
		title: 'Payments'
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
		pathname: Routes.DASHBOARD_BILLING,
		title: 'Billing'
	},
	{
		pathname: Routes.STATS,
		title: 'Stats'
	},
	{
		pathname: Routes.SETTINGS,
		title: 'Settings'
	},
	{
		title: 'Dashboard',
		pathname: Routes.EDIT_PANEL
	},
	{
		title:"Edit words",
		pathname: Routes.EDIT_WORDS
	}
]
