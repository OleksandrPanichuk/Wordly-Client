import { DashboardHeader, Sidebar } from '@/components/common'
import { getSubscription } from '@/features/billing'
import { currentUser } from '@/features/profile'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'

export const EditPanelLayout = async ({ children }: PropsWithChildren) => {
	const user = await currentUser()
	const subscription = await getSubscription()

	if (!subscription && user?.role !== 'ADMIN') {
		return notFound()
	}

	return (
		<div className="flex min-h-screen">
			<Sidebar links={'edit'} subscribed={!!subscription} />
			<div className="flex flex-col flex-1 overflow-x-hidden">
				<DashboardHeader subscription={subscription} />
				<main className="flex-1 bg-tw-blue-50">{children}</main>
			</div>
		</div>
	)
}
