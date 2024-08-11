import { useMutation } from '@/hooks'
import { BillingInfoApi, type BillingInfoInput } from '@/features/billing'

export const useAddBillingInfoMutation = () => {
	return useMutation({
		mutationFn: async (dto: BillingInfoInput) =>
			(await BillingInfoApi.create(dto)).data
	})
}
