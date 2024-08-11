import type { Metadata } from 'next'

import { cn } from '@/lib'
import { Providers } from '@/providers'

import { constructRootMetadata } from '@/metadata'
import '@/styles/globals.scss'
import { Noto_Sans, Quicksand } from 'next/font/google'

const quicksand = Quicksand({
	weight: ['400', '500', '700'],
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-quicksand'
})

const notoSans = Noto_Sans({
	weight: ['700', '400', '500', '600'],
	display: 'swap',
	subsets: ['latin', 'latin-ext'],
	variable: '--font-noto-sans'
})

export const metadata: Metadata = constructRootMetadata()

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className={cn(quicksand.variable, notoSans.className, notoSans.variable)}
			suppressHydrationWarning
		>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
