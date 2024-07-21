import { BillingInfoInput, billingInfoSchema } from '@/features/billing'
import { plans } from '@/features/plans'
import { axios } from '@/lib'
import { TypeBillingInfo } from '@/shared/types'
import { store } from '@/store'

export class BillingApi {
	public static async get() {
		const userId = store.getState().auth.user?.id

		if (!userId) {
			throw new Error('Unauthorized')
		}
		return await axios.get<TypeBillingInfo>(`/users/${userId}/billing-info`)
	}

	public static async create(dto: BillingInfoInput) {
		const userId = store.getState().auth.user?.id

		if (!userId) {
			throw new Error('Unauthorized')
		}

		billingInfoSchema.parse(dto)
		return await axios.post<TypeBillingInfo>(
			`/users/${userId}/billing-info`,
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
			`/users/${userId}/billing-info/${billingInfoId}`,
			dto
		)
	}

	public static async checkout(productId: number) {
		const isValidProductId = plans.some((plan) => plan.planId === productId)

		if (!isValidProductId) {
			throw new Error('Invalid product id')
		}

		return await axios.post<string>('/subscription', {
			productId
		})
	}
}
