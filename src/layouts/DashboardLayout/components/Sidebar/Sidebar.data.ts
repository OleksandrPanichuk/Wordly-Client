import { Routes } from '@/shared/constants'
import {
	BarChartBig,
	BookmarkIcon,
	FolderOpenIcon,
	LucideIcon,
	SettingsIcon,
	UserIcon,
	WalletIcon
} from 'lucide-react'

type TypeSidebarLink = {
	href: Routes
	text: string
	icon: LucideIcon
}

export const links: TypeSidebarLink[] = [
	{
		text: 'Profile',
		href: Routes.PROFILE,
		icon: UserIcon
	},
	{
		text: 'My Wordlists',
		href: Routes.MY_LISTS,
		icon: FolderOpenIcon
	},
	{
		text: 'Bookmarks',
		href: Routes.BOOKMARKS,
		icon: BookmarkIcon
	},
	{
		text: 'Billing',
		href: Routes.BILLING,
		icon: WalletIcon
	},
	{
		text: 'Stats',
		href: Routes.STATS,
		icon: BarChartBig
	},
	{
		text: 'Settings',
		href: Routes.SETTINGS,
		icon: SettingsIcon
	}
]
