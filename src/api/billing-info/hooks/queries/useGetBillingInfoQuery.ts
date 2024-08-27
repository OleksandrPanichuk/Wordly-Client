import { BillingInfoApi } from '@/api'
import type { TypeBillingInfo } from '@/features/billing'
import { useQuery, type UseQueryHookProps } from '@/hooks'
import { useAuth } from '@/providers'

export const useGetBillingInfoQuery = (
	props?: UseQueryHookProps<TypeBillingInfo>
) => {
	const { user } = useAuth()
	return useQuery({
		queryKey: ['users', user?.id, 'billingInfo'],
		queryFn: () => BillingInfoApi.get(user?.id),
		retry: false,
		...props
	})
}
