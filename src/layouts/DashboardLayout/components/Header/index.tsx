'use client'

import { Avatar, AvatarFallback, AvatarImage, Text } from '@/components/ui'
import { selectAuthUser } from '@/features/auth'
import { useAppSelector } from '@/store'
import { ArrowLeftIcon } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Sidebar } from '../Sidebar'
import { headerContentMap } from './Header.data'

export const Header = () => {
	const { wordlistId } = useParams()
	const pathname = usePathname()
	const router = useRouter()

	const user = useAppSelector(selectAuthUser)

	const leftSection = headerContentMap.find((item) =>
		pathname.includes(item.pathname)
	)

	return (
		<header className="flex items-center p-4 w-full">
			{!!leftSection && (
				<div className="flex items-center gap-2">
					{wordlistId && (
						<button
							onClick={router.back}
							className="transition-transform hover:scale-125"
						>
							<ArrowLeftIcon />
						</button>
					)}
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
				<Avatar>
					<AvatarImage
						width={40}
						height={40}
						src={user?.avatar?.url}
						alt={user?.username}
					/>
					<AvatarFallback>{user?.username}</AvatarFallback>
				</Avatar>
				<Sidebar.Mobile />
			</div>
		</header>
	)
}
