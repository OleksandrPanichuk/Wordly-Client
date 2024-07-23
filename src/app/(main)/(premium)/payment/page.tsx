import { Text, Title } from '@/components/ui'
import {
	BillingInfoForm,
	billingPlans,
	getSubscription,
	SelectedPlan
} from '@/features/billing'
import { getProduct, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface IPaymentPageProps {
	searchParams?: {
		planId?: string
	}
}

const PaymentPage = async ({ searchParams }: IPaymentPageProps) => {
	const subscription = await getSubscription()

	if (subscription) {
		return notFound()
	}

	const planId = parseInt(searchParams?.planId ?? '')

	if (!planId) {
		return notFound()
	}

	if (!billingPlans.some((el) => el.planId === planId)) {
		return notFound()
	}

	lemonSqueezySetup({
		apiKey: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY
	})

	const { data } = await getProduct(planId)

	const price = data!.data.attributes.price / 100

	return (
		<div className="flex flex-col lg:flex-row items-center w-full">
			<div className="w-full lg:w-3/5 flex justify-center lg:mb-8">
				<div className="w-[90%] sm:w-[70%]">
					<Title size={'2xl'} as="h1" className="mb-3">
						Billing information
					</Title>
					<Text className="mb-10" color={'gray-400'} size="base-sm">
						This information would be on your invoice
					</Text>
					<BillingInfoForm planId={planId} />
				</div>
			</div>
			<div className="w-[90%] sm:w-[70%] lg:!w-2/5 justify-evenly lg:bg-tw-blue-50 min-h-[53vh] lg:min-h-[90vh] flex flex-col ">
				<Image
					width={100}
					height={149.5}
					className="self-end hidden lg:block "
					src="/svgs/pattern-4.svg"
					alt="pattern"
				/>
				<SelectedPlan planId={planId} price={price} />
				<Image
					width={100}
					height={149.5}
					className="ml-2.5 hidden lg:block"
					src="/svgs/pattern-4.svg"
					alt="pattern"
				/>
			</div>
		</div>
	)
}

export default PaymentPage
