import { BillingApi } from '@/api'
import { useMutation } from '@tanstack/react-query'

export const useCheckoutMutation = () => {
	return useMutation({
		mutationFn: async (planId: number) =>
			(await BillingApi.checkout(planId)).data
	})
}
