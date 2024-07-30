import { getSubscription } from '@/features/billing'
import { PropsWithChildren } from 'react'
import { Header, Sidebar } from './components'

export const DashboardLayout = async ({ children }: PropsWithChildren) => {
	const subscription = await getSubscription()

	return (
		<div className="flex min-h-screen">
			<Sidebar subscription={subscription} />
			<div className="flex flex-col flex-1">
				<Header />
				<main >{children}</main>
			</div>
		</div>
	)
}
