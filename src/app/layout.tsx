import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import '@/styles/globals.scss'

import { AuthProvider, QueryProvider } from '@/providers'
import { currentUser } from '@/services'
import { constructRootMetadata } from '@/shared/metadata'
import { Toaster } from 'sonner'

export const metadata: Metadata = constructRootMetadata()

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const user = await currentUser()
	return (
		<html lang='en' className={GeistSans.className}>
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
