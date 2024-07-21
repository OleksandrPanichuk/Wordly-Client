import { BillingApi, type BillingInfoInput } from '@/features/billing'
import { useMutation } from '@/hooks'

export const useUpdateBillingInfo = () => {
	return useMutation({
		mutationFn: async ({
			id,
			...dto
		}: {
			id: string

		} & Partial<BillingInfoInput>) => (await BillingApi.update(id, dto)).data
	})
}
