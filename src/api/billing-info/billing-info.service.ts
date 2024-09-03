import { ApiRoutes } from '@/constants/api-routes'
import type { TypeBillingInfo } from '@/features/billing'
import { axios, fetcher } from '@/lib'
import { BillingInfoInput, billingInfoSchema } from './billing-info.dto'

const get = async (userId?: string) => {
	if (!userId) {
		throw new Error('Unauthorized')
	}

	return await fetcher.get<TypeBillingInfo>(ApiRoutes.BILLING_INFO.ROOT(userId))
}

const create = async (dto: BillingInfoInput, userId?: string) => {
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
	dto: Partial<BillingInfoInput>,
	userId?: string
) => {
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
