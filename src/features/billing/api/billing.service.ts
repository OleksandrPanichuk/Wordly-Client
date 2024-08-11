import { ApiRoutes } from '@/constants'
import { billingPlans } from '@/features/billing'
import { axios, fetcher } from '@/lib'
import { isServer } from '@tanstack/react-query'

const getSubscription = async () => {
	if (isServer) {
		return (await fetcher.get(ApiRoutes.BILLING.SUBSCRIPTION)).data
	}
	return (await axios.get(ApiRoutes.BILLING.SUBSCRIPTION)).data
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
	checkout
} as const
