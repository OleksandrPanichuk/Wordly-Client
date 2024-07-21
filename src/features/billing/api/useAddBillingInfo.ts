import { useMutation } from '@/hooks'
import { BillingApi, type BillingInfoInput } from '@/features/billing'

export const useAddBillingInfo = () => {
	return useMutation({
		mutationFn: async (dto: BillingInfoInput) =>
			(await BillingApi.create(dto)).data
	})
}
