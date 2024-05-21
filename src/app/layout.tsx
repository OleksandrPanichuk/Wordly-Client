import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import '@/styles/globals.scss'

import { AuthProvider, QueryProvider } from '@/providers'
import { currentUser } from '@/services'
import { constructRootMetadata } from '@/shared/metadata'
import { Quicksand } from 'next/font/google'
import { Toaster } from 'sonner'
import { cn } from '@/lib'

const quicksand = Quicksand({
	weight: ['400', '500', '700'],
	display: 'swap',
	subsets: ['latin'],
	variable:'--font-quicksand'
})

export const metadata: Metadata = constructRootMetadata()

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const user = await currentUser()
	return (
		<html lang='en' className={cn(quicksand.variable,GeistSans.className)}>
			<body>
				<QueryProvider>
					<AuthProvider initialUser={user}>
						<Toaster richColors expand />
						{children}
					</AuthProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
