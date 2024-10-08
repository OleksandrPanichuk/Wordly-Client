import { ApiRoutes } from '@/constants/api-routes'
import type { TypePayment, TypeSubscription } from '@/features/billing'
import { billingPlans } from '@/features/billing'
import { axios, fetcher } from '@/lib'

const getSubscription = async () => {
	return await fetcher.getOrNull<TypeSubscription>(
		ApiRoutes.BILLING.SUBSCRIPTION
	)
}

const getPayments = async () => {
	return await fetcher.getOrDefault<TypePayment[]>(
		ApiRoutes.BILLING.PAYMENTS,
		[]
	)
}

const getPayment = async (paymentId: string) => {
	return await fetcher.getOrNull<TypePayment>(
		ApiRoutes.BILLING.PAYMENT(paymentId)
	)
}

const checkout = async (productId: number) => {
	const isValidProductId = billingPlans.some(
		(plan) => plan.variantId === productId
	)

	if (!isValidProductId) {
		throw new Error('Invalid product id')
	}

	return await axios.post<string>(ApiRoutes.BILLING.SUBSCRIPTION, {
		productId
	})
}

export const BillingApi = {
	getSubscription,
	getPayments,
	getPayment,
	checkout
} as const
