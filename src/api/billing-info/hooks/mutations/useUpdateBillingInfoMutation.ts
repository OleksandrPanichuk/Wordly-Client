import { BillingInfoApi, type BillingInfoInput } from '@/api'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateBillingInfoMutation = () => {
	const { user } = useAuth()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			id,
			...dto
		}: {
			id: string
		} & Partial<BillingInfoInput>) =>
			(await BillingInfoApi.update(id, dto, user?.id)).data,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['users', user?.id, 'billingInfo']
			})
			toast.success('Billing information was successfully updated')
		}
	})
}
