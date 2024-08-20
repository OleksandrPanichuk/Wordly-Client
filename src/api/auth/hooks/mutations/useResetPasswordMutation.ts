'use client'
import { AuthApi } from '@/api'
import { useMutation } from '@/hooks'
import { toast } from 'sonner'

export const useResetPasswordMutation = () => {
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
