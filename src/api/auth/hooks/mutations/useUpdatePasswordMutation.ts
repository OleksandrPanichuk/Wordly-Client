'use client'
import { AuthApi } from '@/api'
import { Routes } from '@/constants/routes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useUpdatePasswordMutation = () => {
	const router = useRouter()
	return useMutation({
		mutationFn: AuthApi.updatePassword,
		onSuccess: () => {
			toast.success('Password updated')
			router.push(Routes.SIGN_IN)
		},
		onError: () => {
			toast.error('Failed to update password')
		}
	})
}
