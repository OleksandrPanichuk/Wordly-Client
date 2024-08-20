import { currentUser } from '@/api'
import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { QueryProvider } from './QueryProvider'
import { StoreProvider } from './StoreProvider'

export const Providers = async ({ children }: PropsWithChildren) => {
	const user = await currentUser()
	return (
		<QueryProvider>
			<StoreProvider initialUser={user}>
				<Toaster richColors expand />
				{children}
			</StoreProvider>
		</QueryProvider>
	)
}
