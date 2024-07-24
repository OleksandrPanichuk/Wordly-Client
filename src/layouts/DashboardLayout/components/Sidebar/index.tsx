'use client'

import { Hint, Logo, Visibility } from '@/components/common'
import { Sheet, SheetContent, SheetTrigger, Text } from '@/components/ui'
import { useSignOut } from '@/features/auth'
import { cn } from '@/lib'
import { Routes } from '@/shared/constants'
import type { TypeSubscription } from '@/shared/types'
import { CrownIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithoutRef, createContext, useContext } from 'react'
import { links } from './Sidebar.data'

interface ISidebarProps {
	subscription?: TypeSubscription
}

interface ISidebarContext {
	subscription?: TypeSubscription
}

const SidebarContext = createContext<ISidebarContext>({})

const useSidebarContext = () => useContext(SidebarContext)

export const Sidebar = ({ subscription }: ISidebarProps) => {
	return (
		<SidebarContext.Provider value={{ subscription }}>
			<aside>
				<Visibility bp={['sm', 'max-lg']}>
					<Sidebar.Laptop />
				</Visibility>

				<Visibility bp="lg">
					<Sidebar.Desktop />
				</Visibility>
			</aside>
		</SidebarContext.Provider>
	)
}

Sidebar.Desktop = function Desktop({className, ...props}:ComponentPropsWithoutRef<'div'>) {
	const pathname = usePathname()
	const { mutate: signOut } = useSignOut()
	const { subscription } = useSidebarContext()

	return (
		<div className={cn("hidden lg:flex  flex-col p-4 sticky top-0 z-10 min-h-screen border-solid border-[1px] border-black/10 items-center w-[15.5rem] gap-3", className)}  >
			<div className="w-full">
			<Logo className="mb-4" withText />
			</div>

			{links.map((link) => {
				const Icon = link.icon

				const isActive = pathname.startsWith(link.href)

				return (
					<Link
						className={cn(
							'p-2 w-full flex items-center gap-2 ease-linear transition-all duration-300 rounded-xl group',
							isActive && 'bg-tw-blue-50'
						)}
						key={link.href}
						href={link.href}
					>
						<Icon
							className="group-hover:stroke-tw-purple-400"
							stroke={isActive ? 'var(--tw-purple-400)' : 'var(--tw-black)'}
						/>
						<Text as="span" className="text-tw-black group-hover:text-tw-purple-400">{link.text}</Text>
					</Link>
				)
			})}

			<div className="w-full flex justify-center flex-1">
				<button
					className="h-min p-3 rounded-md transition-all duration-300 hover:bg-rose-200 ease-linear text-tw-red-alarm w-full flex items-center gap-2"
					onClick={signOut}
				>
					<LogOutIcon className="stroke-tw-red-alarm" />
					Sign Out
				</button>
			</div>

			{!subscription && (
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

Sidebar.Laptop = function Laptop() {
	const pathname = usePathname()
	const { mutate: signOut } = useSignOut()
	const { subscription } = useSidebarContext()

	return (
		<div className="flex flex-col py-4 sticky top-0 z-10 min-h-screen border-solid border-[1px] border-black/10 items-center w-[4.875rem] gap-3 lg:hidden">
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

			{!subscription && (
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

Sidebar.Mobile = function Mobile() {
	return (
		<Visibility bp="max-sm">
			<Sheet>
				<SheetTrigger className="sm:hidden hover:bg-tw-blue-50 transition duration-300 p-2 rounded-md">
					<MenuIcon />
				</SheetTrigger>
				<SheetContent>
					<Sidebar.Desktop className='flex sm:hidden' />
				</SheetContent>
			</Sheet>
		</Visibility>
	)
}
