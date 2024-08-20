import { BillingInfoApi, type BillingInfoInput  } from '@/api'
import { useMutation } from '@/hooks'

export const useAddBillingInfoMutation = () => {
	return useMutation({
		mutationFn: async (dto: BillingInfoInput) =>
			(await BillingInfoApi.create(dto)).data
	})
}
