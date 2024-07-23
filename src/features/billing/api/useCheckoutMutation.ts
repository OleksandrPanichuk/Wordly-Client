import { useMutation } from '@tanstack/react-query'
import { BillingApi } from './api'

export const useCheckoutMutation = () => {
	return useMutation({
		mutationFn: async (planId: number) =>
			(await BillingApi.checkout(planId)).data
	})
}
