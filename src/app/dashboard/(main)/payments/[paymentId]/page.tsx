import { BillingApi } from '@/api'
import { PaymentView } from '@/features/billing'
import {
	getProduct,
	getSubscription,
	getVariant,
	lemonSqueezySetup
} from '@lemonsqueezy/lemonsqueezy.js'
import { notFound } from 'next/navigation'

interface IPaymentPageProps {
	params: {
		paymentId: string
	}
}
lemonSqueezySetup({
	apiKey: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY
})

const PaymentPage = async ({ params }: IPaymentPageProps) => {
	const payment = await BillingApi.getPayment(params.paymentId)

	if (!payment) {
		return notFound()
	}

	const subscription = await getSubscription(payment.lsSubscriptionId)

	if (subscription.statusCode === 404 || !subscription.data) {
		return notFound()
	}

	const variantId = subscription.data.data.attributes.variant_id
	const productId = subscription.data.data.attributes.product_id

	const [product, variant] = await Promise.all([
		getProduct(productId),
		getVariant(variantId)
	])

	if (
		variant.statusCode === 404 ||
		!variant.data ||
		product.statusCode === 404 ||
		!product.data
	) {
		return notFound()
	}

	return (
		<PaymentView
			payment={payment}
			variant={variant.data}
			product={product.data}
		/>
	)
}

export default PaymentPage
