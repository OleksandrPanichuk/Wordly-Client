import { useMutation } from '@tanstack/react-query'
import { BillingApi } from '../../billing.service'

export const useCheckoutMutation = () => {
	return useMutation({
		mutationFn: async (planId: number) =>
			(await BillingApi.checkout(planId)).data
	})
}
