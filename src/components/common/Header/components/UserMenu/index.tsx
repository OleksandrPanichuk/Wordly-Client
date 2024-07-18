'use client'

import { Visibility } from '@/components/common'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Separator,
	Text
} from '@/components/ui'
import { selectAuthUser, useSignOut } from '@/features/auth'
import { cn } from '@/lib'
import { useAppSelector } from '@/store'
import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import { links } from './UserMenu.data'
import styles from './UserMenu.module.scss'

export const UserMenu = () => {
	const user = useAppSelector(selectAuthUser)
	const { isPending, mutate: signOut } = useSignOut()

	if (!user) return null

	return (
		<Visibility bp="lg">
			<DropdownMenu>
				<DropdownMenuTrigger className="flex items-center gap-2 max-lg:hidden">
					<Avatar>
						<AvatarImage src={user.avatar?.url} />
						<AvatarFallback>{user.username[0]}</AvatarFallback>
					</Avatar>
					<Text
						color="dark-gray"
						as="span"
						size="base"
						weight={500}
						className="truncate max-w-[200px]"
					>
						{user.username}
					</Text>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mr-2 p-0 ">
					<div className="flex items-center gap-3 p-4 bg-tw-blue-50 ">
						<Avatar>
							<AvatarImage src={user.avatar?.url} />
							<AvatarFallback>{user.username[0]}</AvatarFallback>
						</Avatar>
						<div className={styles.info}>
							<Text as="span" weight={600} color="black">
								{user.username}
							</Text>
							<Text size={'sm'} as="span">
								{user.email}
							</Text>
						</div>
					</div>
					<DropdownMenuSeparator />
					<div className="p-1 space-y-1">
						{links.map((link) => {
							const Icon = link.icon
							return (
								<DropdownMenuItem key={link.id} asChild className={styles.item}>
									<Link href={link.href}>
										<Icon />
										{link.label}
									</Link>
								</DropdownMenuItem>
							)
						})}
					</div>
					<DropdownMenuSeparator />
					<button
						disabled={isPending}
						onClick={signOut}
						className={styles['sign-out-btn']}
					>
						<LogOutIcon />
						Sign out
					</button>
				</DropdownMenuContent>
			</DropdownMenu>
		</Visibility>
	)
}

UserMenu.Mobile = function UserMenuMobile() {
	const user = useAppSelector(selectAuthUser)
	const { mutate: signOut, isPending } = useSignOut()

	if (!user) return null

	return (
		<>
			<div className="flex flex-col">
				{links.map((link) => {
					const Icon = link.icon
					return (
						<Link
							key={link.id}
							href={link.href}
							className={cn(styles.item, 'p-4')}
						>
							<Icon />
							{link.label}
						</Link>
					)
				})}
			</div>
			<Separator className="mt-auto" />
			<button
				disabled={isPending}
				onClick={signOut}
				className="bg-tw-blue-50 hover:bg-rose-200 transition-all duration-300 flex items-center gap-3 px-3 py-4"
			>
				<Avatar>
					<AvatarImage src={user.avatar?.url} />
					<AvatarFallback>{user.username[0]}</AvatarFallback>
				</Avatar>
				<div className={cn(styles.info, 'flex-1')}>
					<Text as="span" weight={600} color="black">
						{user.username}
					</Text>
					<Text size={'sm'} as="span">
						{user.email}
					</Text>
				</div>
				<LogOutIcon className="stroke-[#dc3545]" />
			</button>
		</>
	)
}
