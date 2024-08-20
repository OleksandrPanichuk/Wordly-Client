'use client'
import { AuthApi } from '@/api'
import { authActions } from '@/features/auth'
import { useAppActions } from '@/store'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useSignOutMutation = () => {
	const router = useRouter()
	const { removeUser } = useAppActions(authActions)

	const { mutate, ...state } = useMutation({
		mutationFn: AuthApi.signOut,
		onSuccess: () => {
			router.refresh()
			removeUser()
		},
		onError: () => {
			toast.error('Failed to sign out')
		}
	})

	return {
		...state,
		mutate: () => mutate()
	}
}
