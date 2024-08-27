import { BillingInfoApi, type BillingInfoInput } from '@/api'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'

export const useAddBillingInfoMutation = () => {
	const {user} = useAuth()
	return useMutation({
		mutationFn: async (dto: BillingInfoInput) =>
			(await BillingInfoApi.create(dto, user?.id)).data
	})
}
