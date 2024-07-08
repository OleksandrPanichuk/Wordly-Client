'use client'
import { Logo } from '@/components/common'
import { useAuth } from '@/providers'
import { Navbar, Search, SignInButton, UserMenu } from './components'

export const Header = () => {
	const { user } = useAuth()
	return (
		<header className='sticky z-50 top-0 page__container p-4 sm:px-7  w-full backdrop-blur bg-white bg-opacity-80 flex items-center gap-4 h-[4.5rem]'>
			<Logo className='mr-4' withText width={35} height={35} />
			<div className='max-lg:flex-1' />

			<Navbar />

			<Search />
			{user ? <UserMenu /> : <SignInButton />}

			<Navbar.Mobile />
		</header>
	)
}
