'use client'
import { Logo } from '@/components/common'
import { useAuth } from '@/providers'
import { Navbar, Search, SignInButton, UserMenu } from './components'

import styles from './Header.module.scss'
import { cn } from '@/lib'


export const Header = () => {
	const { user } = useAuth()
	return (
		<header className={styles.header}>
			<div className={cn('page__container', styles.container)}>
				<Logo className={styles.logo} withText width={35} height={35} />
				<div className={styles.spacer} />

				<Navbar />

				<Search />
				{user ? <UserMenu /> : <SignInButton />}

				<Navbar.Mobile />
			</div>
		</header>
	)
}
