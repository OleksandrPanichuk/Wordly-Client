'use client'

import { Sidebar } from '@/components/common'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	IconButton,
	Text
} from '@/components/ui'
import {
	dashboardSidebarLinks,
	editPanelSidebarLinks,
	Routes
} from '@/constants'
import { selectAuthUser } from '@/features/auth'
import { useAppSelector } from '@/store'
import { TypeSubscription, UserRole } from '@/types'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { headerContentMap } from './DashboardHeader.data'

interface IHeaderProps {
	subscription: TypeSubscription | undefined
}

export const DashboardHeader = ({ subscription }: IHeaderProps) => {
	const pathname = usePathname()
	const router = useRouter()

	const user = useAppSelector(selectAuthUser)

	const leftSection = headerContentMap.find((item) =>
		pathname.includes(item.pathname)
	)

	const isEditPanel = pathname.startsWith(Routes.EDIT_PANEL)
	const isAdmin = user?.role === UserRole.ADMIN

	return (
		<header className="flex items-center p-4 w-full">
			{!!leftSection && (
				<div className="flex items-center gap-2">
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
			<div className="flex-1 flex items-center justify-end gap-3">
				{(subscription || isAdmin) && !isEditPanel && (
					<Button variant="ghost" asChild>
						<Link href={Routes.EDIT_PANEL}>Edit mode</Link>
					</Button>
				)}
				{isEditPanel && (
					<Button variant="ghost" onClick={router.back}>
						Back
					</Button>
				)}
				{isAdmin && (
					<IconButton lname='Shield' variant={'ghost'} size='sm' onClick={() => router.push(Routes.ADMIN_PANEL)}  /> 
				)}
				<Link href={Routes.PROFILE}>
					<Avatar>
						<AvatarImage
							width={40}
							height={40}
							src={user?.avatar?.url}
							alt={user?.username}
						/>
						<AvatarFallback>{user?.username[0]}</AvatarFallback>
					</Avatar>
				</Link>
				<Sidebar.Mobile
					links={isEditPanel ? editPanelSidebarLinks : dashboardSidebarLinks}
					subscribed={!!subscription}
				/>
			</div>
		</header>
	)
}
