import { Routes } from '@/constants'
import { cn } from '@/lib'
import { Quicksand } from 'next/font/google'
import Link from 'next/link'

const quicksand = Quicksand({
	weight: ['500'],
	display: 'swap',
	subsets: ['latin']
})

export const Footer = () => {
	return (
		<footer className="px-4 mb-10 mt-40">
			<p
				className={cn(
					'text-gray-500 font-medium  text-center',
					quicksand.className
				)}
			>
				Copyright © 2020 Wordly Inc. | All Rights Reserved |{' '}
				<Link
					href={Routes.PRIVACY_POLICY}
					className="hover:text-gray-600 transition-colors"
				>
					Privacy Policy
				</Link>
			</p>
		</footer>
	)
}
