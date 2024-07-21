import { Text, Title } from '@/components/ui'
import { BillingInfoForm } from '@/features/billing'
import { plans } from '@/features/plans'
import { getProduct, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'
import { notFound } from 'next/navigation'

interface IPaymentPageProps {
	searchParams?: {
		planId?: string
	}
}

const PaymentPage = async ({ searchParams }: IPaymentPageProps) => {
	const planId = searchParams?.planId

	if (!planId) {
		return notFound()
	}

	if (!plans.some((el) => el.planId === parseInt(planId))) {
		return notFound()
	}

	lemonSqueezySetup({
		apiKey: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY
	})

	const { data } = await getProduct(planId)

	return (
		<div className="flex flex-col lg:flex-row items-center w-full">
			<div className="w-full lg:w-3/5 flex justify-center mb-8">
				<div className="w-[90%] xs:w-[70%]">
					<Title size={'2xl'} as="h1" className="mb-3">
						Billing information
					</Title>
					<Text className="mb-10" color={'gray-400'} size='base-sm'>
						This information would be on your invoice
					</Text>
					<BillingInfoForm planId={parseInt(planId)} />
				</div>
			</div>
		</div>
	)
}

export default PaymentPage
