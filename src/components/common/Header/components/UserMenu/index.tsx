'use client'

import { useSignOutMutation } from '@/api'
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
import { Routes } from '@/constants'
import { cn } from '@/lib'
import { useAuth } from '@/providers'
import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import { links } from './UserMenu.data'
import styles from './UserMenu.module.scss'

export const UserMenu = () => {
	const { user } = useAuth()
	const { isPending, mutate: signOut } = useSignOutMutation()

	if (!user) return null

	return (
		<Visibility bp="lg">
			<DropdownMenu>
				<DropdownMenuTrigger className={styles.trigger}>
					<Avatar>
						<AvatarImage src={user.avatar?.url} />
						<AvatarFallback>{user.username[0]}</AvatarFallback>
					</Avatar>
					<Text
						color="dark-gray"
						as="span"
						size="base"
						weight={500}
						className={styles.username}
					>
						{user.username}
					</Text>
				</DropdownMenuTrigger>
				<DropdownMenuContent className={styles.content}>
					<Link
						href={Routes.PROFILE}
						className={styles.profileLink}
					>
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
					</Link>
					<DropdownMenuSeparator />
					<div className={styles.items}>
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
						className={styles.signOutBtn}
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
	const { user } = useAuth()
	const { mutate: signOut, isPending } = useSignOutMutation()

	if (!user) return null

	return (
		<>
			<div className={styles.mobileItems}>
				{links.map((link) => {
					const Icon = link.icon
					return (
						<Link
							key={link.id}
							href={link.href}
							className={styles.mobileItem}
						>
							<Icon />
							{link.label}
						</Link>
					)
				})}
			</div>
			<Separator className={styles.mobileSeparator} />
			<button
				disabled={isPending}
				onClick={signOut}
				className={styles.mobileSignOutBtn}
			>
				<Avatar>
					<AvatarImage src={user.avatar?.url} />
					<AvatarFallback>{user.username[0]}</AvatarFallback>
				</Avatar>
				<div className={styles.mobileInfo}>
					<Text as="span" weight={600} color="black">
						{user.username}
					</Text>
					<Text size={'sm'} as="span">
						{user.email}
					</Text>
				</div>
				<LogOutIcon />
			</button>
		</>
	)
}
