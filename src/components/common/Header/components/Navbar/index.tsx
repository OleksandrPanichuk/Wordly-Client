import Link from 'next/link'
import { links } from './Navbar.data'

import { Logo, Visibility } from '@/components/common'
import {
	Button,
	Separator,
	Sheet,
	SheetContent,
	SheetTrigger
} from '@/components/ui'
import { Routes } from '@/constants'
import { cn } from '@/lib'
import { useAuth } from '@/providers'
import { MenuIcon, UserIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { UserMenu } from '../UserMenu'
import styles from './Navbar.module.scss'

export const Navbar = () => {
	const pathname = usePathname()
	return (
		<Visibility bp="lg">
			<nav className={styles.navbar}>
				<ul>
					{links.map((link) => (
						<li key={link.id}>
							<Link
								className={cn(
									styles.link,
									pathname.includes(link.href) && styles.active
								)}
								href={link.href}
							>
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
		<Visibility bp="max-lg">
			<Sheet>
				<SheetTrigger className={styles.mobileTrigger}>
					<MenuIcon />
				</SheetTrigger>
				<SheetContent
					side="left"
					className={styles.mobileContent}
				>
					<div className={styles.mobileLogoWrapper}>
						<Logo withText width={35} height={35} />
					</div>
					<Separator />
					<nav>
						<ul className={styles.mobileList}>
							{links.map((link) => (
								<li key={link.id}>
									<Link
										href={link.href}
										className={cn(
											styles.mobileLink,
											pathname.includes(link.href) && styles.active
										)}
									>
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
							<Separator className={styles.separator}/>
							<Button
								asChild
								font="base"
								variant={'primary'}
								className={styles.mobileLogin}
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
