import { selectAuthUser } from '@/features/auth'
import { BillingInfoApi } from '@/features/billing'
import { useQuery, type UseQueryHookProps } from '@/hooks'
import { TypeBillingInfo } from '@/shared/types'
import { useAppSelector } from '@/store'

export const useGetBillingInfo = (props?: UseQueryHookProps<TypeBillingInfo>) => {
	const user = useAppSelector(selectAuthUser)
	return useQuery({
		queryKey: ['users', user?.id, 'billingInfo'],
		queryFn: BillingInfoApi.get,
		retry:false,
		...props
	})
}
