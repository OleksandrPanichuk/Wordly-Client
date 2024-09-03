import { BillingReason } from '@/features/billing/types'
import { DictionaryMode } from '@/features/dictionary/types'
import { BreakpointsType, TypeSidebarLink } from '@/types'
import {
	ALargeSmallIcon,
	BarChartBig,
	BookAIcon,
	BookmarkIcon,
	FolderOpenIcon,
	FoldersIcon,
	LayoutDashboardIcon,
	PackageIcon,
	SettingsIcon,
	UserIcon,
	WalletIcon
} from 'lucide-react'
import { Routes } from './routes'

export const adminPanelSidebarLinks: TypeSidebarLink[] = []

export const editPanelSidebarLinks: TypeSidebarLink[] = [
	{
		text: 'Dashboard',
		href: Routes.EDIT_PANEL,
		icon: LayoutDashboardIcon
	},
	{
		text: 'Packs',
		href: Routes.EDIT_PACKS,
		icon: PackageIcon
	},
	{
		text: 'Sets',
		href: Routes.EDIT_SETS,
		icon: FoldersIcon
	},
	{
		text: 'Lists',
		href: Routes.EDIT_LISTS,
		icon: FolderOpenIcon
	},
	{
		text: 'Expressions',
		href: Routes.EDIT_EXPRESSIONS,
		icon: BookAIcon
	},
	{
		text: 'Words',
		href: Routes.EDIT_WORDS,
		icon: ALargeSmallIcon
	}
]

export const dashboardSidebarLinks: TypeSidebarLink[] = [
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
		href: Routes.DASHBOARD_BILLING,
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

export const SESSION_COOKIE_NAME = 'wordly:session'

export const DictionaryModes: Record<DictionaryMode, string> = {
	DICTIONARY: 'DICTIONARY',
	USER: 'USER'
} as const

export const breakpoints: Record<BreakpointsType, string> = {
	lg: '(min-width: 1024px)',
	'max-lg': '(max-width: 1023.98px)',
	md: '(min-width: 768px)',
	'max-md': '(max-width: 767.98px)',
	sm: '(min-width: 640px)',
	'max-sm': '(max-width: 639.98px)',
	xs: '(min-width: 440px)',
	'max-xs': '(max-width: 439.98px)'
}

export const billingReasonBadgeVariantsMap = {
	[BillingReason.INITIAL]: 'red',
	[BillingReason.RENEWAL]: 'green',
	[BillingReason.UPDATED]: 'orange'
} as const
