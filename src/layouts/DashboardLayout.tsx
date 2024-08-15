import { DashboardHeader, Sidebar } from '@/components/common'
import { getSubscription } from '@/features/billing'
import { PropsWithChildren } from 'react'

export const DashboardLayout = async ({ children }: PropsWithChildren) => {
	const subscription = await getSubscription()

	return (
		<div className="flex min-h-screen">
			<Sidebar links={'dashboard'} subscribed={!!subscription} />
			<div className="flex flex-col flex-1 overflow-x-hidden">
				<DashboardHeader subscription={subscription} />
				<main className="flex-1 bg-tw-blue-50">{children}</main>
			</div>
		</div>
	)
}
