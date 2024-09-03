'use client'

import { useSignOutMutation } from '@/api'
import { Sidebar } from '@/components/common'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	IconButton,
	Text
} from '@/components/ui'
import {
	dashboardSidebarLinks,
	editPanelSidebarLinks,
	Routes
} from '@/constants'
import { useAuth } from '@/providers'
import {  UserRole } from '@/types'
import { HomeIcon, LogOutIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { headerContentMap } from './DashboardHeader.data'
import type { TypeSubscription } from '@/features/billing'

interface IHeaderProps {
	subscription: TypeSubscription | null
}

export const DashboardHeader = ({ subscription }: IHeaderProps) => {
	const pathname = usePathname()
	const router = useRouter()

	const { user } = useAuth()
	const { mutate: signOut } = useSignOutMutation()

	const leftSection = headerContentMap.find((item) =>
		pathname.includes(item.pathname)
	)

	const isEditPanel =
		pathname === Routes.EDIT_PANEL || pathname.startsWith('/dashboard/e')
	const isAdminPanel =
		pathname === Routes.ADMIN_PANEL || pathname.startsWith('/dashboard/a')
	const isAdmin = user?.role === UserRole.ADMIN

	return (
		<header className="flex items-center p-4 w-full">
			{!!leftSection && (
				<div className="hidden xs:flex items-center gap-2">
					<div className="flex flex-col">
						<h5 className="text-2xl font-bold text-tw-black">
							{leftSection.title}
						</h5>
						{leftSection.subtitle && (
							<Text className="hidden sm:block" weight={500} size="lg">
								{leftSection.subtitle}
							</Text>
						)}
					</div>
				</div>
			)}
			<div className="flex-1 flex items-center justify-end gap-1 md:gap-3">
				{(subscription || isAdmin) && !isEditPanel && (
					<Button variant="ghost" asChild>
						<Link href={Routes.EDIT_PANEL}>Edit mode</Link>
					</Button>
				)}

				<Button variant="ghost" onClick={router.back}>
					Back
				</Button>

				{isAdmin && !isAdminPanel && (
					<IconButton
						lname="Shield"
						variant={'ghost'}
						size="sm"
						onClick={() => router.push(Routes.ADMIN_PANEL)}
					/>
				)}

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className="cursor-pointer">
							<AvatarImage
								width={40}
								height={40}
								src={user?.avatar?.url}
								alt={user?.username}
							/>
							<AvatarFallback>{user?.username[0]}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className='min-w-[150px]'>
						<DropdownMenuItem asChild>
							<Link href={Routes.ROOT}>
								<HomeIcon className="mr-2" />
								Home
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href={Routes.PROFILE}>
								<UserIcon className="mr-2" />
								Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator className="my-1" />
						<DropdownMenuItem
							asChild
							className="hover:!bg-red-200 hover:!text-red-700 w-full"
						>
							<button onClick={() => signOut()}>
								<LogOutIcon className="mr-2" />
								Sign Out
							</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<Sidebar.Mobile
					links={isEditPanel ? editPanelSidebarLinks : dashboardSidebarLinks}
					subscribed={!!subscription}
				/>
			</div>
		</header>
	)
}
