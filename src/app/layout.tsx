import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import '@/styles/globals.scss'

import { cn } from '@/lib'
import { AuthProvider, ModalsProvider, QueryProvider } from '@/providers'
import { currentUser } from '@/services'
import { constructRootMetadata } from '@/shared/metadata'
import { Noto_Sans, Quicksand } from 'next/font/google'
import { Toaster } from 'sonner'

const quicksand = Quicksand({
	weight: ['400', '500', '700'],
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-quicksand'
})

const notoSans = Noto_Sans({
	weight: ['700','500'],
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-noto-sans'
})

export const metadata: Metadata = constructRootMetadata()

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const user = await currentUser()
	return (
		<html lang="en" className={cn(quicksand.variable, GeistSans.className, notoSans.variable)}>
			<body>
				<QueryProvider>
					<AuthProvider initialUser={user}>
						<ModalsProvider />
						<Toaster richColors expand />
						{children}
					</AuthProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
