import { AuthApi } from '@/services'
import { Routes } from '@/shared/constants'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useUpdatePassword = () => {
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
