'use client'

import { useSignOutMutation } from '@/api'
import { Hint, Logo, Visibility } from '@/components/common'
import { Sheet, SheetContent, SheetTrigger, Text } from '@/components/ui'
import {
	adminPanelSidebarLinks,
	dashboardSidebarLinks,
	editPanelSidebarLinks,
	Routes
} from '@/constants'
import { cn } from '@/lib'
import { TypeSidebarLink } from '@/types'
import { CrownIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithoutRef } from 'react'

type SidebarLinks = 'admin' | 'edit' | 'dashboard'

interface ISidebarProps {
	subscribed?: boolean
	links: SidebarLinks
}

type SidebarDesktopProps = {
	subscribed?: boolean
	links: TypeSidebarLink[]
}

type SidebarLaptopProps = SidebarDesktopProps

type SidebarMobileProps = SidebarDesktopProps

const linksMap: Record<SidebarLinks, TypeSidebarLink[]> = {
	admin: adminPanelSidebarLinks,
	edit: editPanelSidebarLinks,
	dashboard: dashboardSidebarLinks
}

export const Sidebar = ({ subscribed, links }: ISidebarProps) => {
	const data = linksMap[links]
	return (
		<aside>
			<Visibility bp={['sm', 'max-lg']}>
				<Sidebar.Laptop links={data} subscribed={subscribed} />
			</Visibility>

			<Visibility bp="lg">
				<Sidebar.Desktop links={data} subscribed={subscribed} />
			</Visibility>
		</aside>
	)
}

Sidebar.Desktop = function Desktop({
	className,
	subscribed,
	links,
	...props
}: ComponentPropsWithoutRef<'div'> & SidebarDesktopProps) {
	const pathname = usePathname()
	const { mutate: signOut } = useSignOutMutation()

	return (
		<div
			className={cn(
				'hidden lg:flex  flex-col p-4 sticky top-0 z-10 min-h-screen border-solid border-[1px] border-black/10 items-center w-[15.5rem] gap-3',
				className
			)}
			{...props}
		>
			<div className="w-full">
				<Logo className="mb-4 w-min" withText />
			</div>

			{links.map((link) => {
				const Icon = link.icon

				const isActive = pathname.startsWith(link.href)

				return (
					<Link
						className={cn(
							'px-3 py-2 w-full flex items-center gap-2 ease-linear transition-all duration-300 rounded-xl group',
							isActive && 'bg-tw-blue-50'
						)}
						key={link.href}
						href={link.href}
					>
						<Icon
							className="group-hover:stroke-tw-purple-400"
							stroke={isActive ? 'var(--tw-purple-400)' : 'var(--tw-black)'}
						/>
						<Text
							as="span"
							color={'black'}
							className={cn(
								' group-hover:text-tw-purple-400',
								isActive && '!text-tw-purple-400'
							)}
						>
							{link.text}
						</Text>
					</Link>
				)
			})}

			<div className="w-full flex justify-center flex-1">
				<button
					className="h-min px-3 py-2 rounded-md transition-all duration-300 hover:bg-rose-200 ease-linear text-tw-red-alarm w-full flex items-center gap-2"
					onClick={signOut}
				>
					<LogOutIcon className="stroke-tw-red-alarm" />
					Sign Out
				</button>
			</div>

			{!subscribed && (
				<Link
					href={Routes.PREMIUM}
					className="rounded-3xl p-3 bg-tw-blue-450 flex items-center gap-2 w-full justify-center text-white"
				>
					<CrownIcon stroke="white" />
					Premium
				</Link>
			)}
		</div>
	)
}

Sidebar.Laptop = function Laptop({ links, subscribed }: SidebarLaptopProps) {
	const pathname = usePathname()
	const { mutate: signOut } = useSignOutMutation()

	return (
		<div className="hidden sm:flex flex-col py-4 sticky top-0 z-10 min-h-screen border-solid border-[1px] border-black/10 items-center w-[4.875rem] gap-3 lg:hidden">
			<Logo className="mb-4" />

			{links.map((link) => {
				const Icon = link.icon

				const isActive = pathname.startsWith(link.href)

				return (
					<Hint label={link.text} key={link.href} side="right">
						<Link
							className={cn(
								'p-3  ease-linear transition-all duration-300 rounded-xl group',
								isActive && 'bg-tw-blue-50'
							)}
							href={link.href}
						>
							<Icon
								className="group-hover:stroke-tw-purple-400"
								stroke={isActive ? 'var(--tw-purple-400)' : 'black'}
							/>
						</Link>
					</Hint>
				)
			})}

			<div className="w-full flex justify-center flex-1">
				<Hint label="Sign Out" side="right">
					<button
						className="size-min p-3 rounded-md transition-all duration-300 hover:bg-rose-200 ease-linear "
						onClick={signOut}
					>
						<LogOutIcon className="stroke-tw-red-alarm" />
					</button>
				</Hint>
			</div>

			{!subscribed && (
				<Hint label="Premium" side="right">
					<Link
						href={Routes.PREMIUM}
						className="size-12 rounded-full p-3 bg-tw-blue-450"
					>
						<CrownIcon stroke="white" />
					</Link>
				</Hint>
			)}
		</div>
	)
}

Sidebar.Mobile = function Mobile({ links, subscribed }: SidebarMobileProps) {
	return (
		<Visibility bp="max-sm">
			<Sheet>
				<SheetTrigger className="sm:hidden hover:bg-tw-blue-50 transition duration-300 p-2 rounded-md">
					<MenuIcon />
				</SheetTrigger>
				<SheetContent className="p-0 ">
					<Sidebar.Desktop
						className="flex sm:hidden border-none w-full"
						links={links}
						subscribed={subscribed}
					/>
				</SheetContent>
			</Sheet>
		</Visibility>
	)
}
