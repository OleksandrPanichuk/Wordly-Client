import { Title } from '@/components/ui'
import {
	BillingInfoForm,
	getPayments,
	getSubscription,
	InvoiceHistory,
	SubscriptionInfo
} from '@/features/billing'

const DashboardBillingPage = async () => {
	const [payments, subscription] = await Promise.all([
		getPayments(),
		getSubscription()
	])

	return (
		<div className="p-4 flex flex-col gap-6  bg-tw-blue-50 h-full ">
			<SubscriptionInfo data={subscription} />
			<InvoiceHistory data={payments} />
			<section className="space-y-4">
				<Title as="h4" size={'3xl'}>
					Billing Information
				</Title>
				<BillingInfoForm />
			</section>
		</div>
	)
}

export default DashboardBillingPage
