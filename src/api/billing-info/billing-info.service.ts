import { ApiRoutes } from '@/constants'
import { BillingInfoInput, billingInfoSchema } from './billing-info.dto'
import { axios, fetcher } from '@/lib'
import { store } from '@/store'
import { TypeBillingInfo } from '@/types'

const get = async (id?: string) => {
	const userId = id ?? store?.getState()?.auth?.user?.id

	if (!userId) {
		throw new Error('Unauthorized')
	}

	return await fetcher.get<TypeBillingInfo>(ApiRoutes.BILLING_INFO.ROOT(userId))
}

const create = async (dto: BillingInfoInput) => {
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

const update = async (
	billingInfoId: string,
	dto: Partial<BillingInfoInput>
) => {
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

export const BillingInfoApi = {
	get,
	create,
	update
} as const
