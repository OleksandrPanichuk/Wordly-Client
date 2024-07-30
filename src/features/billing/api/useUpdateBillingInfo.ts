import { BillingInfoApi, type BillingInfoInput } from '@/features/billing'
import { useMutation } from '@/hooks'
import { toast } from 'sonner'

export const useUpdateBillingInfo = () => {
	return useMutation({
		mutationFn: async ({
			id,
			...dto
		}: {
			id: string
		} & Partial<BillingInfoInput>) =>
			(await BillingInfoApi.update(id, dto)).data,
		onSuccess: () => {
			toast.success('Billing information was successfully updated')
		}
	})
}
