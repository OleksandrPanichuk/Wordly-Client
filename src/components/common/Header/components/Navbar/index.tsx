import Link from 'next/link'
import { links } from './Navbar.data'

import { Logo, Visibility } from '@/components/common'
import {
	Button,
	Separator,
	Sheet,
	SheetContent,
	SheetTrigger,
} from '@/components/ui'
import { cn } from '@/lib'
import { useAuth } from '@/providers'
import { Routes } from '@/shared/constants'
import { MenuIcon, UserIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { UserMenu } from '../UserMenu'
import styles from './Navbar.module.scss'

export const Navbar = () => {
	const pathname = usePathname()
	return (
		<Visibility bp='lg'>
			<nav className='flex-1 hidden lg:block'>
				<ul className='flex items-center xl:gap-9 gap-6'>
					{links.map(link => (
						<li key={link.id}>
							<Link className={cn(styles.link, pathname.includes(link.href) && styles.active)} href={link.href}>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</Visibility>
	)
}

Navbar.Mobile = function MobileNavbar() {
	const { user } = useAuth()
	const pathname = usePathname()
	return (
		<Visibility bp='max-lg'>
			<Sheet>
				<SheetTrigger className='lg:hidden hover:bg-tw-blue-50 transition duration-300 p-2 rounded-md'>
					<MenuIcon />
				</SheetTrigger>
				<SheetContent
					side='left'
					className='flex flex-col gap-0 lg:hidden p-0 overflow-auto max-w-[25rem] w-full '
				>
					<div className='px-3 mt-6 my-4 '>
						<Logo withText width={35} height={35} />
					</div>
					<Separator />
					<nav>
						<ul className='flex flex-col '>
							{links.map(link => (
								<li key={link.id}>
									<Link href={link.href} className={cn(styles['mobile-link'], pathname.includes(link.href) && styles.active)}>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<Separator />
					{user ? (
						<UserMenu.Mobile />
					) : (
						<>
							<Separator className='mt-auto mb-4' />
							<Button
								asChild
								font='base'
								variant={'primary'}
								className='px-5 mx-3 mb-4'
							>
								<Link href={Routes.SIGN_IN}>
									<UserIcon />
									Login
								</Link>
							</Button>
						</>
					)}
				</SheetContent>
			</Sheet>
		</Visibility>
	)
}
