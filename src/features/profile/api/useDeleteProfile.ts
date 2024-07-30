'use client'

import { authActions } from '@/features/auth'
import { ProfileApi } from '@/features/profile'
import { useMutation } from '@/hooks'
import { useAppActions } from '@/store'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useDeleteProfile = () => {
	const { removeUser } = useAppActions(authActions)
	const router = useRouter()
	return useMutation({
		mutationFn:  ProfileApi.delete,
		onSuccess: () => {
			toast.success('Profile was successfully deleted')
			removeUser()
			router.refresh()
		}
	})
}
