import { Header, Logo } from '@/components/common'
import { DictionaryInput, Footer } from '@/components/screens/dictionary'
import { Title } from '@/components/ui'
import { cn } from '@/lib'
import { PropsWithChildren } from 'react'

const DictionaryLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className={cn('flex flex-col min-h-screen')}>
			<Header />
			<main className='flex-1 px-4'>
				{children}
			</main>
			<Footer />
		</div>
	)
}

export default DictionaryLayout
