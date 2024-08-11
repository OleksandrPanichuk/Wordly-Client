import { selectAuthUser } from '@/features/auth'
import { BillingInfoApi } from '@/features/billing'
import { useQuery, type UseQueryHookProps } from '@/hooks'
import { useAppSelector } from '@/store'
import { TypeBillingInfo } from '@/types'

export const useGetBillingInfoQuery = (
	props?: UseQueryHookProps<TypeBillingInfo>
) => {
	const user = useAppSelector(selectAuthUser)
	return useQuery({
		queryKey: ['users', user?.id, 'billingInfo'],
		queryFn: () => BillingInfoApi.get(user?.id),
		retry: false,
		...props
	})
}
