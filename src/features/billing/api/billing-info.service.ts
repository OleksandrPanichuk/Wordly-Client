import { ApiRoutes } from '@/constants'
import { BillingInfoInput, billingInfoSchema } from '@/features/billing'
import { axios, fetcher } from '@/lib'
import { store } from '@/store'
import { TypeBillingInfo } from '@/types'
import { isServer } from '@tanstack/react-query'

const get = async (id?: string) => {
	const userId = id ?? store?.getState()?.auth?.user?.id

	if (!userId) {
		throw new Error('Unauthorized')
	}

	if (isServer) {
		return (
			await fetcher.get<TypeBillingInfo>(ApiRoutes.BILLING_INFO.ROOT(userId))
		).data
	}

	return (await axios.get<TypeBillingInfo>(ApiRoutes.BILLING_INFO.ROOT(userId)))
		.data
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
