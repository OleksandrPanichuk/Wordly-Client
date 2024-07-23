"use client"
import { useMutation } from '@/hooks'
import { AuthApi } from '@/features/auth'
import { toast } from 'sonner'

export const useResetPassword = () => {
	return useMutation({
		mutationFn: AuthApi.resetPassword,
		onSuccess: () => {
			toast.success('Please, check your email')
		},
		onError: () => {
			toast.error('Something went wrong')
		}
	})
}
