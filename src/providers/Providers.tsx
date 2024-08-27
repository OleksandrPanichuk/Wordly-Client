import { currentUser } from '@/api'
import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { AuthProvider } from './AuthProvider'
import { QueryProvider } from './QueryProvider'

export const Providers = async ({ children }: PropsWithChildren) => {
	const user = await currentUser()
	return (
		<AuthProvider initialUser={user}>
			<QueryProvider>
				<Toaster richColors expand />
				{children}
			</QueryProvider>
		</AuthProvider>
	)
}
