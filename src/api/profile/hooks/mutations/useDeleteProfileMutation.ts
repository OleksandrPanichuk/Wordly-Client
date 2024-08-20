'use client'

import { ProfileApi } from '@/api'
import { authActions } from '@/features/auth'
import { useMutation } from '@/hooks'
import { useAppActions } from '@/store'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useDeleteProfileMutation = () => {
	const { removeUser } = useAppActions(authActions)
	const router = useRouter()
	return useMutation({
		mutationFn: ProfileApi.delete,
		onSuccess: () => {
			toast.success('Profile was successfully deleted')
			removeUser()
			router.refresh()
		}
	})
}
