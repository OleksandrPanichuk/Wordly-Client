import { Header } from '@/components/common'
import { Footer } from '@/features/dictionary'
import { PropsWithChildren } from 'react'

export const DictionaryLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className={'flex flex-col min-h-screen'}>
			<Header />
			<main className="flex-1 px-4">{children}</main>
			<Footer />
		</div>
	)
}