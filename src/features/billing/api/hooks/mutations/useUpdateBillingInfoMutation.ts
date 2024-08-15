import { selectAuthUser } from '@/features/auth'
import { BillingInfoApi, type BillingInfoInput } from '@/features/billing'
import { useMutation } from '@/hooks'
import { useAppSelector } from '@/store'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateBillingInfoMutation = () => {
	const user = useAppSelector(selectAuthUser)
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({
			id,
			...dto
		}: {
			id: string
		} & Partial<BillingInfoInput>) =>
			(await BillingInfoApi.update(id, dto)).data,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['users', user?.id, 'billingInfo']
			})
			toast.success('Billing information was successfully updated')
		}
	})
}
