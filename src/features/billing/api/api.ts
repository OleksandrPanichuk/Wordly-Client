import {
	BillingInfoInput,
	billingInfoSchema,
	billingPlans
} from '@/features/billing'
import { axios } from '@/lib'
import { TypeBillingInfo } from '@/shared/types'
import { store } from '@/store'


export class BillingInfoApi {
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
}

export class BillingApi {
	public static async getSubscription() {
		return await axios.get('/subscription')
	}

	public static async checkout(productId: number) {
		const isValidProductId = billingPlans.some(
			(plan) => plan.variantId === productId
		)

		if (!isValidProductId) {
			throw new Error('Invalid product id')
		}

		return await axios.post<string>('/subscription', {
			productId
		})
	}
}