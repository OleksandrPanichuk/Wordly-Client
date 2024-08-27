'use client'

import { ProfileApi } from '@/api'
import { useMutation } from '@/hooks'
import { useAuth } from '@/providers'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useDeleteProfileMutation = () => {
	const { removeUser } = useAuth()
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
