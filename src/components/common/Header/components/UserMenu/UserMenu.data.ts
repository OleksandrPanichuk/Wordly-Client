import { Routes } from '@/constants'
import {
	BarChartBig,
	Bookmark,
	FolderOpen,
	LucideIcon,
	Settings,
	Wallet
} from 'lucide-react'

type MenuLink = {
	href: string
	label: string
	icon: LucideIcon
	id: number
}

export const links: MenuLink[] = [
	{
		href: Routes.MY_LISTS,
		label: 'My Wordlists',
		icon: FolderOpen,
		id: 1
	},
	{
		href: Routes.BOOKMARKS,
		label: 'Bookmarks',
		icon: Bookmark,
		id: 2
	},
	{
		href: Routes.BILLING,
		label: 'Billing',
		icon: Wallet,
		id: 3
	},
	{
		href: Routes.STATS,
		label: 'Stats',
		icon: BarChartBig,
		id: 4
	},
	{
		href: Routes.SETTINGS,
		label: 'Settings',
		icon: Settings,
		id: 5
	}
]
