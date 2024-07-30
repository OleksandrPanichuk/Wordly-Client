import {
	BillingInfoInput,
	billingInfoSchema,
	billingPlans
} from '@/features/billing'
import { axios, fetcher } from '@/lib'
import { ApiRoutes } from '@/shared/constants'
import { TypeBillingInfo } from '@/shared/types'
import { store } from '@/store'
import { isServer } from '@tanstack/react-query'

export class BillingInfoApi {
	public static async get(id?: string) {
		const userId = id ?? store?.getState()?.auth?.user?.id

		if (!userId) {
			throw new Error('Unauthorized')
		}

		if (isServer) {
			return (
				await fetcher.get<TypeBillingInfo>(ApiRoutes.BILLING_INFO.ROOT(userId))
			).data
		}

		return (
			await axios.get<TypeBillingInfo>(ApiRoutes.BILLING_INFO.ROOT(userId))
		).data
	}

	public static async create(dto: BillingInfoInput) {
		const userId = store.getState().auth.user?.id

		if (!userId) {
			throw new Error('Unauthorized')
		}

		billingInfoSchema.parse(dto)

		return await axios.post<TypeBillingInfo>(
			ApiRoutes.BILLING_INFO.ROOT(userId),
			dto
		)
	}

	public static async update(
		billingInfoId: string,
		dto: Partial<BillingInfoInput>
	) {
		const userId = store.getState().auth.user?.id

		if (!userId) {
			throw new Error('Unauthorized')
		}

		billingInfoSchema.partial().parse(dto)

		return await axios.patch<TypeBillingInfo>(
			ApiRoutes.BILLING_INFO.UPDATE(userId, billingInfoId),
			dto
		)
	}
}

export class BillingApi {
	public static async getSubscription() {
		if (isServer) {
			return (await fetcher.get(ApiRoutes.BILLING.SUBSCRIPTION)).data
		}
		return (await axios.get(ApiRoutes.BILLING.SUBSCRIPTION)).data
	}

	public static async checkout(productId: number) {
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
}
