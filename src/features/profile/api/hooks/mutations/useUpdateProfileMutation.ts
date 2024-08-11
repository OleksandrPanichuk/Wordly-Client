'use client'
import { Routes } from '@/constants'
import { authActions } from '@/features/auth'
import { ProfileApi } from '@/features/profile'
import { useMutation } from '@/hooks'
import { useAppActions } from '@/store'
import { TypeUser } from '@/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Options = {
	onSuccess?: (data: TypeUser) => void
}

export const useUpdateProfileMutation = ({ onSuccess }: Options = {}) => {
	const { setUser } = useAppActions(authActions)
	const router = useRouter()

	return useMutation({
		mutationFn: ProfileApi.update,
		onSuccess: ({ data }) => {
			onSuccess?.(data)

			toast.success('Profile was successfully updated')
			setUser(data)
			router.push(Routes.PROFILE)
		}
	})
}
